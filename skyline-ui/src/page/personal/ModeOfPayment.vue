<template>
  <div class="account-list">
    <template v-for="item in result">
      <template v-if="item.type==1">
        <div class="account-row">
          <img src="../../assets/img/icon-alipay.png" class="account-icon icon-w-2">
          <span class="account-row-name">支付宝</span>
          <input type="text" class="account-row-info" v-model="item.account" readonly="readonly"/>
          <a href="javascript:void(0);" class="account-operate alipay-update" @click="modal.zfb = true;currid=item.id;updateBindZfb(item)">修改</a>
          <div class="clearfix"></div>
        </div>
      </template>
      <template v-if="item.type==2">
        <div class="account-row">
          <img src="../../assets/img/icon-bank.png" class="account-icon icon-w-2">
          <span class="account-row-name">银行卡</span>
          <input type="text" class="account-row-info" v-model="item.account" readonly="readonly"/>
          <a href="javascript:void(0);" class="account-operate  bank-update" @click="modal.yhk = true;currid=item.id;updateBindCard(item)" >修改</a>
          <div class="clearfix"></div>
        </div>
      </template>
      <template v-if="item.type==0">
        <div class="account-row">
          <img src="../../assets/img/icon-wechat.png" class="account-icon icon-w-2">
          <span class="account-row-name">微信</span>
          <input type="text" class="account-row-info" v-model="item.account" readonly="readonly"/>
          <a href="javascript:void(0);" class="account-operate wechat-update" @click="modal.wx = true;currid=item.id;updateBindWx(item)">修改</a>
          <div class="clearfix"></div>
        </div>
      </template>
    </template>


    <div class="account-row t-c">
      <a href="javascript:void(0);" class="pay-add-btn" @click="modal.zffs = true;payPwd=null">添加支付方式</a>
    </div>
    <!--修改绑定支付宝-->
    <modal v-model="modal.zfb" width="400px" style="margin-top: 40px;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改绑定支付宝</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 100px;">
          <div class="pop-row-3">
            <span class="pop-text col-g">支付宝账号</span>
            <input type="text" class="pop-inp t-r" v-model="updateBindzfbParams.zfbAccount"/>
            <div class="clearfix"></div>
          </div>
          <div class="pay-up">
            <span class="pay-up-tit col-g">收款二维码</span>
            <div class="pay-up-block">
              <div class="pay-up-inp">
                <input @change="zfbFileImage" type="file" accept="image/jpeg,image/x-png,image/gif,png" id="" value="">
              </div>
              <div class="pay-up-pic">
                <img :src="this.$store.state.uploadUrl+updateBindzfbParams.zfbImgUrl">
              </div>
            </div>
            <span class="pay-up-tips">
						支付宝收款码获取方法：打开支付宝APP，在首页点击“收钱”，在个人收款二维码下方点击“保存图片”即可。
					</span>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">资金密码</span>
            <input type="password"  v-model="updateBindzfbParams.payPwd" class="pop-inp t-r"/>
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;" @click="UpdateZfbPayWay">提交
        </button>
      </div>

    </modal>

    <!--修改绑定微信-->
    <modal v-model="modal.wx" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改绑定微信</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 40px;">
          <div class="pop-row-3">
            <span class="pop-text col-g">微信账号</span>
            <input type="text" class="pop-inp t-r"  v-model="updateBindWxParams.wxAccount" />
            <div class="clearfix"></div>
          </div>
          <div class="pay-up">
            <span class="pay-up-tit col-g">收款二维码</span>
            <div class="pay-up-block">
              <div class="pay-up-inp">
                <input @change="wxFileImage" type="file" accept="image/jpeg,image/x-png,image/gif,png"  value="">
              </div>
              <div class="pay-up-pic">
                <img :src="this.$store.state.uploadUrl+updateBindWxParams.wxImgUrl">
              </div>
            </div>
            <span class="pay-up-tips">
						微信收款码获取方法：打开微信APP，在我的钱包页面点击“收付款”，然后在二维码下方点击“保存收款码”即可。
					</span>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">资金密码</span>
            <input v-model="updateBindWxParams.payPwd" type="password" class="pop-inp t-r"/>
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large"  class="pop-sub" style="margin-top: 0px;" @click="UpdateWxPayWay">提交
        </button>
      </div>
    </modal>

    <!--修改绑定银行卡-->
    <modal v-model="modal.yhk" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改绑定银行卡</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 40px;">
          <div class="pop-row-3">
            <span class="pop-text col-g">姓名</span>
            <input type="text" v-model="bankParams.name" class="pop-inp t-r" />
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">开户行</span>
            <input type="text"  v-model="bankParams.bankName" class="pop-inp t-r" />
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">银行卡开户地址</span>
            <input type="text"  v-model="bankParams.address"  class="pop-inp t-r"/>
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">银行卡号</span>
            <input type="text" v-model="bankParams.account" class="pop-inp t-r" />
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-3">
            <span class="pop-text col-g">资金密码</span>
            <input type="password" v-model="bankParams.payPwd" class="pop-inp t-r"/>
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large"  class="pop-sub" style="margin-top: 0px;" @click="UpdateBankPayWay">提交
        </button>
      </div>
    </modal>

    <!--添加支付方式-->
    <modal v-model="modal.zffs"  width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加支付方式</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 40px;">
          <span class="pop-text">支付方式</span>

          <div class="sel-top">
            <select class="sel-input w-100" v-model="selected"   style="height: 35px">
              <option v-for="item in items" v-bind:value="item.value">{{item.text}}</option>
            </select>
            <div style="height: 35px"></div>
          </div>

          <div class="set-pay-list">
            <!--支付宝-->
            <template v-if="selected==1">
              <div class="set-pay-box" style="display: block;">
                <div class="pop-row-3">
                  <span class="pop-text col-g">支付宝账号</span>
                  <input type="text" v-model="payWayParams_1.account" class="pop-inp t-r"/>
                  <div class="clearfix"></div>
                </div>
                <!--上传了图片后-->
                <div class="pay-up">
                  <span class="pay-up-tit col-g">收款二维码</span>
                  <div class="pay-up-block">
                    <div class="pay-up-inp">
                      <input @change="zfbFileImage" type="file" accept="image/jpeg,image/x-png,image/gif,png"  value="">
                    </div>
                    <template v-if="zfbImgUrl!=null">
                   <div class="pay-up-pic">
                      <img :src="this.$store.state.uploadUrl+zfbImgUrl">
                    </div>
                    </template>
                  </div>
                  <span class="pay-up-tips">
                                    支付宝收款码获取方法：打开支付宝APP，在首页点击“收钱”，在个人收款二维码下方点击“保存图片”即可。
                  </span>
                </div>

              </div>
            </template>
            <!--银行卡-->
            <template v-if="selected==2">
              <div class="set-pay-box" >
                <div class="pop-row-3">
                  <span class="pop-text col-g">姓名</span>
                  <input type="text"  v-model="payWayParams_2.name" class="pop-inp t-r"/>
                  <div class="clearfix"></div>
                </div>
                <div class="pop-row-3">
                  <span class="pop-text col-g">开户行</span>
                  <input type="text"  v-model="payWayParams_2.bankName"  class="pop-inp t-r">
                  <div class="clearfix"></div>
                </div>
                <div class="pop-row-3">
                  <span class="pop-text col-g">开户地址</span>
                  <input type="text" v-model="payWayParams_2.address"  class="pop-inp t-r"/>
                  <div class="clearfix"></div>
                </div>
                <div class="pop-row-3">
                  <span class="pop-text col-g">银行卡号</span>
                  <input type="text" v-model="payWayParams_2.account" class="pop-inp t-r"/>
                  <div class="clearfix"></div>
                </div>
              </div>
            </template>
            <!--微信-->
            <template v-if="selected==0">
              <div class="set-pay-box" >
                <div class="pop-row-3">
                  <span class="pop-text col-g">微信账号</span>
                  <input type="text" v-model="payWayParams_0.account" class="pop-inp t-r"/>
                  <div class="clearfix"></div>
                </div>
                <!--上传了图片后-->
                <div class="pay-up">
                  <span class="pay-up-tit col-g">收款二维码</span>
                  <div class="pay-up-block">
                    <div class="pay-up-inp">
                      <input @change="wxFileImage" type="file" accept="image/jpeg,image/x-png,image/gif,png"  value="">
                    </div>
                    <template v-if="wxImgUrl!=null">
                      <div class="pay-up-pic">
                        <img :src="this.$store.state.uploadUrl+wxImgUrl">
                      </div>
                    </template>
                  </div>
                  <span class="pay-up-tips">
                                    微信收款码获取方法：打开微信APP，在我的钱包页面点击“收付款”，然后在二维码下方点击“保存收款码”即可。
                  </span>
                </div>
              </div>
            </template>
          </div>

          <div class="pop-row-3">
            <span class="pop-text col-g">资金密码</span>
            <input type="password" v-model="payPwd" class="pop-inp t-r"/>
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">

        <button size="large" class="pop-sub"
                @click="addPayWay()">提交
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
  import util from './../../tool/util'
  import {Modal, Button} from 'iview'
    export default {
        name: "ModeOfPayment",
      components: {
        "modal": Modal,
        "mybtn":Button,
      },
      data(){
        return {
          userInfo:null,
          payPwd: null,
          result: [],
          zfbImgUrl:null,
          wxImgUrl:null,
          currid:null,
          modal: {
            payPwd: false,
            zfb: false,
            wx: false,
            yhk: false,
            zffs:false,
          },
          params: {
            zfbAccount:null,
            wxAccount:null,
            wxPayPwd:null,
            zfbPayPwd:null,
          },
          bankParams:{
            id:null,
            userId:null,
            account:null,
            name:null,
            type:'2',
            imgUrl:null,
            address:null,
            bankName:null,
            createTime:null,
            updateTime:null,
            payPwd:null,
          },
          payWayParams_0:{
            userId:null,
            account:null,
            type:'0',
            imgUrl:null,
            payPwd:null,
          },
          payWayParams_1:{
            userId:null,
            account:null,
            type:'1',
            imgUrl:null,
            payPwd:null,
          },
          payWayParams_2:{
            userId:null,
            account:null,
            name:null,
            type:'2',
            address:null,
            bankName:null,
            payPwd:null,
          },
          updateBindWxParams:{
            wxImgUrl:null,
            wxAccount:null,
            payPwd:null,
          },
          updateBindzfbParams:{
            zfbImgUrl:null,
            zfbAccount:null,
            payPwd:null,
          },
          items:[{text:'微信',value:'0'},{text:'支付宝',value:'1'},{text:'银行卡',value:'2'}],
          selected:'1'
        }
      },
      mounted(){
        this.getUserInfoByTokenId();
      },
      methods:{
        getUserInfoByTokenId() {
          this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
            this.nickName = resp.data.result.nickName;
            this.userInfo = resp.data.result;
            this.showPaymentMode();

          });
        },
        //展示银行卡信息
        showPaymentMode() {
          this.$Http.post('/userCertified/queryBindBankInfo', {userId: this.userInfo.id}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.result = resp.data.result;
            } else {
              this.$Message.error(resp.data.msg);
            }
          });

        },
        zfbFileImage: function (e) {
          let file = e.target.files[0];
          let imgSize = file.size / 1024;
          if (imgSize > 2048) {
            alert('请上传大小不要超过2M的图片')
          } else {
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            // 下面逻辑处理
            this.$Http.getFile("/upload",formData).then(resp => {
              this.zfbImgUrl = resp.data.result;
              this.updateBindzfbParams.zfbImgUrl = resp.data.result
            });

          }
        },
        wxFileImage: function (e) {
          let file = e.target.files[0];
          let imgSize = file.size / 1024;
          if (imgSize > 2048) {
            alert('请上传大小不要超过2M的图片')
          } else {
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            // 下面逻辑处理
            this.$Http.getFile("/upload",formData).then(resp => {
              this.wxImgUrl = resp.data.result;
              this.updateBindWxParams.wxImgUrl = resp.data.result;
            });
          }
        },
        //修改微信支付方式
        UpdateWxPayWay() {
          let id = this.currid;
          this.$Http.post("/userCertified/updatePayWay", {id:id,account:this.updateBindWxParams.wxAccount,imgUrl:this.updateBindWxParams.wxImgUrl,
            payPwd:this.updateBindWxParams.payPwd,type:'0'}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.wxImgUrl = resp.data.result;
              this.$Message.success('修改成功!');
              this.modal.wx = false;
              this.showPaymentMode();
            } else {
              this.$Message.error(resp.data.msg);
            }
          });
        },
        //修改支付宝支付
        UpdateZfbPayWay() {
          let id = this.currid;
          this.$Http.post("/userCertified/updatePayWay", {id:id,account:this.updateBindzfbParams.zfbAccount,imgUrl:this.updateBindzfbParams.zfbImgUrl,
            payPwd:this.updateBindzfbParams.payPwd,type:'1'}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.$Message.success('修改成功!');
              this.modal.zfb = false;
              this.showPaymentMode();
            } else {
              this.$Message.error(resp.data.msg);
            }
          });
        },
        //修改银行卡支付
        UpdateBankPayWay(){
          this.bankParams.id = this.currid;
          this.$Http.post("/userCertified/updateBankPayWay", this.bankParams).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.$Message.success('修改成功!');
              this.modal.yhk = false;
              this.showPaymentMode();
            } else {
              this.$Message.error(resp.data.msg);
            }
          });

        },
        addPayWay(){
          if(this.selected==0){
            this.payWayParams_0.userId = this.userInfo.id;
            this.payWayParams_0.imgUrl = this.wxImgUrl;
            this.payWayParams_0.payPwd = this.payPwd;
            this.$Http.post("/userCertified/bindBank", this.payWayParams_0).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.$Message.success('添加成功!');
                this.modal.zffs = false;
                this.showPaymentMode();
              } else {
                this.$Message.error(resp.data.msg);
              }
            });
          }
          if(this.selected==1){
            this.payWayParams_1.userId = this.userInfo.id;
            this.payWayParams_1.imgUrl = this.zfbImgUrl;
            this.payWayParams_1.payPwd = this.payPwd;
            this.$Http.post("/userCertified/bindBank", this.payWayParams_1).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.$Message.success('添加成功!');
                this.modal.zffs = false;
                this.showPaymentMode();
              } else {
                this.$Message.error(resp.data.msg);
              }
            });
          }
          if(this.selected==2){
            this.payWayParams_2.userId = this.userInfo.id;
            this.payWayParams_2.payPwd = this.payPwd;
            this.$Http.post("/userCertified/bindBank", this.payWayParams_2).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.$Message.success('添加成功!');
                this.modal.zffs = false;
                this.showPaymentMode();
              } else {
                this.$Message.error(resp.data.msg);
              }
            });
          }
        },
        updateBindWx :function (item) {
          this.updateBindWxParams.wxAccount= item.account;
          this.updateBindWxParams.wxImgUrl = item.imgUrl;
          this.updateBindWxParams.payPwd = null;
        },

        updateBindZfb:function (item) {
          this.updateBindzfbParams.zfbAccount= item.account;
          this.updateBindzfbParams.zfbImgUrl = item.imgUrl;
          this.updateBindzfbParams.payPwd = null;
        },
        updateBindCard :function (item) {
          this.bankParams = item;
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>
