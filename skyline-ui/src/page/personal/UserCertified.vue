<template>

    <!--个人中心-->
    <div class="son-container">
      <navigation :index="2">

      </navigation>
      <div class="personal-wrapper">
        <h4 class="personal-tit">身份认证</h4>
        <div class="identity-box">
          <span class="ft-12 col-g">请如实填写您的身份信息，一经认证不可修改</span>

          <!--身份认证未通过-->
          <template v-if="result.status==null||result.status==0||result.status==2">
          <div class="identity-apply" >
            <div class="identity-head">
              <img src="./../../assets/img/icon-safe.png">
              <span>实名认证
                <template  v-if="result.status==null">
               — <label class="col-1">您还未完成实名认证！</label>
                </template>
                <template v-if="result.status==2">
                — <label class="col-1">您的实名认证未通过，请重新提交！</label>
                </template>
                <template v-if="result.status==0">
                — <label class="col-1">您的实名认证正在审核中！</label>
                </template>
              </span>
              <div class="clearfix"></div>
            </div>
            <form class="identity-form w-100 m-t-30">
              <div class="form-row m-b-20">
                <span class="form-text">真实姓名</span>
                <input type="text" class="form-inp h-40" placeholder="请填写真实姓名"  v-model="params.name">
                <div class="clearfix"></div>
              </div>
              <div class="form-row m-b-20">
                <span class="form-text">证件类型</span>
                <input type="text" class="form-inp h-40" value="身份证" readonly="readonly">
                <div class="clearfix"></div>
              </div>
              <div class="form-row m-b-20">
                <span class="form-text">证件号码</span>
                <input type="text" class="form-inp h-40" placeholder="请输入证件号码"  v-model="params.idCard" >
                <div class="clearfix"></div>
              </div>
              <div class="identity-up">
                <div class="identity-up-item">
                  <div class="identity-up-inp">
                    <template  v-if="result.status!=0">
                    <input type="file"  @change="zmFileImage"  accept="image/jpeg,image/x-png,image/gif,png"  value="">
                    </template>
                  </div>
                  <template v-if="zmImage!=null">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+zmImage" >
                  </div>
                  </template>
                  <span class="identity-up-tips col-f">上传身份证<label class="col-1">正面照</label></span>
                </div>
                <div class="identity-up-item">

                  <div class="identity-up-inp">
                    <template  v-if="result.status!=0">
                    <input type="file" @change="fmFileImage"  accept="image/jpeg,image/x-png,image/gif,png"  value="">
                    </template>
                  </div>
                  <template v-if="fmImage!=null">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+fmImage"  >
                  </div>
                  </template>
                  <span class="identity-up-tips col-f">上传身份证<label class="col-1">反面照</label></span>
                </div>
                <div class="identity-up-item">
                  <div class="identity-up-inp">
                    <template  v-if="result.status!=0">
                    <input type="file"  @change="scFileImage"  accept="image/jpeg,image/x-png,image/gif,png"  value="">
                    </template>
                  </div>
                  <template v-if="scImage!=null">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+scImage">
                  </div>
                  </template>
                  <span class="identity-up-tips col-f">上传<label class="col-1">手持身份证照</label></span>
                </div>
                <div class="identity-up-item">
                  <p style="margin-top: 30px;">提示：</p>
                  <p>1.需要本人手持身份证正面上半身免冠照片；</p>
                  <p>2.证件信息清晰可见，且不能被遮挡；</p>
                  <p>3.仅支持PNG/JPEG格式，图片大小不超过5M；</p>
                  <P>4.1-3个工作日内审核完成；</P>
                </div>
                <div class="clearfix"></div>
              </div>
              <template v-if="result.status==null||result.status==2">
              <a href="javascript:void(0);" class="identity-sub" @click="submitSecurity">提交</a>
              </template>
            </form>
          </div>
          </template>

          <!--身份认证已完成-->
          <template v-if="result.status==1">
          <div class="identity-apply" style="display: block;">
            <div class="identity-head">
              <img src="./../../assets/img/icon-safe.png">
              <span>实名认证 — <label class="col-1">您已完成实名认证！</label></span>
              <div class="clearfix"></div>
            </div>
            <form class="identity-form w-100 m-t-30">
              <div class="form-row m-b-20">
                <span class="form-text">真实姓名</span>
                <input type="text" class="form-inp h-40" placeholder="请填写真实姓名" v-model="result.name">
                <div class="clearfix"></div>
              </div>
              <div class="form-row m-b-20">
                <span class="form-text">证件类型</span>
                <input type="text" class="form-inp h-40" value="身份证" readonly="readonly">
                <div class="clearfix"></div>
              </div>
              <div class="form-row m-b-20">
                <span class="form-text">证件号码</span>
                <input type="text" class="form-inp h-40"  v-model="result.idCard">
                <div class="clearfix"></div>
              </div>
              <div class="identity-up">
                <div class="identity-up-item">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+result.idcardImg1">
                  </div>
                </div>
                <div class="identity-up-item">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+result.idcardImg2">
                  </div>
                </div>
                <div class="identity-up-item">
                  <div class="identity-up-pic">
                    <img :src="this.$store.state.uploadUrl+result.idcardImg3">
                  </div>
                </div>
                <div class="identity-up-item"></div>
                <div class="clearfix"></div>
              </div>
            </form>
          </div>
          </template>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

</template>

<script>
  import $ from 'jquery'
  import {Modal, Button} from 'iview'
  import util from './../../tool/util'
  import Navigation from "../comm/Navigation"
    export default {
        name: "userCertified",
        components: {"navigation":Navigation

        },
      data :function() {
        return{
          usereId:null,
          nickName : null,
          result:{
            idcardImg1:'',
            idcardImg2:'',
            idcardImg3:'',
            status:null,
          },
          flag:false,
          zmImage:null,
          fmImage:null,
          scImage:null,
          modal:{

          },
          params:{
            userId:null,
            type:1,
            name:null,
            idCard:null,
            IdcardImg1:null,
            IdcardImg2:null,
            IdcardImg3:null,
          }

        }
      },
      mounted :function(){
        this.initSecurity();
      },

      methods:{
        initSecurity() {
            this.$Http.get('/userinfo/getUserByToken', {token: util.local.get("token")}).then(resp => {
              this.usereId = resp.data.result.id;
              this.nickName = resp.data.result.nickName;
              this.queryCertifiedcation();
            });

        },
        queryCertifiedcation(){
          this.$Http.post('/userCertified/queryCertifiedcation', {userId: this.usereId,pageSize:0,pageNum:1}).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              if(resp.data.result.list==''){
                this.$Message.success("未查询到用户实名认证信息！");
              }else{
                this.zmImage =resp.data.result.list[0].idcardImg1
                this.fmImage =resp.data.result.list[0].idcardImg2
                this.scImage =resp.data.result.list[0].idcardImg3
                this.params.idCard =resp.data.result.list[0].idCard;
                this.params.name =resp.data.result.list[0].name;
                this.result = resp.data.result.list[0];
              }
            } else {
              this.$Message.error(resp.data.msg);
            }
          });

        },

        zmFileImage: function (e) {
          let file = e.target.files[0];
          let imgSize = file.size / 1024;
          if (imgSize > 2048) {
            alert('请上传大小不要超过2M的图片')
            return null;
          } else {
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            // 下面逻辑处理
            this.$Http.getFile("/upload",formData).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.zmImage = resp.data.result
                this.$Message.success(resp.data.msg);
              }else{
                this.$Message.error(resp.data.msg);
              }

            });

          }
        },
        fmFileImage: function (e) {
          let file = e.target.files[0];
          let imgSize = file.size / 1024;
          if (imgSize > 2048) {
            alert('请上传大小不要超过2M的图片')
          } else {
            let formData = new FormData();

            formData.append("file",e.target.files[0]);
            // 下面逻辑处理
            this.$Http.getFile("/upload",formData).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.fmImage = resp.data.result
                this.$Message.success(resp.data.msg);
              }else{
                this.$Message.error(resp.data.msg);
              }

            });

          }
        },
        scFileImage: function (e) {
          let file = e.target.files[0];
          let imgSize = file.size / 1024;
          if (imgSize > 2048) {
            alert('请上传大小不要超过2M的图片')
          } else {
            let formData = new FormData();

            formData.append("file",e.target.files[0]);
            // 下面逻辑处理
            this.$Http.getFile("/upload",formData).then(resp => {
              if (resp.data.code == 'SUCCESS') {
                this.scImage = resp.data.result
                this.$Message.success(resp.data.msg);
              }else{
                this.$Message.error(resp.data.msg);
              }

            });

          }
        },
        submitSecurity(){
          if(!this.$fun.checkIdCard(this.params.idCard)){
            this.$Message.error("身份证不合法");
            return ;
          }
          this.params.userId = this.usereId;
          this.params.IdcardImg1 = this.zmImage;
          this.params.IdcardImg2 = this.fmImage;
          this.params.IdcardImg3 = this.scImage;
          this.$Http.post("/userCertified/realNameCertification",this.params).then(resp => {
            if (resp.data.code == 'SUCCESS') {
              this.$Message.success(resp.data.msg);
              this.queryCertifiedcation();
            }else{
              this.$Message.error(resp.data.msg);
            }
          });

        },
      },


    }
</script>

<style scoped>

  @import "../../assets/css/user.css";


</style>
