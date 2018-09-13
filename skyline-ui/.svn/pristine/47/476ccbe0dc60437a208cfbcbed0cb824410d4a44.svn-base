<template>
  <div class="son-container">
    <a href="javascript:void(0);" class="history-btn" @click="goBack()">&lt;&lt;返回</a>
    <div class="son-cont-tit">对订单{{item.orderNo}}进行申诉</div>
    <div class="appeal-wrapper bg-f1">
      <!--未提交申诉-->
      <div class="appeal-form" v-if="stateItem==null">
        <form>
          <div>
            <div class="appeal-pic">
              <span class="appeal-tit">上传支付截图：</span>
              <!--上传图片-->
              <div class="appeal-up-box" v-if="imgUrl==null">
                <input type="file" @change='uploadFile'>
              </div>
              <!--图片上传成功后-->
              <div class="appeal-up-box appeal-up-succ" v-if="imgUrl!=null">
                <input type="file"  @change='uploadFile'>
                <img :src="this.$store.state.uploadUrl+imgUrl">
                <span>点击重新上传</span>
              </div>

              <span class="appeal-tips">图片要求：文件大小不超过3M，文件格式为JPG或PNG，请确保照片清晰</span>
            </div>
            <div class="appeal-text">
              <span class="appeal-tit">请输入文字内容：</span>
              <textarea class="appeal-textarea" v-model="content" ></textarea>
              <span class="appeal-tips">文字要求：请详细描述申诉内容</span>
            </div>
            <div class="clearfix"></div>
          </div>
          <Button class="appeal-sub" @click="sumbit()">提交</Button>
        </form>
      </div>

      <!--已提交申诉-->
      <div class="appeal-form" v-if="stateItem!=null">
        <form>
          <div>
            <div class="appeal-pic">
              <span class="appeal-tit">支付截图：</span>
              <div class="appeal-up-box appeal-up-succ gallery">
                <img :src="this.$store.state.uploadUrl+stateItem.proveUrl" >
              </div>
            </div>
            <div class="appeal-text">
              <span class="appeal-tit">文字资料：</span>
              <textarea class="appeal-textarea" v-model="stateItem.content"></textarea>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="ft-14 col-1 m-t-40">申诉提交成功，等待客服联系，请保持通讯顺畅！</div>
          <Button class="appeal-cancel" @click="revokeTransactionstateModel()">撤销此申诉</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import  {Button} from 'iview'
    export default {
        name: "TransactionState",
        components:{Button},
        data(){

          return {
              item:{},
              stateItem:null,
              imgUrl:null,
              params:{

              },
              content:null,
          }
        },
        methods:{
          getTransactionorder(){
            this.$Http.get('transactionorder/getTransactionorder',{transactionorderId:this.$route.params.id}).then(resp=>{
              this.item=resp.data.result;
              this.getTransactionstate();
            });
          },
          uploadFile(e){
            let formData = new FormData();
            formData.append("file",e.target.files[0]);
            this.$Http.getFile('/upload',formData).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('上传成功');
                this.imgUrl=resp.data.result;
              }
            });
          },
          sumbit(){
            if(this.imgUrl==null || this.imgUrl==''){
              this.$Message.error('请上传凭证');
              return false;
            }
            if(this.content==null || this.content==''){
              this.$Message.error('请输入申诉内容');
              return false;
            }
            this.$Http.post('transactionstate/save',{orderNo:this.item.orderNo,proveUrl:this.imgUrl,content:this.content}).then(resp=>{
                if(resp.data.code!="SUCCESS") {
                  this.$Message.error(resp.data.msg);
                }else{
                  this.$Message.success('提交申诉成功');
                  this.getTransactionstate();
                }
            });
          },
          getTransactionstate(){
            this.$Http.get('transactionstate/getTransactionstateByOrderNo',{orderNo:this.item.orderNo}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.stateItem=resp.data.result;
              }
            });
          },
          revokeTransactionstateModel() {
            this.$Modal.confirm({
              title: '撤销申诉',
              content: '<p>您确定要撤销申诉？</p>',
              onOk: () => {
                this.revokeTransactionstate();
              },
            });
          },
          revokeTransactionstate(){
            this.$Http.post('transactionstate/revokeTransactionstate',{id:this.stateItem.id}).then(resp=>{
              if(resp.data.code!="SUCCESS") {
                this.$Message.error(resp.data.msg);
              }else{
                this.$Message.success('撤销申诉成功');
                this.getTransactionstate();
              }
            });
          },
          goBack() {
            window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
          }
        },
        mounted(){
          this.getTransactionorder();


        }

    }
</script>

<style scoped>
  @import "../../assets/css/c2c_trade.css";
  @import "../../assets/css/fsgallery.css";

  .appeal-sub{display: block; width: 240px; height: 40px; border-radius: 3px; background: #E14F4F; color: #fff; margin-top: 40px;}
  .appeal-cancel{display: block; width: 240px; height: 40px; border: 1px solid #E14F4F; border-radius: 3px; color: #E14F4F; background: none; margin-top: 30px;}

</style>
