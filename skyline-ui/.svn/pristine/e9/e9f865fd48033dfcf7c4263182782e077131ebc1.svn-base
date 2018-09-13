<template>
  <div class="son-container">
    <!--发布广告-->
    <div class="ad-issue">
      <div class="son-cont-tit">
        <template v-if="type=='save'">发布广告</template>
        <template v-if="type=='update'">修改广告</template>
      </div>
      <div class="ad-issue-form">

          <Form ref="params"  :model="params" :rules="ruleParams" :label-width="80" class="issue-form">
          <div class="issue-f-row">
            <FormItem label="类型">
              <template v-if="type=='save'">
                <RadioGroup v-model="transactiontypeName" class="radio">
                  <span @click="toggleTabs('buy')"> <Radio label="出售" class="radio-son"   ></Radio></span>
                  <span @click="toggleTabs('sell')">   <Radio label="购买" class="radio-son" ></Radio></span>
                </RadioGroup>
              </template>
              <template v-if="type=='update'">
                <RadioGroup v-model="transactiontypeName" class="radio">
                  <Radio label="出售" class="radio-son"   disabled></Radio>
                  <Radio label="购买" class="radio-son"  disabled></Radio>
                </RadioGroup>
              </template>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem  label="委托类型">
              <template v-if="type=='save'">
                <Select v-model="transactiontypeListIndex" size="large" class="input">
                  <Option v-for="(item, index) in transactiontypeList" :value="index" :key="index">{{item.coinName}}</Option>
                </Select>
              </template>
              <template v-if="type=='update'">
                <Select v-model="transactiontypeListIndex" size="large" disabled class="input">
                  <Option v-for="(item, index) in transactiontypeList" :value="index" :key="index">{{item.coinName}}</Option>
                </Select>
              </template>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="价格" prop="price">
               <Input   placeholder="请输入价格" size="large" class="input"  v-model="params.price"  maxlength="12"><span slot="append">CNY</span></Input>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="委托数量"  prop="totalNum">
            <Input type="text" class="input" size="large" v-model="params.totalNum" placeholder="请输入数量" maxlength="12"/>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="最小限额" prop="min">
            <Input type="text" class="input" size="large" placeholder="请输入金额"  v-model="params.min" maxlength="12" >  <span slot="append">CNY</span></Input>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="最大限额" prop="max">
             <Input type="text" class="input" size="large" placeholder="请输入金额" v-model="params.max" maxlength="12">  <span slot="append">CNY</span></Input>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="付款方式" style="width: auto" prop="payWayArr">
              <CheckboxGroup v-model="params.payWayArr" class="checkbox">
                <template v-for="item in BankInfoList">
                  <Checkbox label="0" class="checkbox-son" v-if="item.type==0" >微信</Checkbox>
                  <Checkbox label="1" class="checkbox-son" v-if="item.type==1" >支付宝</Checkbox>
                  <Checkbox label="2" class="checkbox-son" v-if="item.type==2" >银行卡</Checkbox>
                </template>
              </CheckboxGroup>
              <template v-if="BankInfoList.length==0">
                 <a href="javascript:void(0)" @click="NoBankInfoShow=true;showNoBankInfo(true)"> 点击绑定支付方式</a>
              </template>
            </FormItem>
          </div>
          <div class="issue-f-row">
            <FormItem label="备注:" >
              <Input  class="input"   type="textarea"  :maxlength="300" :rows="4" v-model="params.remark" placeholder="请输入备注"/>
              <div class="textarea-count">
                <span class="textareaInput">{{params.remark!=null?params.remark.length:0}}</span>/<span class="textareaTotal">300</span>
              </div>
              <div class="clearfix"></div>
            </FormItem>
          </div>
          <template v-if="type=='save'">
            <a href="javascript:void(0);" class="issue-f-sub" @click="submit()">确认发布</a>
          </template>
          <template v-if="type=='update'">
            <a href="javascript:void(0);" class="issue-f-sub" @click="submit()">确认修改</a>
          </template>

          </Form>

      </div>
    </div>
    <!--发布提示-->
    <div class="issue-tips">
      <p>1. 要想显示您的交易广告，您的 平台包中需要有货币。使用在线付款的交易广告至少需要 0.1 BTC，本地交易广告（现金）至少需要 0.1 BTC。</p>
      <p>2. 发起交易后，价格就会确定，除非定价中有明显的错误。</p>
      <p>3. 您不能代表其他人购买或出售货币。</p>
      <p>4. 您仅可以使用以自己名字注册的付款帐户（非第三方付款！）。</p>
      <p>5. 您必须在交易广告或交易聊天中提供您的付款详细信息。</p>
      <p>6. 所有交流必须在 平台提供的聊天窗口进行。</p>
    </div>
    <NoPayPwd v-if="NoPayPwdShow" ></NoPayPwd>
    <NoBankInfo  ref="c1"   v-on:showNoBankInfo="showNoBankInfo"></NoBankInfo>
  </div>
</template>

<script>
  import {Input,Select,Option,RadioGroup,Radio,Icon,CheckboxGroup,Checkbox,Form,FormItem} from 'iview'
  import  NoPayPwd from '../comm/NoPayPwd'
  import  NoBankInfo from '../comm/NoBankInfo'
    export default {
        components: {
          Input,Select,Option,RadioGroup,Radio,Icon,CheckboxGroup,Checkbox,Form,FormItem,
          NoPayPwd,NoBankInfo
        },

        name: "SaveTransaction",
        data(){
          return{
            currentView:'buy',
            transactiontype:0,
            transactiontypeName:'出售',
            transactiontypeList:[],
            transactiontypeListIndex:0,
            BankInfoList:[],
            type:'save',
            TotalNumMin:0,
            TotalNumMax:0,
            NoPayPwdShow:true,
            NoBankInfoShow:false,
            params:{
              transactiontypeId:null,
              min:null,
              max:null,
              price:null,
              totalNum:null,
              payWay:null,
              remark:null,
              id:null,
              payWayArr:[],
            },

            ruleParams:{
              price: [
                {required: true, validator: this.validatePrice, trigger: 'blur'},
              ],
              totalNum:[
                {required: true, validator:this.validateTotalNum, trigger: 'blur' }
              ],
              min:[
                {required: true, validator:this.validateMin,  trigger: 'blur' }
              ],
              max:[
                {required: true, validator:this.validateMax, trigger: 'blur' }
              ],
              payWayArr:[
                { required: true, type: 'array', min: 1, message: '请最少勾选一种支付方式', trigger: 'blur' },
              ]
            }
          }
        },
        watch: {
          // 如果 `question` 发生改变，这个函数就会运行
          transactiontypeListIndex(newVal) {
            this.params.transactiontypeId=this.transactiontypeList[newVal].id;
          },
          'params.payWayArr'(val){
            this.params.payWay=val.join(',');
          },
          'params.transactiontypeId'(){
            if(this.transactiontype==0){//买
              this.TotalNumMin=this.transactiontypeList[this.transactiontypeListIndex].buyMin;
              this.TotalNumMax=this.transactiontypeList[this.transactiontypeListIndex].buyMax;
            }else{//卖
              this.TotalNumMin=this.transactiontypeList[this.transactiontypeListIndex].sellMin;
              this.TotalNumMax=this.transactiontypeList[this.transactiontypeListIndex].sellMax;
            }
          }
        },
         methods:{
           validatePrice(rule, value, callback){
             if (value == '' ||value == null) {
               callback(new Error('价格不能为空'));
             } else if(!this.$fun.isFloat(value)) {
               callback(new Error('请输入正确的价格'));
             } else {
               callback();
             }
           },
           validateTotalNum(rule, value, callback){
             if (value == '' ||value == null) {
               callback(new Error('委托数量不能为空'));
             } else if(!this.$fun.isFloat(value)) {
               callback(new Error('请输入正确的委托数量'));
             }else if(value<this.TotalNumMin){
               callback(new Error('不能低于最小委托数量'+this.TotalNumMin));
             }else if(value>this.TotalNumMax){
               callback(new Error('不能高于最高委托数量'+this.TotalNumMax));
             } else {
               callback();
             }
           },
           validateMin(rule, value, callback){
             if(value == '' ||value == null) {
               callback(new Error('最小限额不能为空'));
             } else if(!this.$fun.isFloat(value)) {
               callback(new Error('请输入正确的最小限额'));
             } else {
               callback();
             }
           },
           validateMax(rule, value, callback){


             if (value == '' ||value == null){
               callback(new Error('最大限额不能为空'));
             } else if(!this.$fun.isFloat(value)) {
               callback(new Error('请输入正确的最大限额'));
             }
             else if(parseFloat(value)<parseFloat(this.params.min)) {
               callback(new Error('最大限额不能小于最小限额'));
             }
             else if(parseFloat(value)>this.$fun.accMul(this.params.price,this.params.totalNum)) {
               callback(new Error('最大限额不能大于委托数量 * 价格'));
             }
             else {
               callback();
             }
           },
          toggleTabs (tabText) {
            this.currentView = tabText;
            if(tabText=='buy'){
              this.transactiontype=0;
            }else{
              this.transactiontype=1;
            }
            this.getTransactiontypeList();
          },
          getTransactiontypeList(){
            this.$Http.get('/transactiontype/getTransactiontypeList',{type:this.transactiontype}).then(resp=>{
              this.transactiontypeList=resp.data.result;
              this.params.transactiontypeId=resp.data.result[0].id;
              this.transactiontypeListIndex=0;
            });
          },
          getBankInfoList(){
            this.$Http.get('/transaction/getBankinfoByUser',{}).then(resp=>{
              this.BankInfoList=resp.data.result;

            });
          },
          submit(){
            this.$refs['params'].validate((valid) => {
              if (valid) {
                this.saveOrUpdate();
              }
            })
          } ,

          saveOrUpdate (){
                if(this.type=="save") {
                  this.$Http.post('/transaction/release', this.params).then(resp => {
                    if (resp.data.code != "SUCCESS") {
                      this.$Message.error(resp.data.msg);
                    } else {
                      this.$Message.success('发布成功');
                      this.$router.push('/transactionListByUser');
                    }
                  });
                }else{
                  this.$Http.post('/transaction/updateTransaction', this.params).then(resp => {
                    if (resp.data.code != "SUCCESS") {
                      this.$Message.error(resp.data.msg);
                    } else {
                      this.$Message.success('修改成功');
                      this.$router.push('/transactionListByUser');
                    }
                  });
                }
          },
           goBack() {
             window.history.length > 1
               ? this.$router.go(-1)
               : this.$router.push('/')
           },
           showNoPayWay(val){
             this.NoPayPwdShow=val;
           },
           showNoBankInfo(val){
             this.getBankInfoList();
             if(val==true){
               this.$refs.c1.setShow();
             }
           }
        },
        created (){
          this.getTransactiontypeList();
          this.getBankInfoList();
        },
        mounted(){
          if(this.$route.params.transactionId==null){
          }else{
            this.params.id=this.$route.params.transactionId;
            this.type="update";

            this.$Http.get('/transaction/findById',{id:this.params.id}).then(resp=>{
              this.params=resp.data.result;
              this.params.payWayArr=this.params.payWay.split(',');
            });
          }

        },
    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
  .input{
    width:500px;
  }
  .radio{
    padding-left: 0px;
  }
  .radio-son{
    margin-right: 10px;
  }
  .checkbox{
    padding-left: 0px
  }
  .checkbox-son{
    margin-right: 10px;
  }
</style>
