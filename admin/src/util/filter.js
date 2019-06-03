export default {
  switchPage(str){
    switch (str){
      case 'classify_name': {
        return '分类'
      }
      case 'tag_name': {
        return '标签'
      }
      case 'create_time': {
        return '创建时间'
      }
      case 'title': {
        return '标题'
      }
    }
  },
  getTime(timeStr){
    let time = new Date(timeStr);
    let month = time.getMonth() +1 < 10 ? '0'+(time.getMonth() +1) : (time.getMonth() +1),
      day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
      hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
      minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
      seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return time.getFullYear() + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  },

  generateDay(now){

    now = now? new Date(now):  new Date();

    let year = new Date().getFullYear();
    return ()=>{
      let day = {};
      day.use = Math.ceil( (now - +new Date(year+'-1-1')) / (60*60*24*1000));
      //闰年
      day.rest = ((year / 4) % 1 === 0 && (year / 100) % 1 !== 0)
      ||
      (!!year.toString().match(/\d0{3}/) &&  (year / 400) % 1 === 0)
        ? 366 - day.use: 365 - day.use;
      return day;
    }
  },

  getWord(content){
    let reg=/<\/?.+?\/?>/g;
    return content.replace(reg, '').length;
  }
}
