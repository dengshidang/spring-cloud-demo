<template>
<div>
    <!--banner-->
    <Carousel autoplay>
      <template v-for="item in pictureList">
      <Carousel-item  >
        <img :src="$store.state.uploadUrl+item.url">
      </Carousel-item>
      </template>
    </Carousel>

    <!--交易快捷通道-->
    <div class="home-shortcut">
      <form class="shortcut-form f-l">
        <div class="shortcut-item" style="width: 84px;">
          <div class="w-100">
           <Select v-model="gj">
             <Option :value="0" :key="0">中国</Option>
           </Select>
          </div>
        </div>
        <div class="shortcut-item" style="width: 84px;">
          <div class=" w-100">
            <Select v-model="type">
              <Option :value="0" :key="0">购买</Option>
              <Option :value="1" :key="1">出售</Option>
            </Select>
          </div>
        </div>
        <div class="shortcut-item" style="width: 298px;">
          <Input type="text" style="width: 184px;" v-model="money" clearable></Input>
          <div class="sel-input f-r" style="width: 84px;">
            <Select v-model="currency">
              <Option :value="0" :key="0">人民币</Option>
            </Select>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="shortcut-item" style="width: 84px;">
          <div class=" w-100">
            <Select v-model="tansactiontypeId">
              <template   v-for="obj in transactiontypeList">
                <Option  :value="obj.id" :key="obj.id">{{obj.coinName}}</Option>
              </template>

            </Select>
          </div>
        </div>
        <div class="shortcut-item" style="width: 84px;">
          <div class="w-100">
            <Select v-model="payWay">
              <Option :value="0" :key="0">微信</Option>
              <Option :value="1" :key="1">支付宝</Option>
              <Option :value="2" :key="2">银行卡</Option>
            </Select>
          </div>
        </div>
        <div class="clearfix"></div>
      </form>

      <router-link class="shortcut-link f-r" :to="{path:'/transactionList',query:{type:type,payWay:payWay,money:money,tansactiontypeId:tansactiontypeId}}">去交易</router-link>
      <div class="clearfix"></div>
    </div>

    <!--平台介绍-->
    <div class="home-des move">
      <h3>专注基于区块链的数字货币全球交易</h3>
      <div class="w-100 over-h">
        <div class="home-des-item">
          <div class="des-first">
            <span class="des-tit">专业团队</span>
            <span class="des-circle"></span>
          </div>
          <div class="des-cont">
            我们的团队成员来自世界顶级金融机构互联网公司，为您提供优质的产品和服务为您提供优质的产品和服务
          </div>
          <img src="../assets/img/icon-des1.png" class="des-img">
        </div>
        <div class="home-des-item">
          <div class="des-first">
            <span class="des-tit">用户第一</span>
            <span class="des-circle"></span>
          </div>
          <div class="des-cont">
            我们的团队成员来自世界顶级金融机构互联网公司，为您提供优质的产品和服务
          </div>
          <img src="../assets/img/icon-des2.png" class="des-img">
        </div>
        <div class="home-des-item">
          <div class="des-first">
            <span class="des-tit">高流动性</span>
            <span class="des-circle"></span>
          </div>
          <div class="des-cont">
            我们的团队成员来自世界顶级金融机构互联网公司，为您提供优质的产品和服务
          </div>
          <img src="../assets/img/icon-des3.png" class="des-img">
        </div>
        <div class="home-des-item">
          <div class="des-first">
            <span class="des-tit">安全性</span>
            <span class="des-circle"></span>
          </div>
          <div class="des-cont">
            我们的团队成员来自世界顶级金融机构互联网公司，为您提供优质的产品和服务
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

    <!--APP下载-->
    <div class="home-app-bg">
      <div class="home-app-box">
        <h3>实时交易：买入、卖出、杠杆 - 实时提醒：行情提醒、事件提醒 - 随身充提：充值、提现</h3>
        <div class="w-100">
          <div class="home-app-type f-l">
            <div class="home-app-name f-l">
              <img src="../assets/img/ios.png">
              <a href="javascript:void(0);">IOS</a>
            </div>
            <div class="home-app-code f-l">
              <img src="../assets/img/code.png">
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="home-app-type f-l">
            <div class="home-app-name f-l">
              <img src="../assets/img/android.png">
              <a href="javascript:void(0);">Android</a>
            </div>
            <div class="home-app-code f-l">
              <img src="../assets/img/code.png">
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>

    <!--新闻-->
    <div class="w-100 p-1-0">
      <div class="home-article">
        <div class="hd">
          <ul>
            <li :class="{'on':(this.newsType==2?true:false)}" @click="initNewinfo(2)">新手指南</li>
            <li :class="{'on':(this.newsType==0?true:false)}" @click="initNewinfo(0)">行业新闻</li>
            <li :class="{'on':(this.newsType==1?true:false)}" @click="initNewinfo(1)">最新公告</li>
          </ul>
        </div>
        <div class="bd">
          <!--常见问题-->
          <ul class="home-article-list">
            <template v-for="items in newsInfo">
              <li>
                <router-link :to="{path:'/notice',query:{content:items.content,createTime:items.createTime,title:items.title}}">{{items.title}}</router-link>
              </li>
            </template>
            <div class="clearfix"></div>
          </ul>

        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import util from './../tool/util'
 import {Carousel,CarouselItem,Button,Select,Option,Input} from 'iview'

 export default {

       components: {
          Carousel,
          CarouselItem,
           Button,
         Select,Option,Input
       },
        name: "Index",
       data :function () {
         return{
           pictureList:null,
           gj:0,
           type:0,
           currency:0,
           coin:null,
           payWay:0,
           transactiontypeList:[],
           tansactiontypeId:null,
           money:null,

           newsType:2,
           newsInfo:[],
           pageNum:1,
           pageSize:10,
         }
       },
       watch:{
         type(){
           this.getTransactiontypeList();
         }
       },
       mounted(){
         this.uploadPicture();
         this.getTransactiontypeList();
         this.initNewinfo();
       },
        methods:{
         uploadPicture() {
           this.$Http.post('/additional/pictureShow', {}).then(resp => {
             this.pictureList = resp.data.result;
           });
         },
          getTransactiontypeList(){
            this.$Http.get('/transactiontype/getTransactiontypeList',{type:this.type}).then(resp=>{
              if(resp.data.code=="SUCCESS") {
                this.transactiontypeList=resp.data.result;
                this.tansactiontypeId=this.transactiontypeList.length!=0?resp.data.result[0].id:null;
              }else{
                this.transactiontypeList=[];
                this.tansactiontypeId=null;
              }

            });
          },
          initNewinfo:function(type){
           if(type==null){
             this.newsType = 2;
             type=2;
           }else{
             this.newsType = type;
           }
            this.$Http.post('/additional/queryNewsCarousel', {type:type,pageSize:this.pageSize,pageNum:this.pageNum}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.newsInfo = resp.data.result.list;
                this.total=resp.data.result.total;
                // alert(this.newsInfo[0].content);
              }else{
                this.$Message.error(resp.data.mgs);
              }
            });
          },

        },


    }
</script>

<style scoped>
  @import "../assets/css/user.css";
</style>
