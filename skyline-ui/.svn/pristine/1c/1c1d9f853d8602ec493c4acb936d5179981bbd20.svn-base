<template>
  <div class="son-container">
    <!--发布广告记录-->
    <div class="ad-tab">
      <div class="son-cont-tit">广告记录</div>
      <div class="ad-tab-cont">
        <!--筛选-->
        <div class="ad-sel">
          <div class="ad-sel-item">
               <DatePicker type="date" placeholder="开始时间" style="width: 100px" v-model="params.startTime"></DatePicker>
               &nbsp;--&nbsp;
               <DatePicker type="date" placeholder="结束时间" style="width: 100px" v-model="params.endTime"></DatePicker>
            <div class="clearfix"></div>
          </div>
          <div class="ad-sel-item">
            <div class=" w-100">
              <Select  placeholder="类型" >
                <Option value="-1">全部</Option>
                <Option value="0" >中国</Option>
                <Option value="1" >美国</Option>
              </Select>
            </div>
          </div>
          <div class="ad-sel-item">
            <div class="sel-input w-100">
              <Select placeholder="币种" v-model="params.coinId">
                <Option value="-1">全部</Option>
                <template v-if="transactiontypeList.length!=0" v-for="item in transactiontypeList">
                  <Option :value="item.coinId" >{{item.coinName}}</Option>
                </template>
              </Select>
            </div>
          </div>
          <a href="javascript:void(0);" title="搜索" class="search-btn" ></a>
          <div class="clearfix"></div>
        </div>
        <!--记录表-->
        <div class="ad-record" >
          <div class="ad-record-top"  >
            <span class="ad-option">广告交易编号</span>
            <span class="ad-option">广告类型</span>
            <span class="ad-option">数量</span>
            <span class="ad-option">订单限额(CNY)</span>
            <span class="ad-option">单价(CNY)</span>
            <span class="ad-option">更新时间</span>
            <span class="ad-option">操作</span>
            <div class="clearfix"></div>
          </div>
          <div class="ad-record-main home-scroll">
            <div class="ad-row" v-for="item in transactionList">
              <span class="ad-option">{{item.transactionNo}}</span>
              <span class="ad-option">{{item.transactiontype==0?'购买':'出售'}}{{item.coinName}}</span>
              <span class="ad-option">{{item.totalNum}}</span>
              <span class="ad-option">{{item.min}}-{{item.max}} </span>
              <span class="ad-option">{{item.price}}</span>
              <span class="ad-option" >

             {{item.updateTime!=null?item.updateTime:item.createTime}}
              </span>
              <div class="ad-option" style="text-align: left" >

                <!--若此单有剩余数量，显示撤销按钮、修改按钮-->
                <a href="javascript:void(0);" class="ad-cancel-btn" v-if="(item.status==0) ||(item.status==1) " @click="cancelModel(item.id)">撤销</a>
                <router-link :to="{name:'transaction',params :{transactionId:item.id}}"   v-if="(item.status==0) ||(item.status==1) "  class="ad-update-link" >修改</router-link>
                <router-link :to="{name:'transactionDetails',params:{id : item.id}}" class="ad-detail-link">详情
                  <template v-if="item.orderInNum!=null">
                    <Badge :count="item.orderInNum" ></Badge>
                  </template>
                </router-link>

                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>

        </div>
        <div style="margin: 10px;height: 45px" >
          <Page  style="float: right" :total="total"  :current="params.pageNum" :page-size="params.pageSize" @on-change="setPageNum" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Page,Select,Option,DatePicker,Badge} from 'iview'
  import $ from 'jquery'
    export default {
        name: "TransactionListByUser",
        components:{Page,Select,Option,DatePicker,Badge},
        data (){
          return{
            transactionList:[],
            transactiontypeList:[],
            total:0,
            params:{
              pageNum:1,
              pageSize:10,
              coinId:null,
              startTime:null,
              endTime:null,
            }
          }
        },
        watch:{
          'params.coinId'(val){
            if(val==-1){
              this.params.coinId=null;
            }
            this.getTransactionListByUser();
          },
          'params.startTime'(){
            this.getTransactionListByUser();
          },
          'params.endTime'(){
            this.getTransactionListByUser();
          }
        },
        methods:{
          getTransactionListByUser(){
            this.$Http.get('/transaction/getTransactionListByUser',this.params).then(resp=>{
              this.transactionList=resp.data.result.list;
            });
          },
          cancelModel(id) {
            this.$Modal.confirm({
              title: '撤销订单',
              content: '<p>您确定要撤销订单？</p>',
              onOk: () => {
                this.cancel(id);
              },
            });
          },
          cancel(id){
            this.$Http.post('/transaction/cancel',{transactionId:id}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('撤销成功');
                this.getTransactionListByUser();
              }
            });
          },
          setPageNum(val){
            this.params.pageNum=val;
            this.getTransactionListByUser();
          },
          getTransactiontypeList(){
            this.$Http.get('/transactiontype/getTransactiontypeList',{type:0}).then(resp=>{
              this.transactiontypeList=resp.data.result;
            });
          },
        },
        mounted(){
          this.getTransactiontypeList();
          this.getTransactionListByUser();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
</style>
