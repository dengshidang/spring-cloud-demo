<template>
  <div class="article-wrapper">
    <div class="article-bg">
      <p>实时新闻发布</p>
      <p>REAL-TIME NEWS RELEASE</p>
    </div>
    <div class="son-container m-t-30">
        <news-navigation></news-navigation>
      <div class="article-wrap-r">
        <template v-if="this.$route.query.type==0">
          <div class="article-wrap-tit">行业新闻</div>
        </template>
        <template v-if="this.$route.query.type==1">
          <div class="article-wrap-tit">公告</div>
        </template>
        <template v-if="this.$route.query.type==2">
          <div class="article-wrap-tit on">新手指南</div>
        </template>

        <div class="article-list">
          <!--搜索-->
          <div class="article-search">
            <input v-model="content" v-on:keyup.13="initNewinfo"  type="text" placeholder="搜索关键词">
            <a href="javascript:void(0);" @click="initNewinfo" class="search-btn"></a>
            <div class="clearfix"></div>
          </div>
          <!--文章列表-->
          <div class="article-list-top">
            <span class="article-option">序号</span>
            <span class="article-option">标题</span>
            <span class="article-option">时间</span>
            <span class="article-option">操作</span>
            <div class="clearfix"></div>
          </div>
          <div class="article-list-main home-scroll">
          <template v-for="(item,index) in newsInfo">
              <div class="article-row">
                <span class="article-option">{{(index+1)* pageNum}}</span>
                <span class="article-option">{{item.title}}</span>
                <span class="article-option">{{item.createTime}}</span>
                <span class="article-option">
                     <router-link :to="{path:'/notice',query:{id:item.id}}">查看</router-link>
                </span>
                <div class="clearfix"></div>
              </div>
          </template>
        </div>
          <div style="margin: 10px;height: 45px" >
            <page  style="float: right" :total="total"  :current="pageNum" :page-size="pageSize" @on-change="setPageNum" />
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  import {Page} from 'iview';
  import newsNavigation from "../help/NewsNavigation";
    export default {
        name: "Help",
      components:{page:Page,
        'news-navigation':newsNavigation,
      },

        data:function(){
          return{
            newsInfo:[],
            pageNum:1,
            pageSize:3,
            total:0,
            content: null,
          }
        },
      watch:{
        '$route.query.type'(){
          this.content =null;
          //alert(this.content)
          this.initNewinfo();

        }
      },
      mounted:function(){
          this.initNewinfo();
      },
      methods:{
          initNewinfo:function(){
            this.$Http.post('/additional/queryNewsCarousel', {content:this.content,type:this.$route.query.type,pageSize:this.pageSize,pageNum:this.pageNum}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.newsInfo = resp.data.result.list;
                this.total=resp.data.result.total;
              }else{
                this.$Message.error(resp.data.msg);
              }
            });
          },
        setPageNum(val){
          this.pageNum=val;
          this.initNewinfo();
        },
      }



    }
</script>

<style scoped>

</style>
