<template>
  <!--付款详情-->
  <div class="son-container">
    <a href="javascript:void(0);" @click="goBack()" class="history-btn">&lt;&lt;返回</a>
    <div class="pay-wrapper">
      <!--订单详情-->
      <div class="pay-box">
        <div class="pay-row">

          <template v-if="item.transactionType==0">
            <span class="pay-order-info" v-if="uid==item.userId">您向{{item.merchantName}}购买{{item.number}}{{item.coinName}}</span>
            <span class="pay-order-info" v-if="uid==item.merchantId">{{item.userName}}向您购买{{item.number}}{{item.coinName}}</span>
          </template>
          <template v-if="item.transactionType==1">
          <span class="pay-order-info" v-if="uid==item.userId">您向{{item.merchantName}}出售{{item.number}}{{item.coinName}}</span>
          <span class="pay-order-info" v-if="uid==item.merchantId">{{item.userName}}向您出售{{item.number}}{{item.coinName}}</span>
        </template>

          <span class="pay-order-info">订单编号：{{item.orderNo}}</span>
          <div class="pay-price m-b-10">
            <label>单价：</label>{{item.price}}      {{item.coinName}}/CNY
          </div>
          <div class="pay-price">
            <label>总价：</label>{{item.totalPrice}}  CNY
          </div>
        </div>
        <div class="pay-line"></div>
        <div class="unpaid-block" >
              <!--付款方式选择-->
              <!--未付款-->
              <template v-if="userType==1 || userType==4 ">
                <div class="pay-row" v-if="item.status==0">
                <span class="d-b f-l">支付方式：</span>
                <div class="pay-sel">
                  <div class="pay-sel-top">
                    <template v-for="bank in BankInfoList">
                        <a href="javascript:void(0);" class="pay-option" :class="{'pay-option-active':payWayType==0}"  @click="payWayType=0" v-if="bank.type==0">
                          <img src="../../assets/img/icon-wechat.png">
                          <span>微信</span>
                        </a>
                    </template>
                    <template v-for="bank in BankInfoList">
                      <a href="javascript:void(0);" class="pay-option " :class="{'pay-option-active':payWayType==1}"  @click="payWayType=1" v-if="bank.type==1">
                        <img src="../../assets/img/icon-alipay.png">
                        <span>支付宝</span>
                      </a>
                    </template>
                    <template v-for="bank in BankInfoList">
                      <a href="javascript:void(0);" class="pay-option" :class="{'pay-option-active':payWayType==2}"  @click="payWayType=2" v-if="bank.type==2">
                        <img src="../../assets/img/icon-bank.png">
                        <span>银行卡</span>
                      </a>
                    </template>
                    <div class="clearfix"></div>
                  </div>
                  <div class="pay-sel-list">
                    <template v-for="bank in BankInfoList">
                      <div class="pay-info-box" v-if="payWayType==0 && bank.type==0">
                        <span class="pay-info-text">姓名：{{bank.name}}</span>
                        <span class="pay-info-text">账号：{{bank.account}}</span>
                        <span class="pay-info-text">备注：{{item.remarkCode}}</span>
                        <div class="pay-info-pic">
                          <img :src="$store.state.uploadUrl + bank.imgUrl">
                          <span>(扫描二维码支付)</span>
                        </div>
                      </div>
                      <div class="pay-info-box" v-if="payWayType==1 && bank.type==1">
                        <span class="pay-info-text">姓名：{{bank.name}}</span>
                        <span class="pay-info-text">账号：{{bank.account}}</span>
                        <span class="pay-info-text">备注：{{item.remarkCode}}</span>
                        <div class="pay-info-pic">
                          <img :src="$store.state.uploadUrl + bank.imgUrl">
                          <span>(扫描二维码支付)</span>
                        </div>
                      </div>
                      <div class="pay-info-box" v-if="payWayType==2 && bank.type==2">
                        <span class="pay-info-text">姓名：{{bank.name}}</span>
                        <span class="pay-info-text">开户银行：{{bank.bankName}}</span>
                        <span class="pay-info-text">开户支行：{{bank.address}}</span>
                        <span class="pay-info-text">银行卡号：{{bank.account}}</span>
                        <span class="pay-info-text">备注：{{item.remarkCode}}</span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              </template>
              <template v-if="(userType==2 || userType==3 )&& item.status==0">
                <div class="pay-row">
                  <div class="pay-tips ft-20 col-4 f-w-b m-b-10">
                    等待对方付款，付款时间剩余<span class="col-1">{{item.time|dateFormat}}</span>
                  </div>
                </div>
              </template>
              <!--已付款,等待对方确认-->
              <div class="pay-row" v-if="(item.status==1  ) && (userType==1 || userType==4)">
                  <span class="d-b f-l">支付方式：</span>
                  <div class="pay-sel">
                    <div class="pay-sel-top">
                      <a href="javascript:void(0);" class="pay-option pay-option-active" >
                        <template v-for="bank in BankInfoList">
                            <template v-if="item.payWay==bank.id && bank.type==0 ">
                              <img src="../../assets/img/icon-wechat.png">
                              <span>微信</span>
                            </template>
                            <template v-if="item.payWay==bank.id && bank.type==1">
                              <img src="../../assets/img/icon-alipay.png">
                              <span>支付宝</span>
                            </template>
                            <template v-if="item.payWay==bank.id && bank.type==2">
                              <img src="../../assets/img/icon-bank.png">

                              <span>{{bank.bankName}}</span>
                            </template>
                        </template>
                      </a>
                      <div class="clearfix"></div>
                    </div>
                    <div class="pay-sel-list">
                      <div class="pay-info-box">

                        <template v-for="bank in BankInfoList">
                          <template v-if="(item.payWay==0  && bank.type==0)||(item.payWay==1  && bank.type==1)">
                            <span class="pay-info-text">姓名：{{bank.name}}</span>
                            <span class="pay-info-text">账号：{{bank.account}}</span>
                            <span class="pay-info-text">备注：{{item.remarkCode}}</span>
                          </template>
                        </template>
                        <template v-for="bank in BankInfoList">
                          <template v-if="(item.payWay==2  && bank.type==2)">
                            <span class="pay-info-text">姓名：{{bank.name}}</span>
                            <span class="pay-info-text">账号：{{bank.account}}</span>
                            <span class="pay-info-text">备注：{{item.remarkCode}}</span>
                          </template>
                        </template>
                        <!--已上传成功的支付凭证-->
                        <div class="gallery">
                          <img :src="$store.state.uploadUrl+item.imgUrl" class="pay-up-look">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix"></div>

              </div>

              <div class="pay-row" v-if="item.status==3 ">
              <div class="ft-20 f-w-b">订单已取消，无法查看更多信息。</div>
             </div>
              <div class="pay-row" v-if="  item.status==4">
                <div class="ft-20 f-w-b">订单已自动取消，无法查看更多信息。</div>
              </div>
              <div class="pay-row" v-if="  item.status==5">
                <div class="ft-20 f-w-b">订单已审诉完成，无法查看更多信息。</div>
              </div>
              <div class="pay-row" v-if="item.status==9 ">
                <div class="ft-20 f-w-b">订单异常关闭，无法查看更多信息。</div>
              </div>

              <div class="pay-line"  v-if="item.status!=3 && item.status!=4 &&  item.status!=5 && item.status!=9 &&(userType==1 || userType==4)"></div>

              <div class="pay-row" style="height: 260px;" v-if="(item.status==1 && item.isAppeal==1 )&& (userType==1 || userType==4)">
                <div class="pay-tips ft-20 col-4 f-w-b m-b-10">
                  卖家未确认收款，等待超时，您可进行申诉
                </div>
                <div class="pay-tips col-g ft-12">(6小时内可以进行申诉，过时平台不做任何处理)</div>


                <div class="pay-appeal-time">申诉倒计时 <span>{{item.time|dateFormat}}</span></div>
                <router-link :to="{name:'transactionState',params:{id:item.id}}" class="pay-appeal-btn">去申诉</router-link>
              </div>
              <div  class="pay-row" style="height: 260px;" v-if="(item.status==6 )&& (userType==1 || userType==4)">
                <div class="pay-tips ft-20 col-4 f-w-b m-b-10">
                  您已经提交申诉，客服将介入调查， 请耐心等待，请保待通讯畅通！
                </div>
                <router-link :to="{name:'transactionState',params:{id:item.id}}" class="pay-appeal-btn">撤消申诉</router-link>
              </div>

              <!--上传截图-->
              <div class="pay-row" v-if="item.status==0 &&(userType==1 || userType==4)">
                <div class="pay-tips ft-18 col-4 f-w-b m-b-10">
                  <template v-if="item.transactionType==0">
                    待支付，请于<span class="col-1">{{item.time|dateFormat}}</span>内向 {{item.merchantName}} 支付 <span class="col-1">{{item.totalPrice}}CNY</span>
                  </template>
                  <template v-if="item.transactionType==1">
                    待支付，请于<span class="col-1">{{item.time|dateFormat}}</span>内向 {{item.userName}} 支付 <span class="col-1">{{item.totalPrice}}CNY</span>
                  </template>
                </div>
                <div class="pay-tips col-1">付款成功后请上传支付截图，点击“确认付款”。</div>
                <div class="pay-up-inp">
                  <input type="file" @change='uploadFile'>
                  <!--上传成功后显示上传的图片-->
                  <img :src="$store.state.uploadUrl + imgUrl" v-if="imgUrl!='' && imgUrl!=null">
                </div>
                <span class="d-b ft-12" v-if="item.status==0">上传支付凭证</span>
                <div class="pay-foot" v-if="item.status==0">
                  <a href="javascript:void(0);" class="pay-confirm" @click="makeMoney()">确认付款</a>
                  <a href="javascript:void(0);" class="pay-cancel" @click="cancelModel()">取消订单</a>
                  <div class="clearfix"></div>
                </div>
              </div>
            <template v-if="(item.status==1 ) &&  (userType==2 || userType ==3)">
              <div class="pay-row" >
                <div class="pay-tips ft-20 col-4 f-w-b m-b-20">
                  对方已付款,交易时间剩余<span class="col-1">{{item.time|dateFormat}}</span>
                </div>
                <div class="gallery m-b-20">
                  <img :src="$store.state.uploadUrl+item.imgUrl" class="pay-up-check">
                </div>
              </div>
              <div style="position: absolute; bottom: 150px; margin-left: 3%;">
                <span class="d-b col-1 ft-12 m-b-10">确认收款成功后，请点击“确认收款”</span>
                <a href="javascript:void(0);" class="pay-confirm" @click="modal = true">确认已收款并放行</a>
                <template v-if="item.isAppeal==1">
                   <router-link :to="{name:'transactionState',params:{id:item.id}}" class="sell-apple">订单申诉</router-link>
                </template>
              </div>
            </template>
              <div class="pay-row" v-if="(item.status==1 && item.isAppeal==0)&& (userType==1 || userType==4)">
                <div class="pay-tips ft-20 col-4 f-w-b m-b-10">
                  您已支付，等待
                  <template v-if="uid==item.userId">
                    {{item.merchantName}}
                  </template>
                  <template v-if="uid==item.merchantId">
                    {{item.userName}}
                  </template>
                  确认收款 ，剩余<span class="col-1">{{item.time| dateFormat }}</span>
                </div>
              </div>

              <div class="pay-row" v-if="item.status==2 ">
                <div class="pay-tips ft-20 col-4 f-w-b m-b-20">
                  交易完成
                </div>
                <div class="gallery m-b-20">
                  <img :src="$store.state.uploadUrl+item.imgUrl" class="pay-up-check">
                </div>
              </div>
              <div class="pay-foot-tips" v-if="userType==1 || userType==4">
                <p class="col-1">温馨提示：</p>
                <p>1.您的汇款将直接进入卖方账户，交易过程中卖方出售的资产由平台托管保护。</p>
                <p>2.请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字货币资产划转到您的账户。</p>
                <p>3.如果买方当日取消订单达3次，将会限制当日的买卖功能。</p>
              </div>
              <div class="pay-foot-tips-2" v-if="userType==2 ||  userType==3">
                <p class="col-1">温馨提示：</p>
                <p>1.您的汇款将直接进入卖方账户，交易过程中卖方出售的资产由平台托管保护。</p>
                <p>2.请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字货币资产划转到您的账户。</p>
                <p>3.如果买方当日取消订单达3次，将会限制当日的买卖功能。</p>
              </div>
          </div>

      </div>

      <!--聊天窗-->
      <div class="chat-box">
        <div class="chat-head">
          <img src="../../assets/img/icon-chat.png">
          <span>与
            <template v-if="uid==item.userId">{{item.merchantName}}</template>
             <template v-if="uid==item.merchantId">{{item.userName}}</template>
            对话</span>
        </div>
        <div id="scrolldIV" class="chat-main home-scroll">
          <template v-for="msg in messageList">
            <span class="chat-notice" v-if="msg.senderId==-1 && msg.recipientId==uid">{{msg.message}}  {{msg.createTime}}</span>
            <span class="chat-time"  v-if="msg.senderId !=-1 ">{{msg.createTime}}</span>
            <div class="chat-left" v-if="msg.senderId!=uid && msg.senderId!=-1 ">
              <img src="../../assets/img/icon-user1.png" class="chat-icon">
              <span class="chat-cont">{{msg.message}}</span>
              <div class="clearfix"></div>
            </div>
            <div class="chat-right"  v-if="msg.senderId==uid">
              <img src="../../assets/img/icon-user2.png" class="chat-icon">
              <span class="chat-cont-right">{{msg.message}}</span>
              <div class="clearfix"></div>
            </div>
          </template>
        </div>
        <div class="chat-foot">
          <input type="text" class="chat-inp" placeholder="输入内容" v-model="msg"  maxlength="100">
          <button class="chat-send" @click="send()"></button>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

     <Modal v-model="modal"  width="500">
      <p slot="header" style="text-align:center;font-size: 18px">

        <span>确认已收款并放行</span>
      </p>
      <div style="padding: 10px;">
        <p class="col-1" style="font-size: 15px;margin-bottom: 10px;">请务必登录网上银行，或第三方支付账号确认收到该笔款项</p>
        <label class="col-g " style="font-size: 14px;">资金密码</label>
        <Input  placeholder="请输入资金密码" v-model="payPwd" type="password" style="width: 450px;margin-top: 10px" ></Input>
      </div>
      <div slot="footer" >
        <Checkbox v-model="bool" style="margin-left: 10px;">我确认已登录收款账户，并核对收款无误</Checkbox>
        <Button type="primary" @click="confirmMakeMoney" >确认已收款并放行</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
    import {Modal,Icon,Button,Input,Checkbox} from 'iview'
    export default {
        name: "Transactionorder",
        components:{Modal,Icon,Button,Input,Checkbox},
        data(){
          return{
              uid:this.$store.state.uid,
              payWayType:null,
              payWayId:null,
              BankInfoList:[],
              messageList:[],
              imgUrl:null,
              msg:'',
              modal:false,
              bool:true,
              item:{},
              userType:null,
              payPwd:null,
              timer:null,
              stateItem:null,
          }
        },
        watch:{
          '$store.state.isResponse'(val){
            if(val){
              let mess=JSON.parse(this.$store.state.message);
                if(mess.orderId==this.$route.params.id){
                  let obj={message:mess.msg,
                           orderId:mess.orderId,
                           senderId:mess.senderId,
                           recipientId:mess.recipientId,
                           createTime:mess.createTime};
                  this.messageList[this.messageList.length]=obj;
                  if(mess.type==1 || mess.type==2 || mess.type==3  || mess.type==4 || mess.type==5 || mess.type == 6 || mess == 9  ){
                    this.getTransactionorder();
                  }
                }
            }
          }
        },
        methods:{
          uploadFile(e){
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            this.$Http.getFile('/upload',formData).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('上传成功');
                this.imgUrl=resp.data.result;
              }
            });
          },
          getTransactionstate(){
            this.$Http.get('transactionstate/getTransactionstateByOrderNo',{orderNo:this.item.orderNo}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.stateItem=resp.data.result;
              }
            });
          },
          getTransactionorder(){
            this.$Http.get('transactionorder/getTransactionorder',{transactionorderId:this.$route.params.id}).then(resp=>{
                  this.item=resp.data.result;
                  clearTimeout(this.timer)
                  this.setTimer();
                  this.getBankInfoList();
                  this.getMessageList();
                  this.getTransactionstate();
                  if(this.item.transactionType==0 && this.uid==this.item.userId){
                    this.userType=1;
                  }else if(this.item.transactionType==0 && this.uid==this.item.merchantId){
                    this.userType=2;
                  }else if(this.item.transactionType==1 && this.uid==this.item.userId){
                    this.userType=3;
                  }else if(this.item.transactionType==1 && this.uid==this.item.merchantId){
                    this.userType=4;
                  }
            });
          },
          getBankInfoList(){
              this.$Http.get('/transactionorder/getBankinfoByOrder',{id:this.item.id}).then(resp=>{
                this.BankInfoList=resp.data.result;
                this.payWayId=this.BankInfoList[0].id;
                this.payWayType=this.BankInfoList[0].type;
              });
          },
          cancelModel() {
            this.$Modal.confirm({
              title: '取消订单',
              content: '<p>您确定要取消订单？每日最多取消三次，超过三次则不能交易</p>',
              onOk: () => {
                this.cancelOrder();
              },
            });
          },
          cancelOrder(){
            this.$Http.post('/transactionorder/cancelOrder',{transactionorderId:this.$route.params.id}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('取消成功');
                this.getTransactionorder();
              }
            });
          },
          makeMoney(){
            if(this.imgUrl==null || this.imgUrl==''){
              this.$Message.error("请先上传支付凭证！");
              return false;
            }
            this.$Http.post('/transactionorder/makeMoney',{transactionorderId:this.$route.params.id,imgUrl:this.imgUrl,payWay:this.payWayId}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('确认付款成功');
                this.getTransactionorder();
              }
            });
          },
          confirmMakeMoney(){
            if(this.payPwd==null || this.payPwd==''){
              this.$Message.error("请输入资金密码！");
              return false;
            }
            this.$Http.post('/transactionorder/confirmMakeMoney',{transactionorderId:this.$route.params.id,payPwd:this.payPwd}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('确认收款成功');
                this.modal=false;
                this.getTransactionorder();
              }
            });
          },
          getMessageList(){
            this.$Http.get('/transactionorder/getMessageList',{orderId:this.$route.params.id}).then(resp=>{
              this.messageList=resp.data.result;
            });
          },
          setTimer () {
            this.timer = setInterval( () => {
              this.item.time--;
              if(this.item.time==0){
                 clearTimeout(this.timer);
              }
            }, 1000);
          },
          send(){
            this.$Http.post('/transactionorder/send',{transactionorderId:this.$route.params.id,msg:this.msg}).then(resp=>{
              if(resp.data.code=="SUCCESS") {
                this.msg="";
                this.messageList[this.messageList.length]=resp.data.result;
                let div = document.getElementById('scrolldIV');
                div.scrollTop = div.scrollHeight;
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

          this.$store.commit('uploadOrderId',this.$route.params.id);
          this.getTransactionorder();
          let div = document.getElementById('scrolldIV');
          div.scrollTop = div.scrollHeight;
        },

    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
  @import "../../assets/css/fsgallery.css";
  .chat-cont-right{
    width: 60%;
    float: right;
    text-align: right;
    margin-right: 10px;
  }
</style>
