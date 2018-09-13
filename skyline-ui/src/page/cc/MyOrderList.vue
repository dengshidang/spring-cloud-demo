<template>
  <div class="son-container" style="margin: 30px auto;">
    <div class="coin-order-wrap">
      <h4>我的币币交易订单</h4>
      <div class="hd">
        <ul>
          <li :class="{on:currView=='0'}" @click="currView=0">当前委托</li>
          <li :class="{on:currView=='1'}" @click="currView=1">历史委托</li>
          <div class="clearfix"></div>
        </ul>
      </div>
      <div class="bd">
        <!--当前委托-->
        <div v-if="currView==0" class="coin-order-tab now-order">
          <!--搜索-->
          <div class="coin-order-search">
            <div class="order-search-inp">
              <Input type="text" class="d-b f-l" style="width: 80px;" placeholder="币种" v-model="coinName" @change="getMarketName()"></Input>
              <span style="font-size: 16px;line-height: 35px;height: 35px;">/</span>

              <Select style="width: 80px;" v-model="precoinName">
                <template v-for=" item in precoindList">
                  <Option    :value="item.precoinName" >{{item.precoinName}}</Option>
                </template>
              </Select>
              <div class="clearfix"></div>
            </div>
            <div class="order-search-sel">
              <div class="w-100">
                <Select  placeholder="类型" v-model="params.type" >
                  <Option value="-1">全部</Option>
                  <Option value="0" >买入</Option>
                  <Option value="1" >卖出</Option>
                </Select>
              </div>
            </div>
            <div class="order-search-sel">
              <div class="w-100">
                <Select  placeholder="状态" v-model="params.status" >
                  <Option value="-1">全部</Option>
                  <Option value="0" >委托中</Option>
                  <Option value="1" >处理中</Option>
                </Select>
              </div>
            </div>
            <div class="order-search-time">
              <DatePicker type="date" placeholder="开始时间" style="width: 100px" v-model="params.startTime"></DatePicker>
              &nbsp;--&nbsp;
              <DatePicker type="date" placeholder="结束时间" style="width: 100px" v-model="params.endTime"></DatePicker>
              <div class="clearfix"></div>
            </div>
            <a href="javascript:void(0);" class="search-btn" @click="getMarketName"></a>
          </div>
          <div class="coin-order-top">
            <span class="coin-order-option">时间</span>
            <span class="coin-order-option">交易类型</span>
            <span class="coin-order-option">交易对</span>
            <span class="coin-order-option">方向</span>
            <span class="coin-order-option">价格</span>
            <span class="coin-order-option">数量</span>
            <span class="coin-order-option">委托总额</span>
            <span class="coin-order-option">已成交</span>
            <span class="coin-order-option">未成交</span>
            <span class="coin-order-option">操作</span>
            <div class="clearfix"></div>
          </div>
          <div class="coin-order-main home-scroll">
            <div class="coin-order-row" v-for="item in list">
              <span class="coin-order-option">{{item.createTime}}</span>
              <span class="coin-order-option">币币交易</span>
              <span class="coin-order-option">{{item.marketName}}</span>
              <span class="coin-order-option"><label class="col-2">{{item.type==0 ?'买入':'卖出'}}</label></span>
              <span class="coin-order-option">{{item.price}}</span>
              <span class="coin-order-option">{{item.totalNum}}</span>
              <span class="coin-order-option">{{item.number}}</span>
              <span class="coin-order-option">{{item.dealNum!=null?item.dealNum:0}}</span>
              <span class="coin-order-option">{{item.totalNum-item.dealNum}}</span>
              <span class="coin-order-option">
										<a href="javascript:void(0);" class="coin-order-operate" @click="cancelTrade(item.id)">撤单</a>
              </span>
              <div class="clearfix"></div>
            </div>
            <div style="margin: 10px;height: 45px;bottom:10px;" >
              <template v-if="this.list!=null && this.list.length!=0">
                <Page  style="float: right" :total="total"  :current="pageNum" :page-size="pageSize" @on-change="setPageNum" />
              </template>
            </div>
          </div>

        </div>

        <!--历史委托-->
        <div v-if="currView==1" class="coin-order-tab history-order">
          <!--搜索-->
          <div class="coin-order-search">
            <div class="order-search-inp">
              <Input type="text" class="d-b f-l" style="width: 80px;" v-model="coinName" placeholder="币种"></Input>
              <span style="font-size: 16px;line-height: 35px;height: 35px;">/</span>
              <Select style="width: 80px;">
                <template v-for=" item in precoindList">
                  <Option  :value="item.precoinName" >{{item.precoinName}}</Option>
                </template>
              </Select>
              <div class="clearfix"></div>
            </div>
            <div class="order-search-sel">
              <div class="w-100">
                <Select  placeholder="类型" v-model="params.type">
                  <Option value="-1">全部</Option>
                  <Option value="0" >买入</Option>
                  <Option value="1" >卖出</Option>
                </Select>
              </div>
            </div>
            <div class="order-search-sel">
              <div class="w-100">
                <Select  placeholder="状态" v-model="params.status" >
                    <Option value="-1">全部</Option>
                    <Option value="2" >已完成</Option>
                    <Option value="3" >已撤销</Option>
                </Select>
              </div>
            </div>
            <div class="order-search-time">
              <DatePicker type="date" placeholder="开始时间" style="width: 100px" v-model="params.startTime"></DatePicker>
              &nbsp;--&nbsp;
              <DatePicker type="date" placeholder="结束时间" style="width: 100px" v-model="params.endTime"></DatePicker>
              <div class="clearfix"></div>
            </div>
            <a href="javascript:void(0);" class="search-btn" @click="getMarketName"></a>
          </div>
          <div class="coin-order-top">
            <span class="coin-order-option">时间</span>
            <span class="coin-order-option">交易对</span>
            <span class="coin-order-option">方向</span>
            <span class="coin-order-option">价格</span>
            <span class="coin-order-option">数量</span>
            <span class="coin-order-option">委托总额</span>
            <span class="coin-order-option">已成交</span>
            <span class="coin-order-option">未成交</span>
            <span class="coin-order-option">状态</span>
            <span class="coin-order-option">操作</span>
            <div class="clearfix"></div>
          </div>
          <div class="coin-order-main home-scroll">
            <div class="order-cont" v-for="(item,index) in list">
              <div class="coin-order-row">
                <span class="coin-order-option">{{item.createTime}}</span>
                <span class="coin-order-option">{{item.marketName}}</span>
                <span class="coin-order-option"><label class="col-2">{{item.type==0 ?'买入':'卖出'}}</label></span>
                <span class="coin-order-option">{{item.price}}</span>
                <span class="coin-order-option">{{item.totalNum}}</span>
                <span class="coin-order-option">{{item.number}}</span>
                <span class="coin-order-option">{{item.dealNum!=null?item.dealNum:0}}</span>
                <span class="coin-order-option">{{item.totalNum-item.dealNum}}</span>
                <span class="coin-order-option">
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
                <span class="coin-order-option">
                  <template v-if="item.dealNum==null ||item.dealNum==0">--</template>
                  <template v-else>
                    	<a href="javascript:void(0);" class="coin-order-more" @click="i=index;getUserTradeDetails(item.id)" >成交明细</a>
                  </template>
                </span>
                <div class="clearfix"></div>
              </div>
              <!--成交明细-->
              <div v-if="item.dealNum>0 && i==index" class="coin-order-detail">
                <div style=" box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
                  <div class="order-detail-top">
                    <span class="order-detail-option">时间</span>
                    <span class="order-detail-option">交易类型</span>
                    <span class="order-detail-option">交易对</span>
                    <span class="order-detail-option">方向</span>
                    <span class="order-detail-option">价格</span>
                    <span class="order-detail-option">数量</span>
                    <span class="order-detail-option">成交额</span>
                    <span class="order-detail-option">手续费</span>
                    <Div class="clearfix"></Div>
                  </div>
                  <div class="order-detail-main" v-for="detail in detailList">
                    <span class="order-detail-option">{{detail.createTime}}</span>
                    <span class="order-detail-option">币币交易</span>
                    <span class="order-detail-option">{{detail.marketName}}</span>
                    <span class="order-detail-option">{{detail.type==0?'买入':'卖出'}}</span>
                    <span class="order-detail-option">{{detail.price}}</span>
                    <span class="order-detail-option">{{detail.dealNum}}</span>
                    <span class="order-detail-option">{{detail.price*detail.dealNum}}</span>
                    <span class="order-detail-option">{{detail.fee}}</span>
                    <Div class="clearfix"></Div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin: 10px;height: 45px" >
              <template v-if="this.list!=null && this.list.length!=0">
                <Page  style="float: right" :total="total"  :current="pageNum" :page-size="pageSize" @on-change="setPageNum" />

              </template>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {DatePicker,Select,Option,Input,Page} from 'iview'
  export default {
    name: "MyOrderList",
    components:{DatePicker,Select,Option,Input,Page},
    data (){
      return {
        currView:0,
        list:[],
        precoindList:[],
        detailList:[],
        i:null,
        coinName:null,
        precoinName:null,
        timer:null,
        total:0,
        params:{
          marketId:null,
          marketName:null,
          isCurrent:1,
          status:null,
          precoinId:null,
          sufcoinId:null,
          type:null,
          startTime:null,
          endTime:null,
          pageNum:1,
          pageSize:10,
        }
      }
    },
    watch:{
      currView(val){
        this.params.precoinId=null;
        this.params.sufcoinId=null;
        this.params.type=null;
        this.params.startTime=null;
        this.params.endTime=null;
        this.params.status=null;
        if(val==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      'params.status'(val){
        if(val==-1){
          this.params.status=null;
        }
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      'params.type'(val){

        if(val==-1){
          this.params.type=null;
        }
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      'params.startTime'(){
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      'params.endTime'(){
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
    },
    methods:{
      setPageNum(val){
        this.params.pageNum=val;
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      getMarketName(){
        this.params.marketName=this.coinName+'/'+this.precoinName;
        if(this.currView==0){
          this.getUserTradeEntrust();
        }else{
          this.getUserTradeEntrustHistory();
        }
      },
      getPrecoind(){
        this.$Http.get('/trade/getPrecoind').then(resp=>{
          this.precoindList=resp.data.result;
        });
      },
      getUserTradeEntrust(){
        this.params.isCurrent=1;
        this.list=[];
        this.$Http.post('/trade/getUserTradeEntrust', this.params).then(resp => {
          this.list = resp.data.result.list;
          this.total=resp.data.result.total;
        });

      },
      getUserTradeEntrustHistory(){
        this.params.isCurrent=2;
        this.list=[];

        this.$Http.post('/trade/getUserTradeEntrust',this.params).then(resp=>{
          this.list=resp.data.result.list;
          this.total=resp.data.result.total;
        });

      },
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
      getUserTradeDetails(id){
        this.$Http.post('/trade/getUserTradeDetails',{id:id}).then(resp=>{
          this.detailList=resp.data.result;
        });
      }
    },
    mounted(){
      this.getUserTradeEntrust();
      this.getPrecoind();
    }
  }
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css";

</style>
