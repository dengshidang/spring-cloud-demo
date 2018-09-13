<template>

</template>

<script>
  import {Notice,Button} from  'iview'
    export default {
        name: "Ws",
        components:{Notice,Button},
        data(){
          return{
             inputText: '', // 获取输入框内容
             websock: '', // websocket会话
             websockUrl:this.$Base.websockUrl,
             isLogin:this.$store.state.isLogin,
             title:'',
             desc:'您有新的订单正在处理。点击进入'
          }
        },
        watch:{
          '$store.state.isLogin'(val){
            if(val){
              this.websocketInit();
            }else{
              this.websock=null;
            }
          }
        },
        methods: {
          send () {
            this.readyChat(this.inputText);
          },
          /* webSocket会话 */
          /* 会话过程中实际调用的函数 */
          readyChat (data) {
            let This = this;
            if (this.websock.readyState === 1) { // this.websock.readyState = 1 表示连接成功，可以立即发送信息
              this.websocketSend(data);
            } else if (this.websock.readyState === 0) { // 表示正在连接，设置300ms后发送信息
              setTimeout(function () {
                This.websocketSend(data);
              }, 300);
            } else { // 连接未创建或者创建失败，则重新创建连接，并设置500ms后发送信息
              this.websocketInit();
              setTimeout(function () {
                This.websocketSend(data);
              }, 500);
            }
          },
          /* 初始化websochet */
          websocketInit () {
            this.websock = new WebSocket(this.websockUrl+this.$store.state.uid);
            this.websock.onmessage = this.websocketMessage;
          },
          /* websochet发送信息 */
          websocketSend (data) {
            this.websock.send(JSON.stringify(data));
          },
          /* websochet接收服务器返回的信息 */
          websocketMessage (e) {
            console.log(e);
            let mess=JSON.parse(e.data);
            let obj={message:mess.msg,
              orderId:mess.orderId,
              senderId:mess.senderId,
              recipientId:mess.recipientId,
              createTime:mess.createTime};

            if(mess.type==200){//连接成功
              this.$Http.get('/transactionorder/getIdsByUserId').then(resp=>{
                let list=resp.data.result;
                if(list!=null && list.length!=0){
                  for (let value of list) {
                    if((this.$route.name!="transactionorder")||((value.orderId != this.$route.params.id) && this.$route.name=="transactionorder")) {
                      this.time(value.orderId);
                    }
                  }
                }
              });
            }else if(this.$route.name=="transactionorder" && this.$route.params.id == obj.orderId){
              this.$store.commit('updateMessage',e.data);
              this.$store.commit('updateIsResponse');
            }else{

                if(mess.type==0 ||mess.type==1 || mess.type==2 || mess.type==3  || mess.type==4 || mess.type==5 || mess.type == 6 || mess.type == 9 || mess.type==20  ){
                    this.time(mess.orderId);
                }
            }
          },
          time (val) {
            var  self = this;
            self.$Notice.close(val);
            this.$Notice.open({
              title: '新的消息',
              duration:0,
              name:val,
              render: function (createElement) {
                return createElement('a', {
                  on: {
                    click (){
                      self.$Notice.close(val);
                      self.$router.push({ name: 'transactionorder', params: { id: val}});
                    }
                  },
                  style: {
                    'color':'red'
                  },
                },'您有正在处理的订单,点击进入');

              }
            });
          }
        },
        mounted(){
          if(this.$store.state.isLogin){
           this.websocketInit();
          }else{
            this.websock=null;
          }
        }

    }
</script>

<style scoped>
</style>
