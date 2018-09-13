<template>
  <div class="login-tab">
    <div class="login-tab-top">
      <span class="login-tab-option">时间</span>
      <span class="login-tab-option">登录方式</span>
      <span class="login-tab-option">IP</span>
      <span class="login-tab-option">状态</span>
      <div class="clearfix"></div>
    </div>
    <div class="login-tab-main home-scroll">
      <div class="login-tab-row" v-for="item in LoginHistotyList">
        <span class="login-tab-option">{{item.loginTime}}</span>
        <span class="login-tab-option">{{item.loginWay==0?'PC端':'手机或其他'}}</span>
        <span class="login-tab-option">{{item.ip}}</span>
        <span class="login-tab-option">{{item.status==0?'正常':'异常'}}</span>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from './../../tool/util'
    export default {
        name: "UserLoginHistory",
      data :function(){
        return {
          userInfo:{
            id:null,
            nickName:null,
            phone:null,
            email:null,
            loginPwd:null,
            payPwd:null,
            invit:null,
          },
          LoginHistotyList:[],
        }
      },
      mounted(){
        this.initPersonalInfotmation();
      },
      methods:{
        initPersonalInfotmation() {
          this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
            this.userInfo = resp.data.result;
            this.showLoginHistory();
          });
        },
        showLoginHistory(){
          this.$Http.post('/userLoginHistory/queryLoginHistory', {userId: this.userInfo.id}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.LoginHistotyList = resp.data.result;
            } else {
              this.$Message.error(resp.data.msg);
            }
          });
        },
      }
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";

</style>
