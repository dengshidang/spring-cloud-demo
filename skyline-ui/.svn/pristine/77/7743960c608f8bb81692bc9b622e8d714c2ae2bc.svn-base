<template>
  <div class="log-container"  >
    <div class="w-100 h-100">
      <div class="log-left f-l" style="width: 0;"></div>
      <div class="log-right f-l" style="width: 100%;">
        <!--登录表单-->
        <div class="log-form" style="width: 460px; left: calc(50% - 230px);">
          <h2>登录</h2>
          <form>
            <div class="f-item-1">
              <span class="f-text">账号</span>
              <input type="text"  v-on:keyup.13="login"    class="f-inp-1" v-model="params.account">
            </div>
            <div class="f-item-1">
              <span class="f-text">密码</span>
              <input type="password"   v-on:keyup.13="login"    class="f-inp-1" v-model="params.loginPwd">
            </div>
            <div class="f-item-3">
              <input type="text"   class="f-inp-3" v-on:keyup.13="login"   placeholder="请输入验证码" v-model="params.imgCode">
              <div class="f-code" style="height: 48px;">
                <img :src="img"    @click="getImg()" >
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="f-link t-r">
              <router-link :to="{path:'/register'}">去注册</router-link>
              <router-link :to="{path:'/forget'}">忘记密码？</router-link>
            </div>
            <a  class="f-sub login-btn" @click="login" >登录</a>

            <!--点击登录按钮出现滑块验证-->
          </form>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <!--滑块-->
    <div class="page-shade" >
      <div id="slider1" class="slider"></div>
    </div>

  </div>
</template>

<script>

  import $ from 'jquery'
  import  '../../assets/js/jquery.slider.min'

    export default {
        name: "Login",
        components:{},
        data(){
          return{
            img:null,
            params:{
              account:null,
              loginPwd:null,
              imgCodeId:null,
              imgCode:null,
            }
          }
        },
        methods:{
          login (){
            if(this.params.account==null||this.params.account==''){
              this.$Message.error("账号不能为空！");
              return ;
            }
            if(this.params.loginPwd==null||this.params.loginPwd==''){
              this.$Message.error("登录密码不能为空！");
              return ;
            }
            if(this.params.imgCode==null||this.params.imgCode==''){
              this.$Message.error("验证码不能为空！");
              return ;
            }
            this.$Http.post("/userinfo/login",this.params).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.getImg();
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('登录成功');
                this.$router.push('/');
              }
            });
          },
          getImg (){
            this.$Http.get('/userinfo/imgCode').then(resp => {
              this.img=resp.data.result.img;
              this.params.imgCodeId=resp.data.result.codeId;
            });
          },
        },
        destroyed (){
          this.$store.commit('updateBack','do-head-background-1');
        },
        mounted(){
          this.$store.commit('updateBack','do-head-background-2');
          this.getImg();
        }
    }
</script>
<style scoped>

  .log-container{position:relative ;width: 100%; height: 840px; color: #f2f3f5; }
  .log-left{width: 37.5%; height: 100%; background: url(../../assets/img/log-bg1.png) no-repeat; background-size: 100% 100%; position: relative;}
  .log-right{width: 62.5%; height: 100%; background: url(../../assets/img/log-bg2.png) no-repeat; background-size: 100% 100%; position: relative;}
  .log-lang a{color: #fff;}
  .log-lang .lang-list li{padding-left: 4px; padding-right: 4px;}
  .log-text span{display: block; margin-bottom: 10px; font-size: 22px;}
  .log-text span:nth-child(1){font-size: 28px;}
  .log-form{position: absolute; top: 7.5%; left: 12%; color: #F2F3F5; width: 460px;}
  .log-form h2{font-size: 32px; margin-bottom: 54px;}
  .f-item-1 .f-text{display: block; width: 100%; height: 48px; line-height: 48px;}
  .f-item-2 .f-text{display: block; width: 90px; height: 48px; line-height: 48px; float: left;}
  .f-inp-1{display: block; width: 100%; height: 48px; line-height: 48px; text-indent: 10px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.16); color: #F2F3F5;background-color: transparent}
  .f-link{margin-top: 20px;}
  .f-link a{color: #F2F3F5;}
  .f-sub{display: block; width: 90%; height: 48px; line-height: 48px; border-radius: 24px; background: #7288b4; text-align: center; color: #F2F3F5; margin: 30px auto 0;}
  .f-code img{display: block; width: 100%; height: 100%;}
  .reg-box .hd ul{width: 100%;}
  .reg-circle span{display: block; width: 100%; height: 100%; background: transparent; border-radius: 50%;}
  .reg-box .hd ul li.on .reg-circle span{background: #7a9ce0;}
  .f-item-3{margin-top: 20px;}
  .f-inp-3{display: block; width: calc(100% - 120px); height: 48px; line-height: 48px; float: left; text-indent: 10px; border: 1px solid rgba(255,255,255,0.16); border-radius: 4px;  color: #F2F3F5;}
  .f-code{display: block; width: 110px; height: 32px; float: right;}
  .f-code img{display: block; width: 100%; height: 100%;}
  input:hover {
    border-color: #57a3f3;
  }
</style>
