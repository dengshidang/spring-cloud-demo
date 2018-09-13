<template>

</template>

<script>
    export default {
        name: "NoLogin",
        data(){
          return{
            title:'登录提示',
            contentOne:"您的登录已过期，请重新登录",
            contentTwo:"您的还未登录，请登录"
          }
        },
        watch:{
          '$store.state.showNoLogin'(val){
            if(val==1){
              this.$Modal.warning({
                title: this.title,
                content: this.contentOne,
                onOk:this.toLogin
              });
            }else if(val==2){
              this.$Modal.warning({
                title: this.title,
                content: this.contentTwo,
                onOk:this.toLogin
              });
            }
          }
        },
        methods:{
          toLogin(){
            this.$router.push('/login');
            this.$store.commit('updateShowNoLogin',0);
          }
        }
    }
</script>

<style scoped>

</style>
