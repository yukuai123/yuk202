import qs from 'qs';
import axios from 'axios';
import CONFIG from "../../../yuk-admin/src/util/config";



export default {
  install(Vue){
    Vue.prototype.$ajax = (type, apiName, param, callback)=>{
      if (type === 'form'){
        param = qs.stringify(param);
      }
      axios[type](CONFIG.api + '/' + apiName, param).then(callback);
    }
  }
}
