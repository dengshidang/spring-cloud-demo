<template>
  <div class="log-container">
    <div class="w-100 h-100">
      <div class="log-left f-l" style="width: 0;"></div>
      <div class="log-right f-l" style="width: 100%;">
        <!--注册表单-->
        <div class="log-form" style="top: 10%; left: calc(50% - 230px);">
          <h2>注册</h2>
          <div class="reg-box w-100">
            <div class="hd">
              <ul>
                <li class="reg-type "  :class="{on:currentView=='phone'}"  @click="toggleTabs('phone');">
                  <div class="reg-circle"  ><span ></span></div>
                  <span class="reg-name">手机注册</span>
                  <div class="clearfix"></div>
                </li>
                <li class="reg-type"  :class="{on:currentView=='email'}" @click="toggleTabs('email');">
                  <div class="reg-circle"  ><span></span></div>
                  <span class="reg-name">邮箱注册</span>
                  <div class="clearfix"></div>
                </li>
                <div class="clearfix"></div>
              </ul>
            </div>
            <div class="bd">

                <!--手机注册-->
                <form>
                  <div class="f-item-2">
                    <span class="f-text">昵称</span>
                    <input  type="text" class="f-inp-2" placeholder="请输入昵称（选填）"  v-model="params.nickName" >
                    <div class="clearfix"></div>
                  </div>
                  <template v-if="currentView=='phone'">
                    <div class="f-item-2">
                      <span class="f-text">手机号</span>
                      <input type="text" class="f-inp-2" placeholder="请输入手机号码"  v-model="params.phone" >

                      <div class="clearfix" ></div>
                    </div>
                  </template>
                  <template v-if="currentView=='email'">
                    <div class="f-item-2">
                      <span class="f-text">邮箱号</span>
                      <input type="text" class="f-inp-2" placeholder="请输入邮箱" v-model="params.email" >

                      <div class="clearfix" ></div>
                    </div>
                  </template>
                  <div class="f-item-2">
                    <input type="text" class="f-inp-2" placeholder="验证码" v-model="params.imgCode"  >
                    <div class="f-code">
                      <img :src="img" @click="getImg()">
                    </div>

                    <div class="clearfix"></div>
                  </div>
                  <template v-if="currentView=='phone'">
                  <div class="f-item-2">
                    <input type="text" class="f-inp-2" placeholder="手机验证码" v-model="params.phoneOrEmailCode" >
                    <input type="button" @click="sendPhone()" v-model="phoneBut"   class="f-inp-code f-r" value="发送验证码" >

                    <div class="clearfix"></div>
                  </div>
                  </template>
                  <template v-if="currentView=='email'">
                    <div class="f-item-2">
                      <input type="text" class="f-inp-2" placeholder="邮箱验证码" v-model="params.phoneOrEmailCode" >
                      <input type="button" class="f-inp-code f-r"   @click="sendEmail()" v-model="emailBut">
                      <div class="clearfix"></div>
                    </div>
                  </template>
                  <div class="f-item-2">
                    <span class="f-text">登录密码</span>
                    <input type="password" class="f-inp-2" placeholder="请输入至少6位数，且包含数字和字母" v-model="params.loginPwd" >
                    <div class="clearfix"></div>

                  </div>
                  <div class="f-item-2">
                    <span class="f-text">邀请码</span>
                    <input type="text" class="f-inp-2" v-model="params.invit" placeholder="请输入邀请码（选填）">
                    <div class="clearfix"></div>
                  </div>
                  <div class="f-item-1">
                    <input type="checkbox"  @click="checkBtn($event)" class="f-check">
                    <div class="f-l">
                      我已阅读并同意<a href="用户协议.html" target="_blank" style="color: #E14F4F;">《用户协议》</a>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="f-link t-r">
                    已有账号，
                    <router-link :to="{path: '/login'}">去登录</router-link>
                  </div>
                  <a href="javascript:void(0);" @click="submit()" class="f-sub login-btn">注册</a>
                </form>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data (){
          return {
            readArgement:false,
            phoneTimer: null,
            emailTimer: null,
            currentView:'phone',
            phoneBut:"获取验证码",
            emailBut:"获取验证码",
            img:null,
            params:{
              imgCodeId:null,
              phone :null,
              email:null,
              nickName:null,
              loginPwd:null,
              registerType:0,
              imgCode:null,
              phoneOrEmailCode:null,
              invit:null,
            }
          }
        },
        methods: {
          toggleTabs (tabText) {
            this.currentView = tabText;
            this.getImg();
            if(this.currentView=='phone'){
              this.params.registerType=0;
            }else{
              this.params.registerType=1;
            }
          },
          getImg (){
           this.$Http.get('/userinfo/imgCode').then(resp => {
              this.img=resp.data.result.img;
              this.params.imgCodeId=resp.data.result.codeId;
            });
          },
          submit(){
            if(this.params.loginPwd==null||!this.$fun.checkPwd(this.params.loginPwd)){
              this.$Message.error("密码必须是6-12位，且包含数字和字母");
              return ;
            }
              if(!this.readArgement){
                this.$Message.error("同意用户协议才能注册");
                return ;
              }
              this.$Http.post("/userinfo/register",this.params).then(resp=>{
                if(resp.data.code!='SUCCESS'){
                  this.$Message.error(resp.data.msg);
                  this.getImg();
                }else{
                  this.$Message.success('注册成功');
                  this.$router.push('/login');
                }
              });
          },
          sendPhone(){
            if (this.params.phone == null) {
                this.$Message.error("手机号码不能为空!");
                return;
            }
            if(this.phoneBut!="获取验证码"){
                return;
            }
            if(!this.$fun.checkPhone(this.params.phone)){
              this.$Message.error("手机号码格式错误");
              return ;
            }
            this.phoneBut=60;
              this.getPhoneCode();
              this.$Http.post("/userinfo/sendSmsCode", {phone: this.params.phone,type:0,imgCode:this.params.imgCode,imgCodeId:this.params.imgCodeId}).then(resp => {
                if(resp.data.code!='SUCCESS'){
                  this.$Message.error(resp.data.msg);
                  this.cleanTimer();
                }else{
                  this.$Message.success(resp.data.msg);
                }
              });

          },
          sendEmail(){
              if(this.emailBut!="获取验证码"){
                return;
              }
              if(!this.$fun.checkEmail(this.params.email)){
                this.$Message.error("邮箱格式错误");
                return ;
              }
              this.emailBut=60;
              this.getEmailCode();
              this.$Http.post("/userinfo/sendMailCode", {email: this.params.email,type:0}).then(resp => {
                if(resp.data.code!='SUCCESS'){
                  this.$Message.error(resp.data.msg);
                  this.cleanTimer();
                }else{
                  this.$Message.success(resp.data.msg);
                }
              });

          },
          getPhoneCode(){
              this.phoneTimer = setInterval(() => {
                if (this.phoneBut > 0 && this.phoneBut <= 60) {
                  this.phoneBut--;
                } else {
                  this.phoneBut='获取验证码';
                  clearInterval(this.phoneTimer);
                  this.phoneTimer = null;
                }
              }, 1000);
          },
          getEmailCode(){
            this.emailTimer = setInterval(() => {
              if (this.emailBut > 0 && this.emailBut <= 60) {
                this.emailBut--;
              } else {
                this.emailBut='获取验证码';
                clearInterval(this.emailTimer);
                this.emailTimer = null;
              }
            }, 1000);
          },
          checkBtn(e){
            this.readArgement = e.target.checked;
          },
          cleanTimer:function () {
            this.emailBut='获取验证码';
            clearInterval(this.emailTimer);
            this.emailTimer = null;
            this.phoneBut='获取验证码';
            clearInterval(this.phoneTimer);
            this.phoneTimer = null;
          },
        },
      mounted (){
        this.$store.commit('updateBack','do-head-background-2');
        this.getImg();
        this.params.invit=this.$route.query.invit;
      },
      destroyed (){
        this.$store.commit('updateBack','do-head-background-1');
      }
    }
</script>

<style scoped>
  .log-container{position:relative ;width: 100%; height: 840px;  color: #f2f3f5; }
  .log-left{width: 37.5%; height: 100%; background: url(../../assets/img/log-bg1.png) no-repeat; background-size: 100% 100%; position: relative;}
  .log-right{width: 62.5%; height: 100%; background: url(../../assets/img/log-bg2.png) no-repeat; background-size: 100% 100%; position: relative;}
  .log-lang a{color: #fff;}
  .log-lang .lang-list li{padding-left: 4px; padding-right: 4px;}
  .log-text span{display: block; margin-bottom: 10px; font-size: 22px;}
  .log-text span:nth-child(1){font-size: 28px;}
  .log-form{position: absolute; top: 16%; left: 12%; color: #F2F3F5; width: 460px;}
  .log-form h2{font-size: 32px; margin-bottom: 54px;}
  .f-item-2{border-bottom: 1px solid rgba(255,255,255,0.16); margin-bottom: 20px;}
  .f-item-1 .f-text{display: block; width: 100%; height: 48px; line-height: 48px;}
  .f-item-2 .f-text{display: block; width: 90px; height: 48px; line-height: 48px; float: left;}
  .f-inp-2{display: block; width: 260px; height: 48px; line-height: 48px; float: left; text-indent: 10px; border: none; color: #F2F3F5;}
  .f-link{margin-top: 20px;}
  .f-link a{color: #F2F3F5;}
  .f-sub{display: block; width: 90%; height: 48px; line-height: 48px; border-radius: 24px; background: #7288b4; text-align: center; color: #F2F3F5; margin: 30px auto 0;}
  .f-inp-code{display: block; width: 110px; height: 32px; border: none; background: #7288B4; text-align: center; color: #F2F3F5; margin-top: 8px; border-radius: 20px;}
  .f-code{display: block; width: 110px; height: 32px; float: right;}
  .f-code img{display: block; width: 100%; height: 100%;}
  .f-check{display: block; float: left; margin-right: 3px; margin-top: 4px;}
  .reg-box .hd{margin-bottom: 30px;}
  .reg-box .hd ul{width: 100%;}
  .reg-box .hd .reg-type{width: 120px; float: left; margin-right: 20px; cursor: pointer; box-sizing:content-box}
  .reg-circle{width: 6px; height: 6px; float: left; padding: 3px; border-radius: 50%; background: #3f4c67; margin-top: 4px;box-sizing:content-box}
  .reg-circle span{display: block; width: 100%; height: 100%; background: transparent; border-radius: 50%;}
  .reg-name{display: block; float: left; margin-left: 12px;}
  .reg-box .hd ul li.on .reg-circle span{background: #7a9ce0;}

</style>
