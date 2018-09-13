<template>
  <div class="son-container">
    <!--发布广告记录-->
    <div class="ad-tab">
      <div class="son-cont-tit">广告详情</div>
      <div class="ad-tab-cont">
        <!--记录表-->
        <div class="ad-record" style="text-align: center">
          <div class="ad-record-top">
            <span class="ad-option-d">订单编号</span>
            <span class="ad-option-d">时间</span>
            <span class="ad-option-d">用户名</span>
            <span class="ad-option-d">交易类型</span>
            <span class="ad-option-d">交易货币</span>
            <span class="ad-option-d">付款方式</span>
            <span class="ad-option-d">单价</span>
            <span class="ad-option-d">交易数量</span>
            <span class="ad-option-d">交易状态</span>
            <span class="ad-option-d">操作</span>
            <div class="clearfix"></div>
          </div>
          <div class="ad-record-main home-scroll">
            <div class="ad-row" v-for="item in transactionorderList">
              <span class="ad-option-d">{{item.orderNo}}</span>
              <span class="ad-option-d">{{item.createTime}}</span>
              <span class="ad-option-d">{{item.userName}}</span>
              <span class="ad-option-d">{{item.transactionType==0?'购买':'出售'}}</span>
              <span class="ad-option-d">{{item.coinName}}</span>
              <span class="ad-option-d">
                <template v-if="item.payWay==0">微信</template>
                <template v-if="item.payWay==1">支付宝</template>
                 <template v-if="item.payWay==2">银行卡</template>
              </span>

              <span class="ad-option-d">{{item.price}}</span>
              <span class="ad-option-d">{{item.number}}</span>
              <span class="ad-option-d">
                <template v-if="item.status==0">
                  待支付
                </template>

                <template v-if="item.status==1 ">
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

                <template v-if="item.status==5">
                  申诉完成
                </template>
                <template v-if="item.status==9">
                  异常关闭
                </template>

              </span>
              <span class="ad-option-d">
                <router-link :to="{name:'transactionorder',params:{id:item.id}}" style="color: #629FEA">详情</router-link>
              </span>
              <div class="clearfix"></div>
            </div>

          </div>
          <div style="margin: 10px;height: 45px" >
            <Page  style="float: right" :total="total"  :current="params.pageNum" :page-size="params.pageSize" @on-change="setPageNum" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {Page} from 'iview'
    export default {
        name: "TransactionDetails",
        components:{Page},
        total:0,
        data (){
          return{
              transactionorderList:null,
              total:0,
              params:{
                transactionId:null,
                pageNum:1,
                pageSize:10
              }
          }
        },
        methods:{
          setPageNum(val){
            this.params.pageNum=val;
            this.getList();
          },
          getList(){
            this.$Http.get("transactionorder/getTransactionorderListByTransaction",this.params).then(resp=>{
              this.transactionorderList=resp.data.result.list;
              this.total=resp.data.result.total;
            });
          }
        },
        mounted(){
          this.params.transactionId=this.$route.params.id;
          this.getList();
        }

    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
  .ad-option-d{display: block; width: 10%; float: left; height: 46px; line-height: 46px;}
  .ad-option-d:nth-child(1){width: 15%;}
  .ad-option-d:nth-child(2){width: 14%;}
  .ad-option-d:nth-child(4){width: 7%;}
  .ad-option-d:nth-child(5){width: 7%;}
  .ad-option-d:nth-child(6){width: 7%;}
  .ad-option-d:nth-child(7){width: 10%;}
  .ad-option-d:nth-child(8){width: 10%; text-align: center;}
  .ad-option-d:nth-child(9){width: 10%; text-align: center;}
</style>
