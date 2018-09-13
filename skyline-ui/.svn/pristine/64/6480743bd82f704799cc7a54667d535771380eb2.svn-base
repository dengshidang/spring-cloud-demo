<template>
  <div class="market-news">
    <h4>公告</h4>
    <ul class="market-news-list home-scroll">

      <template v-for="item in newsInfo ">
        <li>
          <router-link :to="{path:'/notice',query:{id:item.id}}" target="_blank">
            <span class="market-news-tit">{{item.title}}</span>
            <span class="market-news-time">{{item.createTime}}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "CCNews",
        data(){
          return{
            newsInfo:null
          }
        },
        methods:{
          initNewinfo(){
            this.$Http.post('/additional/queryNewsCarousel', {content:this.content,type:1,pageSize:5,pageNum:1}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.newsInfo = resp.data.result.list;
              }else{
                this.$Message.error(resp.data.msg);
              }
            });
          },
        },
        mounted(){
          this.initNewinfo();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";
</style>
