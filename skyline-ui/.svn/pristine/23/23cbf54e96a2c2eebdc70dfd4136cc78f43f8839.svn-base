<template>


    <!--个人中心-->
    <div class="son-container">
        <navigation :index="4"></navigation>
      <div class="personal-wrapper">
        <h4 class="personal-tit">商家申请</h4>
        <div class="seller-apply">
          <div class="seller-apply-tit">成为商家，享受更多交易特权</div>
          <div class="sell-apply-intro">
            <div class="intro-item">
              <img src="./../../assets/img/icon-seller2.png" class="intro-icon">
              <span class="intro-tit">广告发布</span>
              <span class="intro-cont">商家自由发布广告，买卖更灵活、更便捷。</span>
            </div>
            <div class="intro-item">
              <img src="./../../assets/img/icon-seller1.png" class="intro-icon">
              <span class="intro-tit">专属标识</span>
              <span class="intro-cont">商家名称后会显示专属的加V标识，增强交易方信任。</span>
            </div>
            <div class="intro-item">
              <img src="./../../assets/img/icon-seller3.png" class="intro-icon">
              <span class="intro-tit">一对一服务</span>
              <span class="intro-cont">我们将向商家提供一对一专属服务。</span>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="sell-agree">
            <input type="checkbox" class="sell-check"  name="checkbox"  @click="selectAllBtn($event)">
            <span>我已阅读并同意</span>
            <a href="认证商家协议.html" target="_blank">《认证商家协议》</a>
            <div class="clearfix"></div>
          </div>
          <template v-if="status==3">
            <a href="javascript:void(0);" v-if="" class="sell-apply-status sell-apply-btn" @click="openApplication()">立即申请</a>
          </template>

          <template v-if="status==0">
            <a href="javascript:void(0);" class="sell-apply-status">您已提交完成审核信息</a>
          </template>

          <template v-if="status==1">
            <a href="javascript:void(0);" class="sell-apply-status">您已成为商家</a>
          </template>
          <!--已申请，审核中-->
          <!--<a href="javascript:void(0);" class="sell-apply-status">审核中</a>-->
          <!--审核通过，已成为商家-->
          <!--<a href="javascript:void(0);" class="sell-apply-status">您已成为商家</a>-->
        </div>
      </div>
      <div class="clearfix"></div>
      <!--商家申请弹窗-->
      <modal v-model="modal.application" width="400px" style="display: block;">
        <div class="pop-tit" style="font-size: 18px;">申请成为商家</div>
        <div>
          <form>
            <div class="sell-apply-explain">
              <span class="apply-tit">申请步骤如下：</span>
              <div class="apply-step">
                <span class="apply-step-num">01.</span>
                <div class="apply-step-cont">
                  <div class="m-b-10">用户需要下载“<a href="成为商家申请资料.doc" download="成为商家申请资料.doc" class="col-3">成为商家 申请资料</a>”文档进行填写，并录制视频。</div>
                  <div class="col-g m-b-10">要求：</div>
                  <div class="col-g">
                    视频诵读范本：本人（姓名），身份证号（身份证号码），我的资金来源合法可靠，	自愿交易比特币等数字资产，本人充分了解数字货币及潜在风险，本人具有抗风险	的能力并愿意承担一切风险！
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="apply-step">
                <span class="apply-step-num">02.</span>
                <div class="apply-step-cont">
                  <div>
                    把填写好的资料文档和视频发送到指定的邮箱:<span class="col-3">(100001@qq,com)</span>  邮件主题为“<span class="col-3">申请商家</span> ”
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </form>
        </div>
        <div slot="footer">
          <Button size="large" class="pop-sub" style="margin-top: 0px; cursor: pointer"  @click="submitApplication" >申请
          </Button>
        </div>
      </modal>
    </div>




</template>

<script>
  import $ from 'jquery'
  import {Modal} from 'iview'
  import util from './../../tool/util'
  import Navigation from "../comm/Navigation"
    export default {
        name: "BusinessApplication",
      components: {
           "modal":Modal,
          "navigation":Navigation,
      },
      data :function(){
        return {
          showModal: false,
          invitHisList: null,
          readArgement:false,
          userInfo:{
            id:null,
            nickName:null,
            phone:null,
            email:null,
            loginPwd:null,
            payPwd:null,

          },
          usercommercial:null,
          status:null,

          modal:{
            application : false,
          },

        }
      },
      mounted(){
        this. initSecurity();
      },
      methods:{
        initSecurity() {
          this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
            if(resp.data.code=='SUCCESS'){
              this.userInfo = resp.data.result;
              this.queryUserApplication();
            }else{
              this.$Message.error(resp.data.msg)
            }
          });
        },
        queryUserApplication(){
          this.$Http.post('/userCertified/queryUsercommercial', {userId:this.userInfo.id,pageSize:0,pageNum:1}).then(resp => {
            if(resp.data.code=='SUCCESS'){
              if(resp.data.result.list[0]==null){
                this.status =3;
              }else{
                this.status=resp.data.result.list[0].status;
              }
            }else{
              this.$Message.error(resp.data.msg)
            }

          });


        },
        submitApplication(){
            this.$Http.get('/invitationRecord/businessApplication', {userId:this.userInfo.id}).then(resp => {
              if(resp.data.code=='SUCCESS'){
                this.modal.application = false;
                this.$Message.success(resp.data.msg);
                this.queryUserApplication();
              }else{
                this.$Message.error(resp.data.msg)
              }
            });
          },
        selectAllBtn(e){
          this.readArgement = e.target.checked;
        },
        openApplication(){
          if(!this.readArgement){
            this.$Message.error("请先阅读认证商家协议！");
            return
          }
          this.modal.application=true;
        }
      }

    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
  @import "../../assets/css/checkbox.css";

</style>
