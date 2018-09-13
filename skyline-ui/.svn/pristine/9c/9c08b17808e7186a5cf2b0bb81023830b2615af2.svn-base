<template>
  <div class="personal-nav">
    <h4 class="personal-tit">个人中心</h4>
    <ul class="personal-nav-list">

      <li :class="{active:index==0}">
        <router-link :to="{path: '/myProperty'}">我的资产</router-link>
      </li>
      <li :class="{active:index==1}">
         <router-link :to="{path: '/accountSecurity'}">账户安全</router-link>
      </li>
      <li :class="{active:index==2}">
        <router-link :to="{path: '/userCertified'}">身份认证</router-link>
      </li>
      <li :class="{active:index==3}">
        <router-link :to="{path: '/myInvite'}">我的邀请码</router-link>
      </li>
      <li :class="{active:index==4}">
        <router-link :to="{path: '/businessApplication'}">商家申请</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Navigation",

        props: ['index']
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>
