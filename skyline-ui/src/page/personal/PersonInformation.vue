<template>
  <!--个人信息-->
  <div class="user-info">
    <div class="user-info-item">
      <img src="../../assets/img/icon-id.png" class="user-info-icon">
      <span>我的ID</span>
      <input type="text" v-model="userInfo.id" readonly="readonly">
      <div class="clearfix"></div>
    </div>
    <div class="user-info-line"></div>
    <div class="user-info-item">
      <img src="../../assets/img/icon-tab.png" class="user-info-icon">
      <span>昵称</span>
      <input type="text" v-model="userInfo.nickName">
      <a href="javascript:void(0);" @click="updateNickName()">保存</a>
      <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import util from './../../tool/util'
    export default {
        name: "PersonInformation",
      data :function(){
          return {
           userInfo:{
             id:null,
             nickName:null,
             phone:null,
             email:null,
             loginPwd:null,
             payPwd:null,
           },
          }
      },
      mounted(){
        this.initPersonalInfotmation();
      },
      methods:{
        initPersonalInfotmation:function() {
          this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
            this.userInfo = resp.data.result;
          });
        },
        updateNickName:function () {
          this.$Http.post('/userinfo/updateNickName', {nickName: this.userInfo.nickName}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.$Message.success(resp.data.msg);
              this.initPersonalInfotmation();
            }else{
              this.$Message.error(resp.data.msg);
            }
          });
        }
      }


    }
</script>

<style scoped>
  @import "../../assets/css/user.css";

  .user-info-item {
    padding: 13px 0;
    background: #fcfdfd;
    font-size: 16px;
    width: 49.5%;
    height: 50px;
    line-height: 24px;
    float: left;
    position: relative;
  }
</style>
