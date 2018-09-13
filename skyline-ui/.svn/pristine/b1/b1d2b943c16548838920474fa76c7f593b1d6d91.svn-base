<template>
  <div class="son-container">
    <navigation :index="1"></navigation>
    <div class="personal-wrapper">
      <person></person>
      <!--账户与安全-->
      <h4 class="personal-tit" style="margin-bottom: 1px;">账号与安全</h4>
        <security></security>
      <!--支付信息-->
      <h4 class="personal-tit" style="margin-bottom: 1px;">支付方式</h4>
      <payment></payment>


      <!--登录历史-->
      <h4 class="personal-tit" style="margin-bottom: 1px;">登录历史</h4>
      <history></history>

    </div>
    <div class="clearfix"></div>



  </div>

</template>

<script>
  import $ from 'jquery'
  import Navigation from "../comm/Navigation"
  import PersonInformation from "../personal/PersonInformation"
  import Security from "../personal/Security"
  import ModeOfPayment  from "../personal/ModeOfPayment"
  import UserLoginHistory  from "../personal/UserLoginHistory"
  export default {
    name: "AccountSecurity",
    components: {
      "navigation":Navigation,
      "person":PersonInformation,
      "security":Security,
      "payment":ModeOfPayment,
      "history":UserLoginHistory
    },
  }


</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>
