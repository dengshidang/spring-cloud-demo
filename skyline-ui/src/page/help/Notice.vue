<template>
  <div class="son-container">
    <a href="javascript:history.back(-1);" class="history-btn col-3">&lt;&lt;返回</a>

    <!--文章内容-->
    <div class="article-cont">
      <div class="article-tit">{{item.title}}</div>
      <div class="article-time">{{item.createTime}}</div>
      <div class="article-text">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Notice",
        data(){
          return{
              item:{},
          }
        },
        methods:{
          getItem(){
            this.$Http.get('/additional/getNewsCarousel',{id:this.$route.query.id}).then(resp=>{
              if(resp.data.code=='SUCCESS'){
                this.item=resp.data.result;
              }
            });
          }
        },
        mounted(){
          this.getItem();
        }
    }
</script>

<style scoped>

</style>
