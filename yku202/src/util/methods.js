import paginationByJS from './pagination';

export default {
  paginationByJS,
  sortByTime(list, paramName){

    //排序
    let sort = list.sort(function (a,b) {
      return new Date(b[paramName]).getTime() - new Date(a[paramName]).getTime();
    });

    //这里分类出来了一个倒序数组
    //我们还想实现 从倒序数组中 划分出年的不同， 再从年的不同中划分出月的不同

    let temp_year = new Date(sort[0][paramName]).getFullYear(), arr = [];
    sort.forEach(i=>{
      let year = new Date(i[paramName]).getFullYear();
      if (!arr.length){
        arr.push({year, list: [i]})
      }else{
        if (year === temp_year){
          let item = arr.find(i=> year === i.year);
          item.list.push(i);
        } else{
          temp_year = year;
          arr.push({year, list: [i]})
        }
      }
    });

    return arr;
  }
}




