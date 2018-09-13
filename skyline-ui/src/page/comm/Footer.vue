<template>
  <div class="bg-b3 w-100 p-1-0" style="position:relative;">
    <div class="footer">
      <div class="footer-l f-l">
        <h2>SKYLINE.COM</h2>
        <div class="footer-icon">
          <a href="#"><i class="fa fa-wechat"></i></a>
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-envelope"></i></a>
          <div class="clearfix"></div>
        </div>
        <div class="copyright">
          Copyright 2018 skyline.com
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "Footer"
    }
</script>

<style scoped>
  /*公共底部*/
  .footer{width: 186px; margin: 90px auto; color: #fff; }
  .footer-l h2{font-size: 26px;}
  .footer-icon{margin: 22px 0;}
  .footer-icon a{display: block; float: left; margin-right: 28px; color: #fff; font-size: 20px;}
  .footer-link h4{margin-bottom: 20px;}
  .footer-link a{display: block; color: #fff; margin-bottom: 12px;}
</style>
