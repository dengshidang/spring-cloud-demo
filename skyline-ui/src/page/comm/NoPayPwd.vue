<template>
  <!--设置资金密码弹窗-->
  <Modal  width="400px"  @on-cancel="goBack"   v-model="show">
    <p slot="header" style="color:#f60;text-align:center">
      <span>设置资金密码</span>
    </p>
    <div>
      <Form  ref="params"  :model="params" :rules="ruleParams"  class="pop-form" style="margin-top: 10px;">
        <div class="pop-row-1">
          <FormItem label="资金密码" prop="payPwd">
              <Input type="password" size="large" v-model="params.payPwd" placeholder="请输入至少6位数，且包含数字和字母"></Input>
          </FormItem>
        </div>
        <div class="pop-row-1">
          <FormItem label="确认密码" prop="restPayPwd">
            <Input type="password" size="large" v-model="params.restPayPwd" placeholder="确认资金密码"></Input>
          </FormItem>
        </div>
      </Form>
    </div>
    <div slot="footer">
      <button size="large" class="pop-sub" @click="submit()" style="margin-top: 0px;">提交
      </button>
    </div>
  </Modal>
</template>

<script>
  import {Modal,Form,FormItem,Input,Button} from  'iview'
    export default {
        name: "NoLogin",
        components:{Modal,Form,FormItem,Input,Button},
        data(){
          return{
            title:'安全提示',
            content:"您还未设置资金密码，请设置！",
            show:false,
            params:{
              payPwd:null,
              restPayPwd:null,
            },
            ruleParams:{
              payPwd:[{required: true, validator: this.validatePayPwd, trigger: 'blur'}],
              restPayPwd:[{required: true, validator: this.validateRestPayPwd, trigger: 'blur'}],
            }
          }
        },
        methods:{
          validatePayPwd(rule, value, callback){
            if (value === '') {
              callback(new Error('密码不能为空'));
            } else if(!this.$fun.isPayPwd(value)) {
              callback(new Error('请输入至少6位数，最多12位,且包含数字和字母'));
            } else {
              callback();
            }
          },
          validateRestPayPwd(rule, value, callback){
            if (value === '') {
              callback(new Error('确认密码不能为空'));
            } else if(this.params.payPwd!=value) {
              callback(new Error('两次密码不一致'));
            } else {
              callback();
            }
          },
          submit(){
            this.$refs['params'].validate((valid) => {
              if (valid) {
                this.setPayPwd();
              }
            });
          },
          showModal(){
            this.show=true;
          },
          setPayPwd(){
            this.$Http.post('/userinfo/setPayPwd',{payPwd:this.params.payPwd}).then(resp => {
              if (resp.data.code != "SUCCESS") {
                  this.$Message.error(resp.data.msg);
                  return false;
              } else {
                  this.$Message.success('设置成功');
                  this.show=false;
              }
            });
          },
          isPayPwd(){
            this.$Http.post('/userinfo/isSetPayPwd').then(resp => {
              if (resp.data.code != "SUCCESS") {
                if(resp.data.code=='E00319'){
                  this.$Modal.warning({
                    title: this.title,
                    content:this.content,
                    onOk:this.showModal
                  });
                }else{
                  this.$Message.error(resp.data.msg);
                  this.goBack();
                }
              } else {
                this.$emit('showNoPayWay',false);
              }
            });
          },
          goBack() {
            window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
          }
        },
        mounted(){
          this.isPayPwd();
        }
    }
</script>
<style scoped>

</style>
