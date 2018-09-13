import axios from 'axios'
import qs from 'qs'
import utils from './util'
import store from './../store/index'
import Base from './Base'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.params = {}
let baseUrl = Base.baseUrl;
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(res=> {
  // 对响应数据做点什么
  if (res.config.url.indexOf('login') >= 0) {
    const { code,msg, result } = res.data;
    if (code == 'SUCCESS') {
      //登陆后做出一些本地的处理，按需加载,()
      //...................
      utils.local.set('token', result.loginSession);
      store.commit('updateIsLogin',true);
      store.commit('updateMctSign',result.mctSign);
      store.commit('updateUid',result.id);
      if(result.registerType=="1"){
        store.commit('updateAccount',result.email);
      }else{
        store.commit('updateAccount',result.phone);
      }
    }
  }
  return res;
});
//封装请求方法
function formatReq(type, url, data, showNologin=true, isfile) {
  return new Promise((reslove, reject) => {
    axios({
      method: type,
      url: `${baseUrl}${url}`,
      headers: {
        //这里的请求头与后台商量设置
        "Content-Type": "application/x-www-form-urlencoded",
         "token":utils.local.get('token')
      },
      data: isfile?data:qs.stringify(data)
    }).then(resp => {
      //这里可以添加指定对应状态码的处理方式,比如登陆过期,res.data.code === '6666' 路由跳转到login

      if(resp.data.code==402 || resp.data.code==403){
        store.commit('updateAccount',false);
        store.commit('updateIsLogin',false);
        if(showNologin){
          if(resp.data.code==403){
            store.commit('updateShowNoLogin',1);
          }else if(resp.data.code==402){
            store.commit('updateShowNoLogin',2);
          }
        }
      }


      reslove(resp);
    }).catch(e => {
      reject(e.message);
    });
  });
}
function jsonToGet(json){
  return qs.stringify(json);
}
const Http = {
  get: (url, data,showNologin) =>{
    url=url+'?'+jsonToGet(data);
    return formatReq('get', url, data ,showNologin);
  },
  post: (url, data, showNologin) => formatReq('post', url, data, showNologin),
  put: (url, data, showNologin ) => formatReq('put', url, data, showNologin),
  patch: (url, data, showNologin) => formatReq('patch', url, data, showNologin),
  delete: (url, data, showNologin) => formatReq('delete', url, data, showNologin),
  getFile :(url, data, showNologin) => formatReq('post', url, data, showNologin, true),
};
export default Http;

