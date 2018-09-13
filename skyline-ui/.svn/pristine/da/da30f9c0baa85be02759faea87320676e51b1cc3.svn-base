<template>
  <div class="son-container">
    <div class="coin-all-wrap">
      <div class="coin-all-block f-l">
        <h3>买盘</h3>
        <div class="coin-all-tab bg-f1">
          <div class="coin-all-tab-top">
            <span class="coin-all-option"></span>
            <span class="coin-all-option">买入价({{precoinName}})</span>
            <span class="coin-all-option">买入量({{sufcoinName}})</span>
            <span class="coin-all-option">累计({{sufcoinName}})</span>
            <div class="clearfix"></div>
          </div>
          <div class="coin-all-tab-main home-scroll">
            <!--各一百条数据-->
            <div class="coin-all-row" v-for="(item,index) in buyList">
              <span class="coin-all-option col-1">买{{index+1}}</span>
              <span class="coin-all-option">{{item.price}}</span>
              <span class="coin-all-option">{{item.dealNum}}</span>
              <span class="coin-all-option">{{item.totalNum}}</span>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="coin-all-block f-r">
        <h3>卖盘</h3>
        <div class="coin-all-tab bg-f1">
          <div class="coin-all-tab-top">
            <span class="coin-all-option"></span>
            <span class="coin-all-option">卖出价({{precoinName}})</span>
            <span class="coin-all-option">卖出量({{sufcoinName}})</span>
            <span class="coin-all-option">累计({{sufcoinName}})</span>
            <div class="clearfix"></div>
          </div>
          <div class="coin-all-tab-main home-scroll">
            <!--各一百条数据-->
            <div class="coin-all-row" v-for="(item,index) in sellList">
              <span class="coin-all-option col-2">卖{{index+1}}</span>
              <span class="coin-all-option">{{item.price}}</span>
              <span class="coin-all-option">{{item.dealNum}}</span>
              <span class="coin-all-option">{{item.totalNum}}</span>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BuySellDetails",
        data(){
          return{
            buyList:[],
            sellList:[],
            precoinName:this.$route.query.precoinName,
            sufcoinName:this.$route.query.sufcoinName,
          }
        },
        methods:{
          getBuy(){
            this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:0,pageNum:1,pageSize:100}).then(resp=>{
              this.buyList=resp.data.result.list;
            });
          },
          getSell(){
            this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:1,pageNum:1,pageSize:100}).then(resp=>{
              this.sellList=resp.data.result.list;
            });
          },
        },
        mounted(){
          this.getBuy();
          this.getSell();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";
</style>
