<template>

    <!--个人中心-->
    <div class="son-container">

      <navigation :index="3">

      </navigation>
      <div class="personal-wrapper">
        <h4 class="personal-tit">我的专属邀请码</h4>
        <div class="invite-list">
          <div class="invite-item">
            <img src="./../../assets/img/icon-invite1.png" class="invite-icon">
            <span class="invite-tit">专属邀请码</span>
            <span class="invite-info" id="invite_code">{{userInfo.invit}}</span>
            <a href="javascript:void(0);" class="invite-btn"
               v-clipboard:copy="userInfo.invit"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError" >复制邀请码</a>
            <div class="clearfix"></div>
          </div>
          <div class="invite-item">
            <img src="./../../assets/img/icon-invite1.png" class="invite-icon">
            <span class="invite-tit">专属邀请链接</span>
            <span class="invite-info" id="invite_link">{{this.$store.state.invitUrl}}{{userInfo.invit}}</span>
            <a href="javascript:void(0);" class="invite-btn"
               v-clipboard:copy="this.$store.state.invitUrl+userInfo.invit"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError" >复制链接分享</a>
            <div class="clearfix"></div>
          </div>
          <div class="invite-item">
            <img src="./../../assets/img/icon-invite2.png" class="invite-icon">
            <span class="invite-tit">邀请总人数</span>
            <span class="invite-info bg-none col-3 f-w-b">{{count}}</span>
            <span class="invite-unit">（位）</span>
            <div class="clearfix"></div>
          </div>
        </div>

        <!--邀请记录-->
        <div>
          <h4 class="personal-tit" style="margin-bottom: 2px;">邀请记录</h4>
          <div class="invite-tab bg-f1">
            <div class="invite-tab-top">
              <span class="invite-tab-option">被邀请人昵称</span>
              <span class="invite-tab-option">时间</span>
              <span class="invite-tab-option">状态</span>
              <div class="clearfix"></div>
            </div>
            <div class="hd">
              <ul>
                <li v-for="item in level" @click="level_change(item.id)" :class="{on:item.id == levelMap.active}">{{item.name}}</li>
                <div class="clearfix"></div>
              </ul>
            </div>
            <div class="bd">
              <!--一级-->
              <div class="invite-tab-main home-scroll" v-show="levelMap.active == levelMap.first" >
                <div  v-for="items in invitHisList" class="invite-tab-row">
                  <span class="invite-tab-option">{{items.nickName}}</span>
                  <span class="invite-tab-option">{{items.createTime}}</span>
                  <span class="invite-tab-option">生效中</span>
                  <div class="clearfix"></div>
                </div>
              </div>
              <!--二级-->
              <div class="invite-tab-main home-scroll" v-show="levelMap.active == levelMap.second"  >
                <div  v-for="items in invitHisList"  class="invite-tab-row">
                  <span class="invite-tab-option">{{items.nickName}}</span>
                  <span class="invite-tab-option">{{items.createTime}}</span>
                  <span class="invite-tab-option">生效中</span>
                  <div class="clearfix"></div>
                </div>
              </div>
              <!--三级-->
              <div  class="invite-tab-main home-scroll" v-show="levelMap.active == levelMap.third" >
                <div  v-for="items in invitHisList" class="invite-tab-row">
                  <span class="invite-tab-option">{{items.nickName}}</span>
                  <span class="invite-tab-option">{{items.createTime}}</span>
                  <span class="invite-tab-option">生效中<!--{{items.status==1?'生效中':'无效'}}--></span>
                  <div class="clearfix"></div>
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
  import util from './../../tool/util'


  import Navigation from "../comm/Navigation";

    export default {
        name: "MyInvite",
      components: {"navigation":Navigation

      },
      data:function(){
          return{
            userInfo:{
              id:null,
              nickName:null,
              phone:null,
              email:null,
              loginPwd:null,
              payPwd:null,
              invit:null,
            },
            count:null,
            invitHisList:null,
            level:[
              {
                name:"一级",
                id:1
              },
              {
                name:"二级",
                id:2
              },
              {
                name:"三级",
                id:3
              }
            ],
            levelMap:{
              first:1,
              second:2,
              third:3,
              active:1
            },

          }
        },
        mounted(){
            this.initSecurity();
         // var clipboard = new Clipboard('.invite-btn');
        },
        methods:{
          level_change(id){
            this.levelMap.active = id;
            this.queryInvitationRecord();
          },
          initSecurity() {
            this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.userInfo = resp.data.result;
                this.queryInvitCount();
                this.queryInvitationRecord();
              }else{
                this.$Message.error(resp.data.mgs);
              }
            });
          },

          queryInvitCount(){
            this.$Http.post('/invitationRecord/queryInvitCount', {userId: this.userInfo.id}).then(resp => {
              if(resp.data.code=='SUCCESS'){

                this.count = resp.data.result;
              }else{
                this.$Message.error(resp.data.mgs);
              }
            });
          },
          queryInvitationRecord(){
            this.$Http.post('/invitationRecord/queryInvitationRecord', {userId:this.userInfo.id,grade:this.levelMap.active}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.invitHisList = resp.data.result;
              }else{
                this.$Message.error(resp.data.mgs);
              }
            });

          },
          //复制功能
          onCopy:function () {
            this.$Message.success("复制成功");
          },
          onError:function () {
            this.$Message.error("复制失败");
          },

        }
    }
</script>


<style scoped>
  @import "../../assets/css/user.css";
  @import "../../assets/css/checkbox.css";

</style>
