<template>
  <div class="model-order">
    <div class="hd">
      <ul>
        <li :class="{on:i==0}" @click="i=0">当前委托</li>
        <li  :class="{on:i==1}" @click="i=1">历史委托</li>
        <div class="clearfix"></div>
      </ul>
    </div>
    <div class="bd m-t-10">
      <!--当前委托-->
      <div>
        <div class="model-order-top" v-if="i==0">
          <span class="order-option-1">时间</span>
          <span class="order-option-1">交易对</span>
          <span class="order-option-1">方向</span>
          <span class="order-option-1">价格<label>({{precoinName}})</label></span>
          <span class="order-option-1">数量<label>({{sufcoinName}})</label></span>
          <span class="order-option-1">委托总额<label>({{precoinName}})</label></span>
          <span class="order-option-1">已成交<label>({{sufcoinName}})</label></span>
          <span class="order-option-1">未成交<label>({{sufcoinName}})</label></span>
          <span class="order-option-1">操作</span>
          <div class="clearfix"></div>
        </div>
        <div class="model-order-top" v-if="i==1">
          <span class="order-option-2">时间</span>
          <span class="order-option-2">交易对</span>
          <span class="order-option-2">方向</span>
          <span class="order-option-2">价格<label>({{precoinName}})</label></span>
          <span class="order-option-2">数量<label>({{sufcoinName}})</label></span>
          <span class="order-option-2">已成交<label>({{sufcoinName}})</label></span>
          <span class="order-option-2">成交均价<label>({{precoinName}})</label></span>
          <span class="order-option-2">状态</span>
          <div class="clearfix"></div>
        </div>

        <div class="model-order-main">
          <!--显示最新五条数据-->
          <template v-if="!isLogin">
            <!--非登录状态显示此提示-->
            <div class="order-no" style="display: flex;">
              <router-link :to="{path:'/login'}">登录后查看</router-link>
            </div>
          </template>

          <template v-else-if="(list.length!=0) && (i==0)">

            <div class="model-order-row" v-for="item in list">
              <span class="order-option-1">{{item.createTime}}</span>
              <span class="order-option-1">{{item.marketName}}</span>
              <span class="order-option-1"><label class="col-2">{{item.type==0 ?'买入':'卖出'}}</label></span>
              <span class="order-option-1">{{item.price}}</span>
              <span class="order-option-1">{{item.number}}</span>
              <span class="order-option-1">{{item.totalNum}}</span>
              <span class="order-option-1">{{item.dealNum!=null ? item.dealNum : 0}}</span>
              <span class="order-option-1">{{item.totalNum-item.dealNum}}</span>
              <span class="order-option-1">
											<a href="javascript:void(0);" class="model-order-operate" @click="cancelTrade(item.id)">撤单</a>
              </span>
              <div class="clearfix"></div>
            </div>
          </template>
          <template v-else-if="(list.length!=0) && (i==1)">
            <div class="model-order-row" v-for="item in list">
              <span class="order-option-2">{{item.createTime}}</span>
              <span class="order-option-2">{{item.marketName}}</span>
              <span class="order-option-2"><label class="col-2">{{item.type==0 ?'买入':'卖出'}}</label></span>
              <span class="order-option-2">{{item.price}}</span>
              <span class="order-option-2">{{item.totalNum}}</span>
              <span class="order-option-2">{{item.dealNum!=null ? item.dealNum : 0}}</span>
              <span class="order-option-2">{{item.avgPrice}}</span>
              <span class="order-option-2">
                 <template v-if="item.status==0 ">
                    委托中
                  </template>
                   <template v-if="item.status==1">
                    处理中
                  </template>
                  <template v-else-if="item.status==2">
                    已完成
                  </template>
                   <template v-else-if="item.status==3">
                    已撤销
                  </template>

              </span>
              <div class="clearfix"></div>
            </div>
          </template>
        </div>
      </div>

    </div>
    <router-link :to="{path:'/myOrderList'}" class="moderl-order-more"> 查看更多</router-link>
  </div>
</template>

<script>
    export default {
        name: "OrderDetails",
        data(){
          return{
              i:0,
              isLogin:true,
              list:[],
              precoinName:this.$route.query.precoinName,
              sufcoinName:this.$route.query.sufcoinName,
              timer:null,
              params:{
                marketId:this.$route.query.id,
                isCurrent:1,
                status:null,
                precoinId:null,
                sufcoinId:null,
                type:null,
                startTime:null,
                endTime:null,
                pageNum:1,
                pageSize:5,

              }
          }
        },
        watch:{
          i(val){
            if(val==0){
              this.getUserTradeEntrust();
            }else{
              this.getUserTradeEntrustHistory();
            }
          }
        },
        methods:{
          cancelTrade(id){
            this.$Http.post('/trade/cancel',{id:id}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('撤单成功');
                this.getUserTradeEntrust();
              }
            });
          },
          getUserTradeEntrust(){
            this.params.isCurrent=1;
            this.list=[];
            clearInterval(this.timer);
            this.$Http.post('/trade/getUserTradeEntrust',this.params,false).then(resp=>{
              if(resp.data.code==402 || resp.data.code==403 ){
                this.isLogin=false;
              }else{
                this.list=resp.data.result.list;
              }
            });
            this.timer=setInterval(() => {
              this.$Http.post('/trade/getUserTradeEntrust',this.params,false).then(resp=>{
                if(resp.data.code==402 || resp.data.code==403 ){
                  this.isLogin=false;
                }else{
                  this.list=resp.data.result.list;
                }
              });
            },2000);
          },
          getUserTradeEntrustHistory(){
            this.params.isCurrent=2;
            this.list=[];
            clearInterval(this.timer);
            this.$Http.post('/trade/getUserTradeEntrust',this.params,false).then(resp=>{
              if(resp.data.code==402 || resp.data.code==403 ){
                this.isLogin=false;
              }else{
                this.list=resp.data.result.list;
              }
            });
            this.timer=setInterval(() => {
              this.$Http.post('/trade/getUserTradeEntrust',this.params,false).then(resp=>{
                if(resp.data.code==402 || resp.data.code==403 ){
                  this.isLogin=false;
                }else{
                  this.list=resp.data.result.list;
                }
              });
            },2000);
          }
        },
        mounted(){
          this.getUserTradeEntrust();
        },
        destroyed(){
          clearInterval(this.timer);
        }

    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";
</style>
