<template>
  <!--设置支付方式弹窗-->
  <Modal  width="400px"  @on-cancel="calcelModen"  v-model="show">
    <p slot="header" style="color:#f60;text-align:center">
      <span>添加支付方式</span>
    </p>
    <div>
      <Form  ref="params"  :model="params" :rules="ruleParams"  class="pop-form" style="margin-top: 10px;">
          <FormItem label="支付方式" prop="type">
            <Select v-model="params.type" >
              <Option  :value="0" :key="0">微信</Option>
              <Option  :value="1" :key="1">支付宝</Option>
              <Option  :value="2" :key="2">银行卡</Option>
            </Select>
          </FormItem>
          <FormItem label="真实姓名" prop="name">
            <Input type="text" v-model="params.name" size="large" placeholder="请输入姓名"> </Input>
          </FormItem>
            <template v-if="params.type==0">
              <FormItem label="微信账号" prop="account">
                   <Input type="text" v-model="params.account" size="large" placeholder="请输入微信账号"> </Input>
              </FormItem>
            </template>
            <template v-if="params.type==1">
              <FormItem label="支付宝账号" prop="account">
                  <Input type="text" v-model="params.account" size="large"  placeholder="请输入支付宝账号"> </Input>
              </FormItem>
            </template>
            <template v-if="params.type==2">
              <FormItem label="银行卡账号" prop="account">
                  <Input type="text" v-model="params.account" size="large" placeholder="请输入银行卡号"> </Input>
              </FormItem>
            </template>

        <template v-if="params.type==2">
          <FormItem label="开户行">
            <Input type="text" v-model="params.bankName" size="large" placeholder="请输入开户行"> </Input>
          </FormItem>
        </template>
        <template v-if="params.type==2">
          <FormItem label="开户支行">
            <Input type="text" v-model="params.address" size="large" placeholder="请输入开户支行"> </Input>
          </FormItem>
        </template>
        <template v-if="params.type==0 || params.type==1">
            <div class="pay-up">
              <span class="pay-up-tit col-g">收款二维码</span>
              <div class="pay-up-block">
                <div class="pay-up-inp">
                  <input type="file"  @change='uploadFile'>
                  <!--上传成功后显示上传的图片-->
                  <img :src="this.$store.state.uploadUrl + params.imgUrl" v-if="params.imgUrl!='' && params.imgUrl!=null" style="width: 90px; height: 90px;">
                </div>

              </div>
              <span class="pay-up-tips" v-if="params.type==0">
                   微信收款码获取方法：打开微信APP，在我的钱包页面点击“收付款”，然后在二维码下方点击“保存收款码”即可。
              </span>
              <span class="pay-up-tips" v-if="params.type==1">
                    支付宝收款码获取方法：打开支付宝APP，在首页点击“收钱”，在个人收款二维码下方点击“保存图片”即可。
              </span>
            </div>
        </template>
        <FormItem label="资金密码" prop="payPwd">
          <Input type="password" v-model="params.payPwd" size="large" placeholder="请输入资金密码"> </Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <button size="large" class="pop-sub" @click="submit()"  style="margin-top: 0px;">提交
      </button>
    </div>
  </Modal>
</template>

<script>
  import {Modal,Form,FormItem,Input,Button,Select,Option} from  'iview'
    export default {
        name: "NoBankInfo",
        components:{Modal,Form,FormItem,Input,Button,Select,Option},

        data(){
           return {
             show:false,
             params:{
               type:0,
               account:null,
               payPwd:null,
               name:null,
               imgUrl:null,
               bankName:null,
               address:null,
             },
             ruleParams:{
               name: [
                 { required: true, message: '姓名不能为空', trigger: 'blur' }
               ],
               account:[
                 {required: true, validator: this.validateAccount, trigger: 'blur'}
               ],
               img:[{ required: true, message: '请上传收款码', trigger: 'blur' }],
               bankName: [
                 { required: true, message: '开户行不能为空', trigger: 'blur' }
               ],
               address: [
                 { required: true, message: '开户支行不能为空', trigger: 'blur' }
               ],
               payPwd: [
                 { required: true, message: '资金密码不能为空', trigger: 'blur' }
               ],
             }
           }
        },
        watch:{
         'params.type'(val){
           this.reset();
           this.params.type=val;
         }
        },
        methods:{
          validateAccount(rule, value, callback){
            if (value ==null || value =='') {
              if(this.params.type==0){
                callback(new Error('账号不能为空'));
              }else if(this.params.type==1){
                callback(new Error('支付账号不能为空'));
              }else{
                callback(new Error('银行卡号不能为空'));
              }
            } else {
              callback();
            }
          },

          uploadFile(e){
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            this.$Http.getFile('/upload',formData).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('上传成功');
                this.params.imgUrl=resp.data.result;
              }
            });
          },
          submit(){
            this.$refs['params'].validate((valid) => {
              if (valid) {
                this.saveBankinfo();
              }
            });
          },
          reset(){
            this.$refs['params'].resetFields();
          },
          saveBankinfo(){
            this.$Http.post('/transaction/saveBankinfo',this.params).then(resp=>{
              if (resp.data.code != "SUCCESS") {
                this.$Message.error(resp.data.msg);
                return false;
              } else {
                this.$Message.success('添加支付方式成功');
                this.show=false;
                this.$emit('showNoBankInfo',false);
              }
            });
          },
          setShow(){
            this.show=true;
          }
        },
        mounted(){


        }
    }
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 10px !important;
  }
</style>
