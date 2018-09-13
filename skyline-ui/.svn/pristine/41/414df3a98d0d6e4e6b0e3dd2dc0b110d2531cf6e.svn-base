<template>
  <div class="model-plate">
    <!--发起交易表单-->
    <div class="plate-hang">
      <div class="plate-hang-head">
        <span class="f-l">交易</span>

        <router-link class="f-r" :to="{path:'/rate'}">费率标准</router-link>
        <div class="clearfix"></div>
      </div>
      <div class="m-t-10" style="padding: 0 10px;">
        <!--买入-->
        <div class="plate-form f-l">
          <div>
            <span class="d-b f-l">可用 {{buyUserBalance==null?0:buyUserBalance.validNum}} {{precoinName}}</span>
            <router-link :to="{path:'/myProperty'}" class="d-b f-r col-1">充币</router-link>
            <div class="clearfix"></div>
          </div>
          <form class="m-t-10">
            <div style="height:23px;line-height: 20px;text-align:right;" > <label style="color: red;">{{buyPriceCny}}</label> CNY </div>
            <div class="plate-f-row" style="margin-bottom: 0px">
              <span class="plate-f-text">买入价</span>
              <input type="text" class="plate-f-inp" v-model="buyParams.price" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" >
              <span class="plate-f-unit">{{precoinName}}</span>
              <div class="clearfix"></div>
            </div>
            <div style="height:23px;line-height: 23px;color: red;padding-left: 80px " > {{ this.error.buyPrice}} </div>
            <div class="plate-f-row" style="margin-bottom: 0px;">
              <span class="plate-f-text">买入量</span>
              <input type="text" class="plate-f-inp" v-model="buyParams.number" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
              <span class="plate-f-unit">{{sufcoinName}}</span>
              <div class="clearfix"></div>
            </div>
            <div style="height:23px;line-height: 23px;color: red;padding-left: 80px ">{{ this.error.buyNumber}}</div>
            <div class="buy-slide" >
              <input type="hidden" class="single-slider"  value="0"/>
            </div>
            <div class="range-num">
              <span class="range-num-l">
                0<label>{{sufcoinName}}</label>
              </span>
              <span class="range-num-r">
                {{buySum}}<label>{{sufcoinName}}</label>
              </span>
              <div class="clearfix"></div>
            </div>
            <div class="plate-f-foot" style="margin-bottom: 0px; border:none;">
              <span>交易额</span>
              <input type="text" class="plate-f-inp" v-model="buySumPrice" readonly="true" >
              <span class="plate-f-unit">{{precoinName}}</span>
              <div class="clearfix"></div>
            </div>


            <a href="javascript:void(0);" class="plate-f-sub bg-1" @click="setBuy">买入 {{sufcoinName}}</a>
          </form>
        </div>
        <!--卖出-->
        <div class="plate-form f-r" >
          <div>
            <span class="d-b f-l">可用 {{sellUserBalance==null?0:sellUserBalance.validNum}} {{sufcoinName}}</span>

            <router-link :to="{path:'/myProperty'}" class="d-b f-r col-2">充币</router-link>
            <div class="clearfix"></div>
          </div>
          <form class="m-t-10">
            <div style="height:23px;line-height: 20px;text-align:right;" > <label style="color: red;">{{sellPriceCny}}</label> CNY </div>
            <div class="plate-f-row" style="margin-bottom: 0px">
              <span class="plate-f-text">卖出价</span>
              <input type="text" class="plate-f-inp" v-model="sellParams.price"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
              <span class="plate-f-unit">{{precoinName}}</span>
              <div class="clearfix"></div>
            </div>
            <div style="height:23px;line-height: 20px;" >{{ this.error.sellPrice}}  </div>
            <div class="plate-f-row" style="margin-bottom: 0px;">
              <span class="plate-f-text">卖出量</span>
              <input type="text" class="plate-f-inp" v-model="sellParams.number" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" >
              <span class="plate-f-unit">{{sufcoinName}}</span>
              <div class="clearfix"></div>
            </div>
            <div style="height:23px;line-height: 23px;color: red;padding-left: 80px ">{{ this.error.sellNumber}}</div>

            <div class="sell-slide">
              <input type="hidden" class="range-slider" value="0"    />
            </div>
            <div class="range-num">
              <span class="range-num-l">
                0<label>{{sufcoinName}}</label>
              </span>
              <span class="range-num-r">
                {{sellSum}}<label>{{sufcoinName}}</label>
              </span>
              <div class="clearfix"></div>
            </div>
            <div class="plate-f-foot" style="margin-bottom: 0px;border: none;">
              <span>交易额</span>
              <input type="text" class="plate-f-inp" v-model="sellSumPrice" readonly="true">
              <span class="plate-f-unit">{{precoinName}}</span>
              <div class="clearfix"></div>
            </div>
              <a href="javascript:void(0);" class="plate-f-sub bg-2 m-t-30" @click="setSell">卖出 {{sufcoinName}}</a>
          </form>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--盘面数据-->
    <div class="plate-list">
      <div class="plate-list-top">
        最新价 <span class="f-w-b ft-12">{{$store.state.market.newPrice!=null?$store.state.market.newPrice:0}} {{precoinName}} ≈ {{$store.state.market.cny!=null?$store.state.market.cny:0}} CNY</span>
      </div>
      <div class="plate-list-tit m-t-10">
        <span class="plate-option"></span>
        <span class="plate-option">价格<label>({{precoinName}})</label></span>
        <span class="plate-option">数量<label>({{sufcoinName}})</label></span>
        <span class="plate-option">累计<label>({{sufcoinName}})</label></span>
        <div class="clearfix"></div>
      </div>
      <!--卖-->
      <div class="plate-list-block h-145" style="border-bottom: 1px solid #E7E7E7;">
        <template v-if="sellList.length<5">
          <template v-for="t in (5-sellList.length)">
            <div class="plate-list-row" >
              <span class="plate-option col-2"></span>
              <span class="plate-option"></span>
              <span class="plate-option"></span>
              <span class="plate-option"></span>
              <div class="clearfix"></div>
            </div>
          </template>
        </template>
        <template v-for="(item,index) in sellList">
              <div class="plate-list-row"  @click="setBuyPrice(item.price)" >
                <span class="plate-option col-2">卖{{sellList.length-index}}</span>
                <span class="plate-option">{{item.price}}</span>
                <span class="plate-option">{{item.totalNum}}</span>
                <span class="plate-option">{{item.sum}}</span>
                <div class="clearfix"></div>
              </div>
        </template>


      </div>
      <!--买-->
      <div class="plate-list-block h-145">
        <template v-for="(item,index) in buyList">
            <div class="plate-list-row" @click="setSellPrice(item.price)">
              <span class="plate-option col-2">买{{index+1}}</span>
              <span class="plate-option">{{item.price}}</span>
              <span class="plate-option">{{item.totalNum}}</span>
              <span class="plate-option">{{item.sum}}</span>
              <div class="clearfix"></div>
            </div>
        </template>
      </div>
      <!--底部信息-->
      <div class="plate-foot">
        <div class="plate-deep f-l">
          <div class="sel-input w-100">
            <div class="sel-top">
              <span class="sel-active">深度 0.01</span>
              <i class="fa fa-caret-down"></i>
            </div>
            <ul class="sel-list">
              <li>深度0.0001</li>
              <li>深度0.000001</li>
            </ul>
          </div>
        </div>

        <router-link class="plate-more d-b f-r ft-12" :to="{path:'/buySellDetails',query:{id:marketId,precoinName:precoinName,sufcoinName:sufcoinName}}">更多&gt;&gt;</router-link>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import  $ from 'jquery'
  import  '../../assets/js/jquery.range'

    export default {
        name: "BuySell",
        components:{},
        data(){
          return{
            value:1,
            buyList:[],
            sellList:[],
            buyUserBalance:null,
            sellUserBalance:null,
            buyCoinId:null,
            sellCoinId:null,
            buyNumber:0,
            sellNumber:0,
            precoinName:this.$route.query.precoinName,
            sufcoinName:this.$route.query.sufcoinName,
            marketId:this.$route.query.id,
            error:{
              buyPrice:null,
              buyNumber:null,
              sellPrice:null,
              sellNumber:null,
            },
            buyPriceCny:0,
            sellPriceCny:0,
            buySumPrice:null,
            sellSumPrice:null,
            buyParams:{
              number:null,
              marketId:this.$route.query.id,
              price:null,
              type:0,
            },
            sellParams:{
              number:null,
              marketId:this.$route.query.id,
              price:null,
              type:1,
            },
            buyTimer:null,
            sellTimer:null,
            buySum:0,
            sellSum:0,
            buySumShow:true,
            buyUserBalanceTimer:null,
            sellUserBalanceTimer:null,
          }
        },

        watch:{
          'buyParams.price'(val){
            this.buySumShow=false;
            this.error.buyPrice=null;
            if(this.buyUserBalance!=null){
              this.buySum=this.buyUserBalance.validNum/val;
            }else{
              this.buySum=0;
            }
            if(this.buyParams.price==null){
              this.buyPriceCny=0;
            }else{
              let cnyRatio=this.$store.state.sellCoinmarketprice.cnyRatio!=null?this.$store.state.buyCoinmarketprice.cnyRatio:0;
              this.buyPriceCny= this.$fun.accMul(this.buyParams.price,cnyRatio);
            }
            if(this.buyParams.number!=null){
              this.buySumPrice=this.$fun.accMul(this.buyParams.price,this.buyParams.number)
            }
          },
          'buyParams.number'(val){
            this.error.buyNumber=null;
            if(val<=this.buySum) {
              $('.single-slider').jRange('setValue', this.$fun.accMul(this.$fun.accDiv(val,this.buySum),100));
            }else{
              $('.single-slider').jRange('setValue', 100);
            }
            if(this.buyParams.price!=null){
              this.buySumPrice=this.$fun.accMul(this.buyParams.price,this.buyParams.number);
            }
          },
          'sellParams.price'(){
            this.error.sellPrice=null;
            if(this.sellParams.price==null){
              this.sellPriceCny=0;
            }else{
              let cnyRatio=this.$store.state.sellCoinmarketprice.cnyRatio!=null?this.$store.state.sellCoinmarketprice.cnyRatio:0;
              this.sellPriceCny=this.$fun.accMul( this.sellParams.price,cnyRatio);
            }
            if(this.sellParams.number!=null){
              this.sellSumPrice=this.$fun.accMul( this.sellParams.price,this.sellParams.number);
            }
          },
          'sellParams.number'(val){
            this.error.sellNumber=null;
            if(val<=this.sellSum) {
              $('.range-slider').jRange('setValue',this.$fun.accMul(this.$fun.accDiv(val,this.sellSum),100));
            }else {
              $('.range-slider').jRange('setValue', 100);
            }
            if(this.sellParams.price!=null){
              this.sellSumPrice=this.$fun.accMul(this.sellParams.price,this.sellParams.number);
            }
          },
          '$store.state.market'(val){
            this.buyCoinId=val.precoinId;
            this.sellCoinId=val.sufcoinId;
            this.getBuyUserBalance();
            this.getSellUserBalance();
          },
        },
        methods:{
          setBuyPrice(val){
            this.buyParams.price=val;
          },
          setSellPrice(val){
            this.sellParams.price=val;
          },
          getBuy(){
            clearInterval(this.buyTimer);
            this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:0,pageNum:1,pageSize:5}).then(resp=>{
              this.buyList=resp.data.result.list;
            });
             this.buyTimer=setInterval(() => {
              this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:0,pageNum:1,pageSize:5}).then(resp=>{
                this.buyList=resp.data.result.list;
              });
            }, 1000);
          },
          getSell(){
            clearInterval(this.sellTimer);
            this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:1,pageNum:1,pageSize:5}).then(resp=>{
              this.sellList=resp.data.result.list.reverse();
            });
            this.sellTimer=setInterval(() => {
              this.$Http.post('/trade/getNewTradeEntrust',{marketId:this.$route.query.id,type:1,pageNum:1,pageSize:5}).then(resp=>{
                this.sellList=resp.data.result.list.reverse();
              });
            }, 1000);
          },
          setBuy(){
            if(!this.$store.state.isLogin){
              this.$store.commit('updateShowNoLogin',2);
              return false;
            }
            if(this.buyParams.price==null || this.buyParams.price==''){
              this.error.buyPrice='请输入买入价';
              return false;
            }
            if(!this.$fun.isFloat(this.buyParams.price)) {
              this.error.buyPrice='请输入正确的买入价';
              return false;
            }
            if(this.buyParams.number==null || this.buyParams.number==''){
              this.error.buyNumber='请输入买入量';
              return false;
            }
            if(!this.$fun.isFloat(this.buyParams.price)) {
              this.error.buyNumber='请输入正确的买入量';
              return false;
            }
            if(this.buyParams.number>this.buySum){
              this.error.buyNumber='买出量不能高于'+this.buySum;
              return false;
            }
            this.buyParams.type=0;
            this.$Http.post('/trade/addTradeEntrust',this.buyParams).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('委托成功');
                this.buyParams.number=null;
              }
            });
          },
          setSell(){
            if(!this.$store.state.isLogin){
              this.$store.commit('updateShowNoLogin',2);
              return false;
            }
            /*if(this.buyNumber>buyUserBalance.validNum){
              this.error.buyNumber='不能高于'+buyUserBalance.validNum;
              return false;
            }*/
            if(this.sellParams.price==null || this.sellParams.price==''){
              this.error.sellPrice='请输入卖出价';
              return false;
            }
            if(!this.$fun.isFloat(this.sellParams.price)) {
              this.error.sellPrice='请输入正确的卖出价';
              return false;
            }
            if(this.sellParams.number==null || this.sellParams.number==''){
              this.error.sellNumber='请输入卖出量';
              return false;
            }
            if(!this.$fun.isFloat(this.sellParams.number)) {
              this.error.sellNumber='请输入正确的卖出量';
              return false;
            }
            if(this.sellParams.number>this.sellSum){
              this.error.sellNumber='卖出量不能高于'+this.sellSum;
              return false;
            }
            this.sellParams.type=1;
            this.$Http.post('/trade/addTradeEntrust',this.sellParams).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('委托成功');
                this.sellParams.number=null;
              }
            });

          },
          getBuyUserBalance(){
            clearInterval(this.buyUserBalanceTimer);
            this.$Http.get('/userbalance/getUserBalance',{coinId:this.buyCoinId},false).then(resp=>{
              if(resp.data.code=="SUCCESS") {
                this.buyUserBalance = resp.data.result;
              }
            });
            this.buyUserBalanceTimer=setInterval(() => {
                this.$Http.get('/userbalance/getUserBalance',{coinId:this.buyCoinId},false).then(resp=>{
                  if(resp.data.code=="SUCCESS") {
                    this.buyUserBalance = resp.data.result;
                  }
                });
            }, 1000);
          },
          getSellUserBalance(){
            clearInterval(this.sellUserBalanceTimer);
            this.$Http.get('/userbalance/getUserBalance',{coinId:this.sellCoinId},false).then(resp=>{
              if(resp.data.code=="SUCCESS") {
                this.sellUserBalance = resp.data.result;
                this.sellSum = this.sellUserBalance.validNum;
              }
            });
            this.sellUserBalanceTimer=setInterval(() => {
              this.$Http.get('/userbalance/getUserBalance',{coinId:this.sellCoinId},false).then(resp=>{
                if(resp.data.code=="SUCCESS") {
                  this.sellUserBalance = resp.data.result;
                  this.sellSum = this.sellUserBalance.validNum;
                }
              });
            }, 1000);
          },
          getBuyjRange(){
            let  self=this;
            $('.single-slider').jRange({
              from: 0,
              to: 100,
              step: 1,
              scale: [0,25,50,75,100],
              format: '%s',
              showLabels: false,
              showScale: true,
              onstatechange: function(){
                let sum=$('.single-slider').val();
                 if(sum==0||sum=='NaN'){
                   self.buyParams.number=null;
                 }else{
                   self.buyParams.number=sum/100 * self.buySum;
                 }
                /*setTimeout(function(){
                  var sel_w1 = $('.buy-slide .selected-bar').width();
                  var all_w1 = $('.buy-slide .back-bar').width();
                  var per    = sel_w1 / all_w1 * 100;
                  var circle = $('.buy-slide .scale span');
                  for(var i=1; i<4; i++){
                    if(per > 25*i){
                      circle.eq(i).addClass('on');
                    }else{
                      circle.eq(i).removeClass('on');
                    }
                  }
                },500);*/
              }
            });

          },
          getSelljRange(){
            let self=this;
            //卖出限额滑块
            $('.range-slider').jRange({
              from: 0,
              to: 100,
              step: 1,
              scale: [0,25,50,75,100],
              format: '%s',
              showLabels: false,
              showScale: true,
              onstatechange: function(){
                let sum=$('.range-slider').val();
                if(sum==0){
                  self.sellParams.number=null;
                }else{

                  self.sellParams.number=sum/100 * self.sellSum;
                }
                setTimeout(function(){
                  var sel_w2 = $('.sell-slide .selected-bar').width();
                  var all_w2 = $('.sell-slide .back-bar').width();
                  var per    = sel_w2 / all_w2 * 100;

                  var s_cricle  = $('.sell-slide .scale span');
                  for(var i=1; i<4; i++){
                    if(per > 25*i){
                      s_cricle.eq(i).addClass('on');
                    }else{
                      s_cricle.eq(i).removeClass('on');
                    }
                  }
                },500)
              }
            });
          },
        },
        mounted(){
          this.getBuy();
          this.getSell();
          this.getBuyjRange();
          this.getSelljRange();
        },
        destroyed(){
          clearInterval(this.buyTimer);
          clearInterval(this.sellTimer);
          clearInterval(this.buyUserBalanceTimer);
          clearInterval(this.sellUserBalanceTimer);
        }
    }
</script>

<style scoped>

  @import "../../assets/css/coin_trade.css";
  .h-145{
    height: 145px;
  }

</style>
