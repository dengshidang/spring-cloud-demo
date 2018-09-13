// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  store from './store'
import Http from './tool/http'
import {Message,Notice,Modal} from 'iview'
import utils from './tool/util'
import * as filter from './tool/filter'
import fun from './tool/fun'
import VueClipboard from 'vue-clipboard2'
import Base from './tool/Base'
Vue.use(VueClipboard)

Message.config({
  top: 50,
  duration: 3
});
Vue.prototype.$Message=Message;

Vue.prototype.$Notice = Notice
Vue.prototype.$Modal=Modal;
Vue.prototype.$local=utils.local;
Vue.config.productionTip = false;
Vue.prototype.$Http = Http;
Vue.prototype.$fun=fun;
Vue.prototype.$Base=Base;

Vue.use(store);

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>',
})

/**websocket*/


