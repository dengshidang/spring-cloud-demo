<template>
  <div class="log-container">
    <div class="w-100 h-100">
      <div class="log-left f-l" style="width: 0;"></div>
      <div class="log-right f-l" style="width: 100%;">
        <!--注册表单-->
        <div class="log-form" style="left: calc(50% - 230px);">
          <h2>忘记密码</h2>
          <div class="reg-box w-100">
            <div class="hd">

              <RadioGroup v-model="currView">
                <Radio label="phone">手机找回</Radio>
                <Radio label="email">邮箱找回</Radio>
              </RadioGroup>
            </div>
            <div class="bd">
              <div >
                <!--手机找回-->
                <form>
                  <template v-if="currView=='phone'">
                    <div class="f-item-2">
                      <span class="f-text">手机号</span>
                      <input type="text" class="f-inp-2" v-model="params.phone">
                      <div class="clearfix"></div>
                    </div>
                    <div class="f-item-2">
                      <input type="text" class="f-inp-2" placeholder="手机验证码" v-model="params.code">
                      <input type="button" class="f-inp-code f-r" v-model="phoneBut" @click="sendPhone" id="tel-btn">
                      <div class="clearfix"></div>
                    </div>
                  </template>
                  <template v-else-if="currView=='email'">
                    <div class="f-item-2">
                      <span class="f-text">邮箱</span>
                      <input type="text" class="f-inp-2" v-model="params.email">
                      <div class="clearfix"></div>
                    </div>
                    <div class="f-item-2">
                      <input type="text" class="f-inp-2" placeholder="邮箱验证码" v-model="params.code">
                      <input type="button" class="f-inp-code f-r" v-model="emailBut" @click="sendEmail" id="mail-btn">
                      <div class="clearfix"></div>
                    </div>
                  </template>
                  <div class="f-item-2">
                    <span class="f-text">重置密码</span>
                    <input type="password" class="f-inp-2" v-model="params.newLoginPwd">
                    <div class="clearfix"></div>
                  </div>
                  <div class="f-item-2">
                    <span class="f-text">确认新密码</span>
                    <input type="password" class="f-inp-2">
                    <div class="clearfix"></div>
                  </div>
                  <div class="f-link t-r">
                    <router-link :to="{path:'/login'}">登录</router-link>
                  </div>
                  <a href="javascript:void(0);" class="f-sub login-btn" @click="forgetLoginPwd">提交</a>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
    import  {RadioGroup,Radio} from 'iview'
    export default {
        name: "Forget",
        components:{RadioGroup,Radio},
        data (){
          return{
            currView:'phone',
            phoneBut:"获取验证码",
            emailBut:"获取验证码",
            phoneTimer: null,
            emailTimer: null,
            params:{
              phone:null,
              email:null,
              code:null,
              newLoginPwd:null,
            }
          }
        },
        watch:{

        },
        methods:{
          forgetLoginPwd(){
            this.$Http.post("/userinfo/forgetLoginPwd",this.params).then(resp=>{
              if(resp.data.code!='SUCCESS'){
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('设置成功');
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
            this.$Http.post("/userinfo/sendSmsCode", {phone: this.params.phone,type:1}).then(resp => {
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
            this.$Http.post("/userinfo/sendMailCode", {email: this.params.email,type:1}).then(resp => {
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
          cleanTimer:function () {
            this.emailBut='获取验证码';
            clearInterval(this.emailTimer);
            this.emailTimer = null;
            this.phoneBut='获取验证码';
            clearInterval(this.phoneTimer);
            this.phoneTimer = null;
          },

        },
        destroyed (){
          this.$store.commit('updateBack','do-head-background-1');
        },
        mounted(){
          this.$store.commit('updateBack','do-head-background-2');
        }
    }
</script>

<style scoped>
@import "../../assets/css/log-reg.css";
.log-container{position:relative ;width: 100%; height: 840px; color: #f2f3f5; }

</style>
