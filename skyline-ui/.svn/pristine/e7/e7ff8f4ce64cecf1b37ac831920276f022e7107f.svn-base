<template>
  <!--左边市场-->
  <div class="model-market">
    <div class="hd">
      <ul>
        <li v-for="item in precoindList" :class="{on:precoinId==item.precoinId }" @click="precoinId=item.precoinId;type=1;dec=0;getMarket()">{{item.precoinName}}</li>
        <li :class="{on:precoinId==-1}" @click="precoinId=-1;type=1;dec=0;getOptinal()">自选</li>
        <div class="clearfix"></div>
      </ul>
    </div>
    <div class="bd">
      <!--USDT-->
      <div>
        <!--搜索-->
        <div class="market-search">
          <input type="text" placeholder="搜索..." v-model="keyword">
          <a href="javascript:void(0);" @click="getMarket" ></a>
          <div class="clearfix"></div>
        </div>
        <!--市场币种列表-->
        <div class="market-list">
          <div class="market-list-top">
            	        <span>
											<i class="sortName">币种</i>
											<i class="sort"  :class="{asc:type==1 && dec==0,desc:type==1 && dec==1}" @click="setDec(1)"><!--升序使用样式名：asc，降序使用样式名：desc-->
												<i class="fa fa-caret-up icon-asc"></i>
												<i class="fa fa-caret-down icon-desc"></i>
											</i>
										</span>
                  <span>
											最新价
											<i class="sort " :class="{asc:type==2 && dec==0,desc:type==2 && dec==1}" @click="setDec(2)"><!--升序使用样式名：asc，降序使用样式名：desc-->
												<i class="fa fa-caret-up icon-asc"></i>
												<i class="fa fa-caret-down icon-desc"></i>
											</i>
										</span>
                      <span>
                        日涨幅
                        <i class="sort " :class="{asc:type==3 && dec==0,desc:type==3 && dec==1}" @click="setDec(3)"><!--升序使用样式名：asc，降序使用样式名：desc-->
                          <i class="fa fa-caret-up icon-asc"></i>
                          <i class="fa fa-caret-down icon-desc"></i>
                        </i>
                      </span>
            <div class="clearfix"></div>
          </div>
          <div class="market-list-main home-scroll">
            <template v-if="list.length!=0">
              <div class="market-row" :class="{on:item.marketId==marketId}" v-for="item in list" @click="toCC(item)">
                  <a class="market-star"   @click.stop="cancel(item.marketId)" v-if="item.isCollection==1"><i class="fa fa-star"></i></a>
                  <a class="market-star"   @click.stop="add(item.marketId)" v-else><i class="fa fa-star-o"></i></a>
                  <span class="market-text" v-if="precoinId!=-1"><label>{{item.sufcoinName}}</label></span>
                  <span class="market-text" v-if="precoinId==-1"><label>{{item.sufcoinName}}/{{item.precoinName}}</label></span>
                  <span class="market-text t-r">{{item.newPrice==null?0:item.newPrice|fixed8}}</span>
                  <span class="market-text t-r col-2">{{item.gains==null?0:item.gains|fixed2}}%</span>

                <div class="clearfix"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'iview'
    export default {
        name: "TransactionPair",
        components:{Icon},
        data(){
          return{
            list:[],
            precoindList:[],
            optinalList:[],
            keyword:null,
            type:1,
            dec:0,
            marketId:this.$route.query.id,
            precoinId:this.$route.query.precoinId,
            item:{},
            timer:null,
          }
        },
        watch:{
          list(){
            if(this.optinalList.length!=0){
              for (let j=0;j<this.list.length;j++){
                for (let t=0;t<this.optinalList.length;t++){
                  if(this.optinalList[t].marketId==this.list[j].marketId){
                    this.list[j].isCollection=1;
                  }
                }
              }
            }
          }
        },
        methods:{
          toCC(item){
            this.$router.push({path:'/coinCoin',query:{id:item.marketId,precoinId:item.precoinId,precoinName:item.precoinName,sufcoinName:item.sufcoinName}});
            location.reload();
          },
          getPrecoind(){
            this.$Http.get('/trade/getPrecoind').then(resp=>{
              this.precoindList=resp.data.result;
              this.getMarket();
            });
          },
          setDec(val){
            if(this.type==val){
              this.dec=this.dec==0?1:0;
            }else{
              this.type=val;
              this.dec=0;
            }
            this.getMarket();
          },
          getMarket(){
            clearInterval(this.timer);
            this.$Http.post('/trade/getMarket',{precoinId:this.precoinId,type:this.type,dec:this.dec,keyword:this.keyword}).then(resp=>{
              if(resp.data.code == 'SUCCESS'){
                this.list=resp.data.result;
              }else{
                this.list=[];
              }
            });
            this.timer=setInterval(() => {
                this.$Http.post('/trade/getMarket',{precoinId:this.precoinId,type:this.type,dec:this.dec,keyword:this.keyword}).then(resp=>{
                  if(resp.data.code == 'SUCCESS'){
                    this.list=resp.data.result;
                  }else{
                    this.list=[];
                  }
                });
            }, 1000);
          },
          getOptinal(){
            clearInterval(this.timer);
              this.$Http.post('/trade/getOptinal',{type:this.type,dec:this.dec,keyword:this.keyword},false).then(resp=>{
                if(resp.data.code == 'SUCCESS'){
                  this.list=resp.data.result;
                }else{
                  this.list=[];
                }
              });
            this.timer=setInterval(() => {
              this.$Http.post('/trade/getOptinal',{type:this.type,dec:this.dec,keyword:this.keyword},false).then(resp=>{
                if(resp.data.code == 'SUCCESS'){
                  this.list=resp.data.result;
                }else{
                  this.list=[];
                }
              });
            }, 1000);
          },
          getOptinalL(){
            this.$Http.post('/trade/getOptinal',{type:this.type,dec:this.dec,keyword:this.keyword},false).then(resp=>{
              if(resp.data.code == 'SUCCESS'){
                this.optinalList=resp.data.result;

              }else{
                this.optinalList=[];
              }
            });
          },
          add(id){
            this.$Http.post('/trade/addOptional',{marketId:id}).then(resp=>{
              if(resp.data.code == 'SUCCESS'){
                this.getOptinalL();
              }else{
               // this.$Message.error(resp.data.msg);
              }
            });
          },
          cancel(id){
            this.$Http.post('/trade/cancelOptional',{marketId:id}).then(resp=>{
              if(resp.data.code == 'SUCCESS'){
                this.getOptinalL();
              }else{
                this.$Message.error(resp.data.msg);
              }
            });
          }
        },
        mounted(){
          this.getPrecoind();
          this.getOptinalL();

        },
        destroyed(){
          clearInterval(this.timer);
        }
    }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";
</style>
