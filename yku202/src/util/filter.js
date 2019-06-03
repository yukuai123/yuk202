export default {
  getTime(timeStr){
    let time = new Date(timeStr);
    let month = time.getMonth() +1 < 10 ? '0'+(time.getMonth() +1) : (time.getMonth() +1),
      day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
      hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
      minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
      seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return time.getFullYear() + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  },

  getDay(timeStr){
    let time = new Date(timeStr);
    let month = time.getMonth() +1 < 10 ? '0'+(time.getMonth() +1) : (time.getMonth() +1),
      day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    return time.getFullYear() + '/' + month + '/' + day;
  },

  getContent(content){
    let reg=/<\/?.+?\/?>/g;

    return content.replace(reg, '').substr(0,100);
  }
}
