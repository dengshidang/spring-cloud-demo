<template>
  <!--个人中心-->
  <div class="son-container">
     <Navigation :index="0"></Navigation>
    <div class="personal-wrapper">
      <h4 class="personal-tit">我的资产</h4>
      <div class="asset-box">
        <router-link  class="asset-tab-link"  :to="{path:'/propertyDetails'}">资产明细</router-link>
        <div class="bd bg-f1">
          <div class="coin-asset-list">
            <div class="a-list-top">
              <span class="asset-option">币种</span>
              <span class="asset-option">总额</span>
              <span class="asset-option">可用</span>
              <span class="asset-option">冻结</span>
              <span class="asset-option">操作&nbsp;&nbsp;&nbsp;</span>
              <div class="clearfix"></div>
            </div>
            <div class="a-list-main home-scroll">
              <div class="a-list-row" v-for="(item,index) in list">
                <div class="a-list-cont">
                  <div class="asset-option">
                    <img src="../../assets/img/icon-coin1.png" class="asset-icon">
                    <label class="asset-name">{{item.coinName}}</label>
                    <div class="clearfix"></div>
                  </div>
                  <div class="asset-option">{{item.totalNum|fixed8}}</div>
                  <div class="asset-option">{{item.validNum|fixed8}}</div>
                  <div class="asset-option">{{item.frozenNum|fixed8}}</div>
                  <div class="asset-option">
                    <router-link class="record-btn" :to="{path:'/myOrderList'}">委托记录 </router-link>
                    <a href="javascript:void(0);" class="withdraw-btn" :class="{'btn-active':i==index && currView=='recharge'}"   @click="i=index;currView='recharge';">提币</a>
                    <a href="javascript:void(0);" class="charge-btn"    :class="{'btn-active':i==index && currView=='takeCash'}"     @click="i=index;currView='takeCash';getAddress();">充币</a>
                    <div class="clearfix"></div>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="a-list-operate">
                  <!--充值-->
                  <div class="asset-charge-box" v-if="i==index && currView=='takeCash'">
                    <form class="asset-form">
                      <div class="asset-f-row-1">
                        <span class="asset-f-text">充币地址</span>
                        <input type="text" class="asset-f-inp" readonly="readonly" v-model="address" id="link1">
                        <a href="javascript:void(0);" class="asset-copyBtn invite-copy" data-clipboard-target="#link1">复制</a>
                        <div class="clearfix"></div>
                      </div>
                      <div class="t-r col-1 ft-12 m-b-10" style="width: 510px;">*若您的充值未能及时到账，请输入您的交易ID，方便客服核查</div>
                      <div class="asset-f-row-1">
                        <span class="asset-f-text">交易ID</span>
                        <input type="text" class="asset-f-inp" v-model="tradeHash" placeholder="请输入交易ID">
                        <div class="clearfix"></div>
                      </div>
                      <Button class="asset-sub" @click="searchHash">提交</Button>
                      <div class="asset-code">
                        <span>二维码：</span>
                        <div class="asset-code-pic">
                         <!-- <img src="img/code.png">-->
                          <VueQr   :text="address" :size="110" :margin="0"></VueQr>

                        </div>
                      </div>
                      <div class="asset-tips">
                        <p>温馨提示</p>
                        <p>• 请勿向上述地址充值任何非USDT资产，否则资产将不可找回。</p>
                        <p>• 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</p>
                        <p>• 最小充值金额：100 USDT ，小于最小金额的充值将不会上账且无法退回。</p>
                        <p>• 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
                        <p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
                      </div>
                    </form>
                  </div>
                  <!--提现-->
                  <div class="asset-withdraw-box"  v-if="i==index && currView=='recharge'">
                    <form class="asset-form">
                      <div class="asset-f-row-2">
                        <span class="asset-f-text">接受地址：</span>
                        <Input type="text" style="width: 420px;" v-model="walletaddress"></Input>
                        <div class="clearfix"></div>
                      </div>
                      <div class="asset-f-row-2">
                        <span class="asset-f-text">提现数量：</span>
                        <Input type="text" style="width: 420px;" v-model="amount"></Input>
                        <div class="clearfix"></div>
                      </div>
                      <div class="asset-f-row-2">
                        <span class="asset-f-text">地址备注：</span>
                        <Input type="text" style="width: 420px;" v-model="remark"></Input>
                        <div class="clearfix"></div>
                      </div>
                      <div class="asset-f-row-2">
                        <span class="asset-f-text">资金密码：</span>
                        <Input type="password" style="width: 420px;" v-model="pwd"></Input>
                        <div class="clearfix"></div>
                      </div>
                      <Button class="asset-sub sub-2" @click="appliy">提交</Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>

</template>

<script>
    import Navigation from "../comm/Navigation"
    import VueQr from 'vue-qr'
    import {Input,Button} from 'iview'

    export default {
        name: "MyProperty",
        components:{Navigation,VueQr,Input,Button},
        data(){
          return {
            i:null,
            currView:null,
            list:[],
            address:'',
            walletaddress:null,
            amount:null,
            remark:null,
            pwd:null,
            tradeHash:null
          }
        },
        methods:{
            getuserbalancelist(){
              this.$Http.get('/userbalance/getUserBalanceList').then(resp=>{
                  this.list=resp.data.result;
              });
            },
            getAddress(){
              this.$Http.post('/wallet/getAddress',{coinId:this.list[this.i].coinId}).then(resp=>{
                this.address=resp.data.result;
              });
            },
             appliy(){
               this.$Http.post('/wallet/appliy',{coinId:this.list[this.i].coinId,walletaddress:this.walletaddress,amount:this.amount,remark:this.remark,pwd:this.pwd}).then(resp=>{
                 if(resp.data.code!="SUCCESS") {
                   this.$Message.error(resp.data.msg);
                 }else{
                   this.$Message.success('提交成功');
                   this.i=null;
                 }
               });
            },
            searchHash(){
              this.$Http.post('/wallet/searchHash',{coinId:this.list[this.i].coinId,tradeHash:this.tradeHash}).then(resp=>{
                if(resp.data.code!="SUCCESS") {
                  this.$Message.error(resp.data.msg);
                }else{
                  this.$Message.success('提交成功');
                  this.i=null;
                }
              });
          }

        },
        mounted(){
          this.getuserbalancelist();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>
