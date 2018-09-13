<template>
      <div id="kline_container"></div>
</template>

<script>
  import Kline from 'kline';
  import  $ from 'jquery'
  import  '../../assets/js/jquery.mousewheel'
  import Base from './../../tool/Base'

    export default {
        name: "KLine",
        data(){
          return{
            kline:null,
          }
        },
        methods:{
          getKine() {
            let id=this.$route.query.id;
            if(id==null){id=0;}

            var kline   =null;
            kline=new Kline({
                    element: "#kline_container",
                    width: $('.chart-tab').width() - 30,
                    height: 480,
                    theme: 'light', // light/dark
                    language: 'zh-cn', // zh-cn/en-us/zh-tw
                    ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
                    symbol: id,
                    symbolName: 'dsdf',
                    type: "poll", // poll/socket
                    url: Base.baseUrl+"/trade/klineShow",
                    limit: 1000,
                    intervalTime: 5000,
                    debug: true,
                    showTrade: false,
                  });
                  kline.draw();

            }


        },
        mounted(){
          console.log('11');
          this.getKine();
        },
        activated(){
          console.log('22');
        },
        destroyed(){
          console.log('333');
        }
    }
</script>

<style scoped>
</style>
