<template>
  <div class="article-wrap-l">
    <div class="article-wrap-tit">帮助中心</div>
    <div class="article-type">
      <ul class="personal-nav-list">
        <li>
          <router-link :to="{path: '/help',query:{type:1}}" :class="{'article-active':(this.$route.query.type==1?true:false)}">公告</router-link>
        </li>
        <li>
          <router-link :to="{path: '/help',query:{type:2}}" :class="{'article-active':(this.$route.query.type==2?true:false)}">新手指南</router-link>
        </li>
        <li>
          <router-link :to="{path: '/help',query:{type:0}}" :class="{'article-active':(this.$route.query.type==0?true:false)}">行业新闻</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewsNavigation"
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>
