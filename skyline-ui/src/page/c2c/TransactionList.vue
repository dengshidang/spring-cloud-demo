<template>
  <div class="son-container">
    <div class="trade-type">
      <a href="javascript:void(0);" class="trade-type-link" :class="{'link-active':currentView=='buy'}"  @click="toggleTabs('buy');">购买</a>
      <a href="javascript:void(0);" class="trade-type-link" :class="{'link-active':currentView=='sell'}" @click="toggleTabs('sell');">出售</a>
      <div class="clearfix"></div>
    </div>
    <div class="trade-wrapper">
      <!--发布广告-->
      <router-link :to="{path:'/transaction'}" class="trade-send-btn"  v-if="this.$store.state.mctSign==1">发布广告</router-link>
      <router-link :to="{path:'/transactionListByUser'}" class="trade-send-btn-2"  v-if="this.$store.state.mctSign==1">发布记录</router-link>
      <!--购买列表-->
      <div class="trade-list">
        <!--筛选-->
        <div class="trade-sel">
          <div class="trade-sel-item">
            <div class="w-100">
              <Input type="type" v-model="money" class="w-100" clearable  placeholder="请输入金额"></Input>
            </div>
          </div>
          <div class="trade-sel-item">
            <div class="w-100">

              <Select value="0"  class="w-100">
                <Option value="0" >人民币</Option>
              </Select>
            </div>
          </div>
          <div class="trade-sel-item">
            <div class=" w-100">

              <Select v-model="payWay" class="w-100">
                <Option :value="-1" :key="-1">全部</Option>
                <Option :value="0"  :key="0">微信</Option>
                <Option :value="1" :key="1">支付宝</Option>
                <Option :value="2" :key="2" >银行卡</Option>
              </Select>

            </div>
          </div>
          <a href="javascript:void(0);" class="search-btn" @click="lookup"></a>
        </div>
        <div class="hd">

          <ul>
            <li v-for="(item, index) in transactiontypeList" :class="{on:tansactiontypeId==item.id}"  @click="changeTansactiontypeId(item.id)" >{{item.coinName}} </li>
            <div class="clearfix"></div>
          </ul>
        </div>
        <div class="tab-top">
          <span class="trade-option">商家(30天成单|完成率)</span>
          <span class="trade-option">数量</span>
          <span class="trade-option">限额</span>
          <span class="trade-option">单价</span>
          <span class="trade-option">支付方式</span>
          <span class="trade-option">操作</span>
          <div class="clearfix"></div>
        </div>
        <div class="bd">
          <!--BTC购买列表-->
          <div class="trade-scroll home-scroll">
            <div class="trade-row" v-for="(item,index) in transactionList">
              <div class="row-info">
                <div class="trade-option f-w-b">{{item.merchantName}}({{item.num | blankNumber}} | {{item.completeOrderNum|percentage(item.orderNum)}} )</div>
                <div class="trade-option">{{item.surplusNum}}&nbsp;{{item.coinName}}</div>
                <div class="trade-option">{{item.min}}-{{item.max}} <label>CNY</label></div>
                <div class="trade-option">{{item.price}} <label>CNY</label></div>
                <div class="trade-option">
                  <img src="../../assets/img/icon-wechat.png" class="pay-type" v-if="item.payWay.includes('0')">
                  <img src="../../assets/img/icon-alipay.png" class="pay-type" v-if="item.payWay.includes('1')">
                  <img src="../../assets/img/icon-bank.png" class="pay-type" v-if="item.payWay.includes('2')">
                  <div class="clearfix"></div>
                </div>
                <div class="trade-option" v-if="currentView=='buy'">
                  <a href="javascript:void(0);" class="trade-btn buy-btn"  @click="changeBut(index,item.transactionNo)">购买{{item.coinName}}</a>
                </div>
                <div class="trade-option" v-if="currentView=='sell'">
                  <a href="javascript:void(0);" class="trade-btn sell-btn"  @click="changeBut(index,item.transactionNo)">出售{{item.coinName}}</a>
                </div>
                <div class="clearfix"></div>
              </div>


              <div  v-show="index==i" class="row-detail">
                <form class="trade-form" >
                  <div class="t-f-item">
                    <input type="text" v-model="numberCny" class="f-f-inp">
                    <span class="t-f-unit">CNY</span>
                    <!--输入框中金额不足或超过时显示-->
                    <span class="t-f-tips">{{error.numberCny}}</span>
                    <div class="clearfix"></div>
                  </div>
                  <span class="t-f-icon"></span>
                  <div class="t-f-item">
                    <input type="text" v-model="number" class="f-f-inp"  maxlength="12">
                    <span class="t-f-unit">{{item.coinName}}</span>
                    <!--输入框中数量不足或超过时显示-->
                    <!--<span class="t-f-tips">最小下单数量为1000 BTC</span>-->
                    <div class="clearfix"></div>
                  </div>
                  <a href="javascript:void(0);" class="t-f-sub" @click="submit()">下单</a>
                  <div class="clearfix"></div>
                </form>
                <!--付款方式-->
                <div class="t-pay-method">
                  <div class="t-pay-type" v-if="item.payWay.includes('0')">
                    <img src="../../assets/img/icon-wechat.png">
                    <span>微信</span>
                    <div class="clearfix"></div>
                  </div>
                  <div class="t-pay-type" v-if="item.payWay.includes('1')">
                    <img src="../../assets/img/icon-alipay.png">
                    <span>支付宝</span>
                    <div class="clearfix"></div>
                  </div>
                  <div class="t-pay-type" v-if="item.payWay.includes('2')">
                    <img src="../../assets/img/icon-bank.png">
                    <template v-for="blank in BankInfoList">
                      <span v-if="blank.type==2">{{blank.bankName}}</span>
                    </template>
                    <div class="clearfix"></div>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <!--用户备注-->
                <div class="t-f-des">商家备注：{{item.remark}}</div>
                <!--取消按钮-->
                <a href="javascript:void(0);" class="trade-cancel-btn" @click="changeBut(index,item.transactionNo)">取消</a>
                <div class="trade-tips">买方付款时限为30分钟</div>
              </div>


            </div>

          </div>
          <div style="margin: 10px;height: 45px" >
            <Page  style="float: right" :total="total"  :current="pageNum" :page-size="pageSize" @on-change="setPageNum" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import {Input,Select,Option,Page} from 'iview'

    import $ from 'jquery'
    export default {
        name: "TransactionList",
        components:{Input,Select,Option,Page},
        data (){
          return{
            currentView:'buy',
            transactiontypeList:[],
            tansactiontypeId:null,
            transactionList:[],
            tansactiontype:0,
            pageNum:1,
            pageSize:10,
            show:false,
            numberCny:null,
            number:null,
            transactionNo:null,
            i:null,
            BankInfoList:null,
            payWay:-1,
            total:0,
            money:null,
            error:{
              numberCny:null,
              number:null,
            }
          }
        },
        methods:{
          lookup(){
            this.getTransactionList();
          },
          setPageNum(val){
            this.pageNum=val;
            this.getTransactionList();
          },
          changeBut(i,transactionNo){
            if(i!=this.i){
              this.i=i;
              this.getBankInfoList();
            }else{
              this.i=null;
            }
            if(transactionNo!=this.transactionNo){
              this.transactionNo=transactionNo;
            }else{
              this.transactionNo=null;
            }

          },
          getBankInfoList(){
            this.$Http.get('/transaction/getBankinfoByTransactionNo',{transactionNo:this.transactionList[this.i].transactionNo}).then(resp=>{
              this.BankInfoList=resp.data.result;
            });
          },
          getTransactionList(){
            this.$Http.get('/transaction/getTransactionList',{tansactiontypeId:this.tansactiontypeId,
              pageNum:this.pageNum,pageSize:this.pageSize,payWay:this.payWay,money:this.money}).then(resp=>{
              this.transactionList=resp.data.result.list;
              this.total=resp.data.result.total;
            });
          },
          changeTansactiontypeId(id){
            this.tansactiontypeId=id;
            this.getTransactionList();
          },
          toggleTabs (tabText) {

            this.currentView = tabText;
            if(tabText=='buy'){
              this.tansactiontype=0;
            }else{
              this.tansactiontype=1;
            }
            this.getTransactiontypeList();
            this.payWay='-1';
            this.i=null;
          },
          getTransactiontypeList(){
            this.$Http.get('/transactiontype/getTransactiontypeList',{type:this.tansactiontype}).then(resp=>{
              this.transactiontypeList=resp.data.result;
              this.tansactiontypeId= this.$route.query.tansactiontypeId!=null?
                this.$route.query.tansactiontypeId:this.transactiontypeList.length!=0?resp.data.result[0].id:null;

              this.getTransactionList();
            });
          },
          submit(){
            if(this.error.number!=null || this.error.numberCny!=null){
              return false;
            }
            if(this.number==null){
              this.$Message.error('交易金额不能为空');
              return false;
            }
            this.$Http.post('/transactionorder/save',{transactionNo:this.transactionNo,number:this.number}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('下单成功');
                this.$router.push({ name: 'transactionorder', params: { id: resp.data.result}});
              }
            });
          }
        },
        watch:{
          numberCny(val){
            let v=val;
            if(v==null){
              this.error.numberCny=null;
            }else if(!this.$fun.isFloat(val)){
              this.error.numberCny='请输入有效数字';
              v=0;
            }else if(v<this.transactionList[this.i].min){
              this.error.numberCny='最小下单金额为'+this.transactionList[this.i].min+' CNY';
            }else if(v>this.transactionList[this.i].max){
              this.error.numberCny='最大下单金额为'+this.transactionList[this.i].max+' CNY';
            }else{
              this.error.numberCny=null;
            }
            this.number=v/this.transactionList[this.i].price;
          },
          number (val){
            if(val==null){
              this.error.number=null;
            }else if(!this.$fun.isFloat(val)){
              this.error.number='请输入有效数字';
            }else{
              this.error.number=null;
            }
            this.numberCny=this.$fun.accMul(val.toString() ,this.transactionList[this.i].price.toString());
          },
          payWay:function(val){
            this.getTransactionList();
          },

        },
        filters: {
          percentage: function (val1,val2) {
            if(val1==null){
              val1=0;
            }
            if ((val2==0) ||(val2==null)){
              return '100%';
            }else{
              return ((val1/val2)*100).toFixed(0) +"%";
            }
            return
          }
        },
        created (){
          let type=this.$route.query.type;

          if(type==0||type==null){
            this.currentView='buy';
            this.tansactiontype=0;
          }else{
            this.currentView='sell';
            this.tansactiontype=1;
          }

          this.getTransactiontypeList();
        },
        mounted(){

          let money=this.$route.query.money;
          let payWay=this.$route.query.payWay;
          this.money=money;
          this.payWay=payWay;
          if(this.payWay==null){
            this.payWay='-1';
          }

          //筛选
          $('.sel-top').click(function(t){
            $(t).next('.sel-list').slideToggle(200);
            $(t).find('.fa').toggleClass('fa-caret-up');
            $(t).parents('.c2c-sel-item').siblings().find('.sel-list').hide();
            $(t).parents('.c2c-sel-item').siblings().find('.fa').removeClass('fa-caret-up');
          })
          $('.sel-list li').click(function(t){
            $(t).parent('.sel-list').prev('.sel-top').find('.sel-active').html($(this).html());
            $(t).parent('.sel-list').slideUp(200);
            $(t).parent('.sel-list').prev('.sel-top').find('.fa').removeClass('fa-caret-up');
          })

        }
    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
  .row-detail{display:block; margin-bottom: 20px; box-shadow: 1px 2px 10px rgba(0,0,0,0.03); border: 1px solid rgba(199,199,199,0.1); padding: 20px; position: relative;}
  .none{
    height: 0;
    transition: all  .5s;
  }
  .block{
    height: 200px;
    transition: all  .5s;
  }

</style>
