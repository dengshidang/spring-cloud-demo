<template>
  <!--币币交易-->
  <div class="trade-wrap">
    <div class="trade-sidebar">
      <!--左边市场-->
      <TransactionPair></TransactionPair>
      <!--市场公告-->
      <CCNews></CCNews>
    </div>
    <div class="trade-cont">
      <!--分时图-->
      <div class="model-chart bg-f1">
        <div class="chart-head">
          <template v-if="item!=null">
          <img :src="$Base.uploadUrl + item.coinLog" class="icon-coin">
                <span class="ft-16">
                 {{item.sufcoinName}}
                </span>
                <span>对</span>
                <span class="ft-16">{{item.precoinName}}</span>
                <span>≈ {{item.cny!=null?item.cny:0}} CNY</span>
                <span>涨幅 {{item.gains!=null?item.gains:0}}%</span>
                <span>高 {{item.high!=null?item.high:0}}</span>
                <span>低 {{item.low!=null?item.low:0}}</span>
                <span>24H量 {{item.tradeTotal!=null?item.tradeTotal:0}} {{item.sufcoinName}}</span>
                <div class="clearfix"></div>
          </template>
        </div>
        <div class="chart-tab">
           <k-line></k-line>
        </div>
      </div>
      <!--买卖盘-->
      <BuySell></BuySell>
      <!--委托记录-->
      <OrderDetails></OrderDetails>

      <!--成交数据-->
      <TransactionData></TransactionData>


    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
    import TransactionPair from './TransactionPair'
    import  OrderDetails from './OrderDetails'
    import  BuySell from './BuySell'
    import  TransactionData from './TransactionData'
    import  KLine from './KLine'
    import  CCNews from './CCNews'
    export default {
        name: "CoinCoin",
        components:{TransactionPair,OrderDetails,BuySell,TransactionData,KLine,CCNews},
        data(){
          return{
            marketId:this.$route.query.id,
            buyCoinmarketpriceTimer:null,
            sellCoinmarketpriceTimer:null,
            timer:null,
            item:null,
          }
        },

        methods:{
          getBuyCoinmarketprice(){
            clearInterval(this.buyCoinmarketpriceTimer);
              this.buyCoinmarketpriceTimer=setInterval(()=>{
              if(this.item!=null){
                this.$Http.get('/coinmarketprice/getCoinmarketprice',{coinId:this.item.precoinId,coinName:null}).then(resp=>{
                  if(resp.data.code=="SUCCESS") {
                    this.$store.commit('setBuyCoinmarketprice',this.buyCoinmarketprice);
                  }
                });
              }
            },1000);
          },
          getSellCoinmarketprice(){
            clearInterval(this.sellCoinmarketpriceTimer);
            this.sellCoinmarketpriceTimer=setInterval(()=>{
              if(this.item!=null) {
                this.$Http.get('/coinmarketprice/getCoinmarketprice', {
                  coinId: this.item.sufcoinId,
                  coinName: null
                }).then(resp => {
                  if (resp.data.code == "SUCCESS") {
                    this.$store.commit('setSellCoinmarketprice', this.sellCoinmarketprice);
                  }
                });
              }
            },1000);
          },
          getCurrentMarket(){
            clearInterval(this.timer);
            this.$Http.post('/trade/getCurrentMarket',{marketId:this.marketId}).then(resp=>{
              if(resp.data.code=='SUCCESS'){
                this.item=resp.data.result;
                this.$store.commit("setMarket",this.item);
              }
            });
            this.timer=setInterval(() => {
              this.$Http.post('/trade/getCurrentMarket',{marketId:this.marketId}).then(resp=>{
                if(resp.data.code=='SUCCESS'){
                  this.item=resp.data.result;
                  this.$store.commit("setMarket",this.item);
                }
              });
            }, 1000);
          }
        },
        mounted(){
          this.getBuyCoinmarketprice();
          this.getSellCoinmarketprice();
          this.getCurrentMarket();
        },
        destroyed(){
          clearInterval(this.buyCoinmarketpriceTimer);
          clearInterval(this.sellCoinmarketpriceTimer);
          clearInterval(this.timer);
        }
    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";

</style>
