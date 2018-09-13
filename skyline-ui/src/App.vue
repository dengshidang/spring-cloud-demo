<template>
  <div id="app" class="container-main bg-f2">
    <Head></Head>
    <NoLogin></NoLogin>
    <template v-if="isLogin">
      <Ws></Ws>
    </template>
        <router-view  />
    <Footer></Footer>
  </div>
</template>

<script>
  import Head from './page/comm/Head'
  import Footer from './page/comm/Footer'
  import Ws from './page/comm/Ws'
  import NoLogin from './page/comm/NoLogin'

export default {
  components: {
    Head,
    Footer,
    Ws,
    NoLogin
  },
  name: 'App',
  data(){
    return{
      isLogin:this.$store.state.isLogin,
    }
  },
  watch:{
    '$store.state.isLogin'(val){
      this.isLogin=val;
    },
    '$route.name'(val){
     if(val=='coinCoin'){
       location.reload();
     }
    }
  },

}
</script>

<style>
@import "assets/css/font-awesome.css";
@import "assets/css/public.css";
@import "assets/css/home.css";
@import "assets/css/jquery.range.css";
@import "assets/css/iview/iview.css";
#app {
  height: auto;
  width: 100%;
}
</style>
