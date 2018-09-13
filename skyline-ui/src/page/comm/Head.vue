<template>

  <!--公共头部-->
  <div class="doc-head " :class="headBackground">
    <ul class="doc-nav f-l">
      <li class="nav-item">
        <router-link :to="{path: '/'}">首页</router-link>
      </li>
      <li class="nav-item nav-fa" >
        <router-link :to="{path:'/transactionList'}"> C2C交易<i class="fa fa-caret-down" ></i></router-link>
        <ul class="nav-son">
          <li><router-link :to="{path:'/transactionList'}">C2C交易</router-link></li>
          <li><router-link :to="{path:'/transactionorderByUser'}">C2C订单详情</router-link></li>
        </ul>
      </li>
      <li class="nav-item nav-fa">
        <router-link :to="{path:'/coinCoin',query:{id:marketId,precoinId:precoinId,precoinName:precoinName,sufcoinName:sufcoinName}}"> 币币交易<i class="fa fa-caret-down" ></i></router-link>
        <ul class="nav-son">
          <li><router-link :to="{path:'/coinCoin',query:{id:marketId,precoinId:precoinId,precoinName:precoinName,sufcoinName:sufcoinName}}">币币交易</router-link></li>
          <li><router-link :to="{path: '/myOrderList'}">币币交易订单</router-link></li>
        </ul>
      </li>
      <li class="nav-item nav-fa">
        <router-link :to="{path:'/help',query:{type:1}}">帮忙中心 <i class="fa fa-caret-down" :class="{'fa-caret-up':faCaretUp}"></i></router-link>
        <ul class="nav-son">
          <li><router-link :to="{path:'/help',query:{type:2}}">新手指南</router-link></li>
          <li><router-link :to="{path:'/help',query:{type:0}}">行业新闻</router-link></li>
          <li><router-link :to="{path:'/help',query:{type:1}}">最新公告</router-link></li>
        </ul>
      </li>
      <div class="clearfix"></div>
    </ul>
    <ul class="doc-nav f-r">
      <!--用户未登录-->
      <li class="nav-item" v-if="!this.$store.state.isLogin">
        <router-link :to="{path: '/login'}">登录</router-link>
        <router-link :to="{path:'/register'}" style="margin-left: 15px;">注册</router-link>
      </li>
      <!--用户已登录-->
      <li class="nav-item nav-fa" v-show="this.$store.state.isLogin"   >
        <a href="javascript:void(0);"><i class="fa fa-user-o m-r-4"></i> {{this.$store.state.account}} <i class="fa fa-caret-down"></i></a>
        <ul class="nav-son">
          <li><router-link :to="{path: '/myProperty'}">我的资产</router-link></li>
          <li> <router-link :to="{path: '/accountSecurity'}">账户安全</router-link></li>
          <li><router-link :to="{path: '/userCertified'}">身份认证</router-link></li>
          <li><router-link :to="{path: '/myInvite'}">我的邀请码</router-link></li>
          <li><router-link :to="{path: '/myInvite'}">商家申请</router-link></li>
          <li style="border-top: 1px solid rgba(255,255,255,0.2);"><a href="#" @click="loginOut()">退出</a></li>
        </ul>
      </li>
      <!--语言选择-->
      <li class="nav-item nav-fa">
        <a href="javascript:void(0);" class="lang-top">
          <i class="lang-active"><img src="../../assets/img/icon-zh.png" class="lang-icon"></i>
          <i class="fa fa-caret-down"></i>
        </a>
        <ul class="nav-son lang-list">
          <li>
            <i class="lang-sel"><img src="../../assets/img/icon-zh.png" class="lang-icon"></i>
            <span class="lang-name">中文</span>
            <div class="clearfix"></div>
          </li>
          <li>
            <i class="lang-sel"><img src="../../assets/img/icon-en.png" class="lang-icon"></i>
            <span class="lang-name">English</span>
            <div class="clearfix"></div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="clearfix"></div>
  </div>

</template>

<script>
  import $ from 'jquery'

    export default {
        name: "Head",
        data (){
          return {
            faCaretUp:false,
            headBackground:this.$store.state.headBackground,
            marketId:null,
            symbol:null,
            symbolName:null,
            precoinName:null,
            sufcoinName:null,
            precoinId:null,
            precoindList:[],
          }
        },
        watch:{
          '$store.state.headBackground'(val){
            this.headBackground=val;
          },

        },
        methods :{
          loginOut(){
            this.$store.commit("updateIsLogin",false);
            this.$router.push('/login');
          },
          getUser(){
            this.$Http.get('/userinfo/getUserByToken',{token:this.$store.state.token},false).then(resp=>{
                if(resp.data.code!='SUCCESS'){
                  this.$store.commit("updateLogin",false);
                }
            });
          },
          getPrecoind(){
            this.$Http.get('/trade/getPrecoind').then(resp=>{
              this.precoindList=resp.data.result;
              this.getMarket();
            });
          },
          getMarket(){
            if(this.precoindList==null){
              return false;
            }
            this.$Http.post('/trade/getMarket',{precoinId:this.precoindList[0].precoinId,type:1,dec:0,keyword:null}).then(resp=>{
              this.marketId=resp.data.result[0].marketId;
              this.precoinId=resp.data.result[0].precoinId;
              this.precoinName=resp.data.result[0].precoinName;
              this.sufcoinName=resp.data.result[0].sufcoinName;
            });
          }
        },
      created(){
        this.getUser();
      },
      mounted (){
          this.getPrecoind();
          /*导航*/
          $('.nav-fa').hover(function() {
            $('ul', this).slideDown(200);
            $(this).find('.fa-caret-down').addClass("fa-caret-up");
          }, function() {
            $('ul', this).slideUp(100);
            $(this).find('.fa-caret-down').removeClass("fa-caret-up");
          });
          /*语言选择*/
          $('.lang-list li').click(function(){
            var lang = $(this).find('.lang-sel').html();
            $('.lang-active').html(lang);
            $('.lang-list').slideUp(100);
          })
        }
    }
</script>

<style scoped>
.hidden{
  display: none;
}
/*公共头部*/
.do-head-background-1{background: #333333;}
.do-head-background-2{background: #303849;}
.doc-head{padding: 0 6%; width: 100%; height: 64px;  position: relative; z-index: 5; color: #fff; font-size: 12px;}
.doc-nav{width: auto; margin: 0 auto; position: relative;}
.doc-nav .nav-item{height: 64px; line-height: 64px; display: block; float: left; margin-right: 36px;}
.doc-nav li a{color: #fff;}
.doc-nav li a .fa{margin-left: 2px;}
.doc-nav li a:hover,.doc-nav li a:focus{color: #7a98f7;}
.doc-nav .nav-fa{position: relative;}
.doc-nav .nav-son{display: none; position: absolute; width: 140px; z-index: 10; background: #303742; padding: 8px;}
.nav-son li{width: 100%; height: 40px; line-height: 40px; text-align: center;}
.nav-split{width: 34%;}
</style>
