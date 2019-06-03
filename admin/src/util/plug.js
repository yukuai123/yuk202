import { Message, MessageBox} from 'element-ui';
import axios from 'axios';
import CONFIG from './config';
import qs from 'qs';
// import echarts from 'echarts'
export default {
  install(Vue) {
    // Vue.prototype.$echarts = echarts;
    Vue.prototype.$msgSuc = (content) => {
      Message({
        message: content,
        type: 'success'
      })
    };
    Vue.prototype.$msgWar = (content) => {
      Message({
        message: content,
        type: 'warning'
      })
    };
    Vue.prototype.$msgErr = (content) => {
      Message({
        message: content,
        type: 'error'
      })
    };
    Vue.prototype.$msgInfo = (content) => {
      Message({
        message: content,
        type: 'info'
      })
    };
    Vue.prototype.$confirm = (content) => {
      return new Promise((resolve, reject) => {
        MessageBox.confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve();
        }, () => {
          reject();
        });
      })
    };
    Vue.prototype.$ajax = (type, apiName, param, callback)=>{
      if (type === 'form'){
        param = qs.stringify(param);
      }
      axios[type](CONFIG.api + '/' + apiName, param).then(callback);
    };
  }
}
