<template>
  <div class="son-container">
    <div class="son-cont-tit">我的C2C交易订单</div>
    <div class="c2c-tab">
      <!--筛选-->
      <div class="c2c-sel">
        <div class="c2c-sel-item">
          <DatePicker type="date" placeholder="开始时间" style="width: 100px" v-model="params.startTime"></DatePicker>
          &nbsp;--&nbsp;
          <DatePicker type="date" placeholder="结束时间" style="width: 100px" v-model="params.endTime"></DatePicker>
          <div class="clearfix"></div>
        </div>
        <div class="c2c-sel-item">
          <div class="w-100">
            <Select placeholder="方向" v-model="params.type">
              <Option value="-1">全部</Option>
              <Option value="0">购买</Option>
              <Option value="1">出售</Option>
            </Select>
          </div>
        </div>
        <div class="c2c-sel-item">
          <div class="sel-input w-100">
            <Select placeholder="币种" v-model="params.coinId">
              <Option value="-1">全部</Option>
              <template v-if="transactiontypeList.length!=0" v-for="item in transactiontypeList">
                <Option :value="item.coinId" >{{item.coinName}}</Option>
              </template>
            </Select>
          </div>
        </div>
        <div class="c2c-sel-item">
          <div class="sel-input w-100">
            <Select placeholder="状态" v-model="params.status">
              <Option value="-1">全部</Option>
              <Option value="1">已完成</Option>
              <Option value="2">待付款</Option>
              <Option value="3">待收款</Option>
              <Option value="4">已取消</Option>
            </Select>
          </div>
        </div>
        <a href="javascript:void(0);" class="search-btn"></a>
        <div class="clearfix"></div>
      </div>

      <div class="c2c-record">
        <div class="c2c-top">
          <span class="c2c-option">订单号</span>
          <span class="c2c-option">交易类型</span>
          <span class="c2c-option">交易数量</span>
          <span class="c2c-option">单价(CNY)</span>
          <span class="c2c-option">总价(CNY)</span>
          <span class="c2c-option">时间</span>
          <span class="c2c-option">交易对象</span>
          <span class="c2c-option">状态</span>
          <span class="c2c-option">操作</span>
          <div class="clearfix"></div>
        </div>
        <div class="c2c-main home-scroll">
          <div class="c2c-row" v-for="(item,index) in list">
            <span class="c2c-option">{{item.orderNo}}</span>
            <span class="c2c-option">{{item.transactionType==0 ? '赎买':'售出' }} {{item.coinName}}</span>
            <span class="c2c-option">{{item.number}}</span>
            <span class="c2c-option">{{item.price}}</span>
            <span class="c2c-option">{{item.totalPrice}}</span>
            <span class="c2c-option">{{item.createTime}}</span>
            <span class="c2c-option">{{item.merchantName}}</span>
            <span class="c2c-option">
               <template v-if="item.status==0">
                  待支付
                </template>
                 <template v-if="item.status==1 || item.status==5">
                  待放行
                </template>
                <template v-if="item.status==2">
                  交易成功
                </template>
                <template v-if="item.status==3">
                  取消
                </template>
                <template v-if="item.status==4">
                  超时取消
                </template>
                <template v-if="item.status==6">
                  申诉中
                </template>
                <template v-if="item.status==7">
                  申诉成功
                </template>
                <template v-if="item.status==8">
                  申诉失败
                </template>
                <template v-if="item.status==9">
                  异常关闭
                </template>

            </span>
            <span class="c2c-option">
									<router-link :to="{name:'transactionorder',params:{id:item.id}}">详情</router-link>
            </span>
            <div class="clearfix"></div>
          </div>

        </div>
        <div style="margin: 10px;height: 25px" >
          <Page  style="float: right" :total="total"  :current="params.pageNum" :page-size="params.pageSize" @on-change="setPageNum" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Page,Select,Option,DatePicker} from 'iview'
    export default {
        name: "TransactionorderByUser",
      components:{Page,Select,Option,DatePicker},
        data(){
          return{
              list:[],
              total:0,
              transactiontypeList:[],
              params:{
                pageNum:1,
                pageSize:10,
                coinId:null,
                startTime:null,
                endTime:null,
                type:null,
                status:null,
              }

          }
        },
        watch:{
          'params.coinId'(val){
            if(val==-1){
              this.params.coinId=null;
            }
            this.getList();
          },
          'params.startTime'(){
            this.getList();
          },
          'params.endTime'(){
            this.getList();
          },
          'params.type'(val){
            if(val==-1){
              this.params.type=null;
            }

            this.getList();
          },
          'params.status'(val){
            if(val==-1){
              this.params.status=null;
            }
            this.getList();
          }
        },
        methods:{
          setPageNum(val){
            this.params.pageNum=val;
            this.getList();
          },
          getList(){
            this.$Http.get("/transactionorder/getTransactionorderList",this.params).then(resp=>{
              this.list=resp.data.result.list;

              this.total=resp.data.result.total;
            });
          },
          getTransactiontypeList(){
            this.$Http.get('/transactiontype/getTransactiontypeList',{type:0}).then(resp=>{
              this.transactiontypeList=resp.data.result;
            });
          },
        },
        mounted(){
         this.getList();
         this.getTransactiontypeList();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
</style>
