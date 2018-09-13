<template>
  <div class="son-container">
    <div class="rate-wrap">
      <div class="rate-head">
        费率标准<label class="ft-12">（交易手续费）</label>
      </div>
      <div class="rate-tab">
        <div class="rate-tab-top">
          <span class="rate-option">交易对</span>
          <span class="rate-option">挂单</span>
          <span class="rate-option">吃单</span>
          <div class="clearfix"></div>
        </div>
        <div class="rate-tab-main home-scroll">
          <div class="rate-tab-row" v-for="item in list">
            <div class="rate-option">
              <span class="rate-type">{{item.marketName}}</span>
            </div>
            <span class="rate-option">{{item.buyFee}}</span>
            <span class="rate-option">{{item.sellFee}}</span>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="rate-tips m-t-30">
        <div>提示</div>
        <div>1.交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</div>
        <div>1.交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</div>
        <div>1.交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</div>
        <div>1.交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Rate",
        data(){
          return{
            list:[],
          }
        },
        methods:{
          getRate(){
            this.$Http.post('/trade/getTradeCoinRate',{pageNum:1,pageSize:10000}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.list=resp.data.result.list;
              }
            });
          }
        },
        mounted(){
          this.getRate();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";
</style>
