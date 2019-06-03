import axios from 'axios';
import qs from 'qs';
import CONFIG from './config';
const instance = axios.create();
instance.defaults.baseUrl = CONFIG.api;
instance.defaults.timeout = 5000;

instance.interceptors.request.use((config)=>{
  if (config.responseType === 'from' && config.file !== 'image'){
    config.data = qs.stringify(config.data);
  }else{
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  }
  return config;
},(err)=>{
  console.error('请求超时',err);
  return Promise.reject(err);
});

// instance.interceptors.response.use((res)=>{})  响应拦截
export default instance;
