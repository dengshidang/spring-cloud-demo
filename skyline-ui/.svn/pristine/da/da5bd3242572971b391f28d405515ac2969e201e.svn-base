<template>
  <div class="account-list">
    <div class="account-row">
      <img src="../../assets/img/icon-email.png" class="account-icon icon-w-1">
      <span class="account-row-name">邮箱</span>
      <span class="account-row-status">
            <template v-if="userInfo.email==null || userInfo.email==''">未绑定</template>
           <template v-if="!(userInfo.email == null || userInfo.email=='') ">{{userInfo.email}}</template>
          </span>
      <!--<span class="account-row-status">943****555@qq.com</span>-->
      <span class="account-row-explain">（用于提币、找回密码、修改安全设置）</span>
      <a href="javascript:void(0);" v-if="userInfo.email==null || userInfo.email==''" class="account-operate bind-email"
         @click="modal.email = true">绑定</a>
      <div class="clearfix"></div>
    </div>
    <div class="account-row">
      <img src="../../assets/img/icon-tel.png" class="account-icon icon-w-1">
      <span class="account-row-name">手机</span>
      <span class="account-row-status">
            <template v-if="userInfo.phone==null|| userInfo.phone==''">未绑定</template>
            <template v-if="!(userInfo.phone==null|| userInfo.phone=='')">{{userInfo.phone}}</template>
          </span>
      <span class="account-row-explain">（用于提币、找回密码、修改安全设置）</span>
      <a href="javascript:void(0);" class="account-operate bind-tel" v-if="(userInfo.phone=='') || (userInfo.phone==null)"
         @click="modal.phone = true">绑定</a>
      <div class="clearfix"></div>
    </div>
    <div class="account-row">
      <img src="../../assets/img/icon-pwd.png" class="account-icon icon-w-1">
      <span class="account-row-name">登录密码</span>
      <input type="password" value="*********" class="account-row-info" readonly="readonly"/>
      <a href="javascript:void(0);" class="account-operate update-log-pwd" @click="modal.loginPwd = true">修改</a>
      <div class="clearfix"></div>
    </div>
    <div class="account-row">
      <img src="../../assets/img/icon-pwd.png" class="account-icon icon-w-1">
      <span class="account-row-name">资金密码</span>
      <input type="password" v-model="userInfo.payPwd" class="account-row-info" value="--" readonly="readonly"/>
      <!--<input type="password" class="account-row-pwd" value="555565555" readonly="readonly" />-->
      <a v-if="userInfo.payPwd==null || userInfo.payPwd==''" href="javascript:void(0);" class="account-operate set-asset-pwd"
         @click="modal.payPwd = true">设置</a>
      <a v-if="!(userInfo.payPwd==null || userInfo.payPwd =='')" href="javascript:void(0);" class="account-operate update-asset-pwd"
         @click="modal.uploadPayPwd = true">修改</a>
      <div class="clearfix"></div>
    </div>
    <!--设置过资金密码才会显示-->
    <template v-if="userInfo.payPwd!=null&&userInfo.payPwd!=''">
      <div class="account-row">
        <img src="../../assets/img/icon-pwd.png" class="account-icon icon-w-1">
        <span class="account-row-name">忘记资金密码</span>
        <input type="password" class="account-row-info" value="" readonly="readonly"/>
        <a href="javascript:void(0);" class="account-operate find-asset-pwd" @click="cleanUpdataForFindPayPwd();modal.retrievePayPwd= true">找回资金密码</a>
        <div class="clearfix"></div>
      </div>
    </template>
    <!--绑定邮箱弹窗-->
    <modal v-model="modal.email" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>邮箱绑定</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <div class="pop-row-1">
            <span class="pop-text">邮箱地址</span>
            <input type="text" class="pop-inp" v-model="params.email" placeholder="请输入邮箱地址">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-2">
            <input type="text" v-model="params.emailCode" class="pop-inp" placeholder="验证码">
            <input type="button" @click="sendEmail(2)" v-model="emailBut" class="pop-code-btn" id="mail-btn">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="submitBingEmail()">提交
        </button>

      </div>
    </modal>
    <!--绑定手机弹窗-->
    <modal v-model="modal.phone" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>手机号绑定</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <div class="pop-row-1">
            <span class="pop-text">手机号码</span>
            <input type="text" v-model="params.phone" class="pop-inp" placeholder="请输入手机号码">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-2">
            <input type="text" v-model="params.phoneCode" class="pop-inp" placeholder="验证码">
            <input type="button" @click="sendPhone(2)" v-model="phoneBut" class="pop-code-btn" id="tel-btn">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">

        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="submitBingPhone()">提交
        </button>
      </div>
    </modal>

    <!--设置资金密码弹窗-->
    <modal v-model="modal.payPwd" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>设置资金密码</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <div class="pop-row-1">
            <span class="pop-text">资金密码</span>
            <input type="password" class="pop-inp" v-model="params.payPwd1" placeholder="请输入至少6位数，且包含数字和字母">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-1">
            <span class="pop-text">确认密码</span>
            <input type="password" v-model="params.payPwd2" class="pop-inp" placeholder="确认资金密码">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="submitSetPayPwd()">提交
        </button>
      </div>
    </modal>

    <!--找回资金密码弹窗-->
    <modal v-model="modal.retrievePayPwd" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>找回密码</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <span><mybtn style="margin-top: 0px;" :class="{redBg:modal.sjyz}" @click="modal.sjyz=true;modal.yxyz=false;findPayPwdParams={};" >手机验证</mybtn></span>
          <span><mybtn style="margin-top: 0px;" :class="{redBg:modal.yxyz}" @click="modal.sjyz=false;modal.yxyz=true;findPayPwdParams={};">邮箱验证</mybtn></span>
          <template v-if="modal.sjyz">
          <div class="pop-row-1">
            <span class="pop-text">手机号码</span>
            <input v-model="findPayPwdParams.phone"   type="text" class="pop-inp" placeholder="请输入手机号码">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-2">
            <input type="text" v-model="findPayPwdParams.code" class="pop-inp" placeholder="验证码">
            <input type="button" @click="sendPhone(3)" v-model="phoneBut"class="pop-code-btn" value="发送验证码" >
            <div class="clearfix"></div>
          </div>
          </template>
          <template v-if="modal.yxyz">
          <div class="pop-row-1">
            <span class="pop-text">邮箱地址</span>
            <input type="text" v-model="findPayPwdParams.email"  class="pop-inp" placeholder="请输入邮箱地址">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-2">

          <!--  <span v-show="show" @click="getCode">获取验证码</span>
            <span v-show="!show" class="count">{{count}} </span>-->
            <input type="text" v-model="findPayPwdParams.code" class="pop-inp" placeholder="验证码">
            <input type="button" @click="sendEmail(3)" v-model="emailBut"  class="pop-code-btn" value="发送验证码" id="mail-btn-2">
            <div class="clearfix"></div>
          </div>
          </template>
          <div class="pop-row-1">
            <span class="pop-text">资金密码</span>
            <input type="password" class="pop-inp" v-model="findPayPwdParams.payPwd1" placeholder="请输入至少6位数，且包含数字和字母">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-1">
            <span class="pop-text">确认密码</span>
            <input type="password" v-model="findPayPwdParams.payPwd2" class="pop-inp" placeholder="确认资金密码">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="findPayPwd()">提交
        </button>
      </div>
    </modal>

    <!--修改资金密码弹窗-->
    <modal v-model="modal.uploadPayPwd" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改资金密码</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <div class="pop-row-1">
            <span class="pop-text">旧密码</span>
            <input type="password" v-model="updatePayPwdParams.oldPayPwd" class="pop-inp" placeholder="请输入旧密码">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-1">
            <span class="pop-text">新密码</span>
            <input type="password" v-model="updatePayPwdParams.newPayPwd" class="pop-inp" placeholder="请设置新密码">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="submitUpdatePayPwd()">提交
        </button>
      </div>
    </modal>
    <!--修改登录密码-->
    <modal v-model="modal.loginPwd" width="400px" style="display: block;">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改登录密码</span>
      </p>
      <div>
        <form class="pop-form" style="margin-top: 10px;">
          <div class="pop-row-1">
            <span class="pop-text">旧密码</span>
            <input type="password" v-model="updateLoginPwdParams.oldLoginPwd" class="pop-inp" placeholder="请输入旧密码">
            <div class="clearfix"></div>
          </div>
          <div class="pop-row-1">
            <span class="pop-text">新密码</span>
            <input type="password" v-model="updateLoginPwdParams.newLoginPwd" class="pop-inp" placeholder="请设置新密码">
            <div class="clearfix"></div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button size="large" class="pop-sub" style="margin-top: 0px;"
                @click="submitUpdateLoginPwd()">提交
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {Modal, Button} from 'iview'
  import util from './../../tool/util'

  export default {
    name: "Security",
    components: {
      "modal":Modal,
      "mybtn":Button,

    },
    data:function(){
      return {
        phoneTimer: null,
        emailTimer: null,
        userInfo:{
          id:null,
          nickName:null,
          phone:null,
          email:null,
          loginPwd:null,
          payPwd:null,
          invit:null,

        },
        phoneBut: "获取验证码",
        emailBut: "获取验证码",
        bool: true,
        payPwd: null,
        modal: {
          payPwd:false,
          phone: false,
          email: false,
          loginPwd: false,
          retrievePayPwd: false,
          uploadPayPwd: false,
          sjyz:true,
          yxyz:false,
        },
        params: {
          email: null,
          emailCode: null,
          phoneCode: null,
          phone: null,
          payPwd1: null,
          payPwd2: null,
        },
        updateLoginPwdParams:{
          oldLoginPwd: null,
          newLoginPwd: null,
        },
        updatePayPwdParams:{
          oldPayPwd: null,
          newPayPwd: null,
        },
        findPayPwdParams:{
            phone: null,
            email: null,
            code:null,
            payPwd1:null,
            payPwd2:null,
        }
    }
    },
    mounted: function () {
      this.getUserInfoByTokenId();
    },
    methods:{
      getUserInfoByTokenId() {
        this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
          this.userInfo = resp.data.result;
        });
      },
      getPhoneCode(){
        this.phoneTimer = setInterval(() => {
          if (this.phoneBut > 0 && this.phoneBut <= 60) {
            this.phoneBut--;
          } else {
            this.phoneBut='获取验证码';
            clearInterval(this.phoneTimer);
            this.phoneTimer = null;
          }
        }, 1000);
      },
      getEmailCode(){
        this.emailTimer = setInterval(() => {
          if (this.emailBut > 0 && this.emailBut <= 60) {
            this.emailBut--;
          } else {
            this.emailBut='获取验证码';
            clearInterval(this.emailTimer);
            this.emailTimer = null;
          }
        }, 1000);
      },
      //发送邮件验证码
      sendEmail(param) {
        if (this.emailBut != "获取验证码") {
          return;
        }
        let email=null;
        if(param==2){
          if (this.params.email == null) {
            this.$Message.error("邮箱地址不能为空!");
            return;
          }
          email = this.params.email;
        }else if(param==3){
          if (this.findPayPwdParams.email == null) {
            this.$Message.error("邮箱地址不能为空!");
            return;
          }
          email = this.findPayPwdParams.email;
        }
        if(!this.$fun.checkEmail(email)){
          this.$Message.error("邮箱格式错误");
          return ;
        }
        this.getEmailCode();
        this.emailBut = 60;
        this.$Http.post("/userinfo/sendMailCode", {email: email,type:param}).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.cleanTimer();
            this.$Message.error(resp.data.msg);
          }else{
            this.$Message.success("邮件发送成功，请注意查收！");
          }

        });
      },
      //发送手机短信验证码
      sendPhone(param) {
        if (this.phoneBut != "获取验证码") {
          return;
        }
        let phone = null;
        if(param==2){
          if (this.params.phone == null) {
            this.$Message.error("手机号码不能为空!");
            return;
          }
          phone = this.params.phone;
        }else if(param==3){
          if (this.findPayPwdParams.phone == null) {
            this.$Message.error("手机号码不能为空!");
            return;
          }
          phone = this.findPayPwdParams.phone;
        }
        if(!this.$fun.checkPhone(phone)){
          this.$Message.error("手机号码格式错误");
          return ;
        }
        this.getPhoneCode();
        this.phoneBut=60;
        this.$Http.post("/userinfo/sendSmsCode", {phone:phone,type:param}).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.cleanTimer();
            this.$Message.error(resp.data.msg);
          } else {
            this.$Message.success("验证码送成功，请注意查收！");
          }
        });
      },
      //绑定邮箱
      submitBingEmail() {
        this.$Http.post("/userinfo/bingEmail", {
          id: this.userInfo.id,
          email: this.params.email,
          emailCode: this.params.emailCode,
          token: util.local.get("token")
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.$Message.error(resp.data.msg);
            this.modal.email = false;
          } else {
            this.$Message.success('操作成功!');
            this.modal.email = false;
            this.getUserInfoByTokenId();
          }
        });

      },
      //绑定手机
      submitBingPhone() {
        this.$Http.post("/userinfo/bingPhone", {
          id: this.userInfo.id,
          phone: this.params.phone,
          phoneCode: this.params.phoneCode,
          token: util.local.get("token")
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.$Message.error(resp.data.msg);
            this.modal.phone = false;
          } else {
            this.$Message.success('操作成功!');
            this.modal.phone = false;
            this.getUserInfoByTokenId();
          }
        });
      },
      //设置支付密码
      submitSetPayPwd() {
        if (this.params.payPwd1 != this.params.payPwd2) {
          this.$Message.error("两次密码不一致，请重新输入!");
          return;
        }

        if(!this.$fun.checkPwd(this.params.payPwd1)){
          this.$Message.error("密码必须是6-12位，且包含数字和字母");
          return ;
        }
        this.$Http.post("/userinfo/setPayPwd", {
          id: this.userInfo.id,
          payPwd: this.params.payPwd1,
          token: util.local.get("token")
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.$Message.error(resp.data.msg);
            this.modal.uploadPayPwd = false;
          } else {
            this.$Message.success('操作成功!');
            this.modal.payPwd = false;
            this.getUserInfoByTokenId();
          }
        });
      },
      //修改支付密码
      submitUpdatePayPwd() {
        if (this.updatePayPwdParams.oldPayPwd == this.updatePayPwdParams.newPayPwd) {
          this.$Message.error("两次密码一致，请重新输入!");
          return;
        }
        if(!this.$fun.checkPwd(this.updatePayPwdParams.newPayPwd)){
          this.$Message.error("密码必须是6-12位，且包含数字和字母");
          return ;
        }
        this.$Http.post("/userinfo/updatePayPwd", {
          id: this.userInfo.id,
          oldPayPwd: this.updatePayPwdParams.oldPayPwd,
          newPayPwd: this.updatePayPwdParams.newPayPwd
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            if (resp.data.code == 'E00310') {
              this.$Message.error("旧密码错误，请重新输入!");
            } else {
              this.$Message.error(resp.data.msg);
              this.modal.uploadPayPwd = false;
            }
          } else {
            this.$Message.success('操作成功!');
            this.modal.uploadPayPwd = false;
            this.updatePayPwdParams={};
            //this.getUserInfoByTokenId();
          }
        });
      },
      //修改登录密码
      submitUpdateLoginPwd() {
        if (this.updateLoginPwdParams.oldLoginPwd == this.updateLoginPwdParams.newLoginPwd) {
          this.$Message.error("两次密码一致，请重新输入!");
          return;
        }

        if(!this.$fun.checkPwd(this.updateLoginPwdParams.newLoginPwd)){
          this.$Message.error("密码必须是6-12位，且包含数字和字母");
          return ;
        }
        this.$Http.post("/userinfo/updateLoginPwd", {
          id: this.userInfo.id,
          oldLoginPwd: this.updateLoginPwdParams.oldLoginPwd,
          newLoginPwd: this.updateLoginPwdParams.newLoginPwd
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            if (resp.data.code == 'E00310') {
              this.$Message.error("旧密码错误，请重新输入!");
            } else {
              this.$Message.error(resp.data.msg);
              this.modal.uploadPayPwd = false;
            }
          } else {
            this.$Message.success('操作成功!');
            this.modal.loginPwd = false;
            //this.getUserInfoByTokenId();
            this.updateLoginPwdParams={};
          }
        });
      },
      //找回资金密码
      findPayPwd :function(){
        let code = null;
        if (this.findPayPwdParams.payPwd1!= this.findPayPwdParams.payPwd2) {
          this.$Message.error("两次密码不一致，请重新输入!");
          return;
        }
        if(!this.$fun.checkPwd(this.findPayPwdParams.payPwd1)){
          this.$Message.error("密码必须是6-12位，且包含数字和字母");
          return ;
        }
        this.$Http.post("/userinfo/findPayPwd", {
          phone: this.findPayPwdParams.phone,
          email: this.findPayPwdParams.email,
          newPayPwd: this.findPayPwdParams.payPwd1,
          code:this.findPayPwdParams.code
        }).then(resp => {
          if (resp.data.code != 'SUCCESS') {
            this.$Message.error(resp.data.msg);
          } else {
            this.$Message.success(resp.data.msg);
            this.modal.retrievePayPwd = false;
          }
          this.cleanTimer();
        });
      },

      cleanUpdataForFindPayPwd:function(){
        this.findPayPwdParams={

        };
        this.cleanTimer();
      },
      cleanTimer:function () {
        this.emailBut='获取验证码';
        clearInterval(this.emailTimer);
        this.emailTimer = null;
        this.phoneBut='获取验证码';
        clearInterval(this.phoneTimer);
        this.phoneTimer = null;
      },
      fun:function (e) {
        if(this.modal.sjyz){
          e.target.style.backgroundColor =  '#3385ff';
        }
        if(!this.modal.yxyz){
          e.target.style.backgroundColor = '#e7e7e7';
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/user.css";
  .redBg{
    background: #2db7f5;
  }
</style>
