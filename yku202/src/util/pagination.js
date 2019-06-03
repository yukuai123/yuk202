//定义变量 需要一个pagination-ul的 ul元素
let paginationByJS  = (content, data, pageCount, list = null, li = null) =>{

  //拿到我们的总页码
  function getTotalPage(data, pageCount){
    if (Math.ceil(data.length / pageCount) < 0) return console.error('getTotalPage 出现问题');
    return Math.ceil(data.length / pageCount);
  }

  //每次都能够返回 一个包含要取到数据的索引
  function  getArrIndex(data, totalPage, pageCount){
    let begin, end;
    if (!content.currentPage > 0 && !data.length && !totalPage > 0 && !pageCount > 0) {
      return console.error('您传入的参数有误');
    }
    //当前页在头尾的情况
    if (content.currentPage === 1) {
      return (totalPage === 1)? {
        begin: 0,
        end: data.length - 1
      } : {
        begin: 0,
        end: pageCount -1
      }
    }
    if (content.currentPage === parseInt(totalPage)){
      begin = ((content.currentPage -1)  * pageCount);
      end = data.length -1;
      return {
        begin, end
      }
    }

    //在中间的情况
    if (content.currentPage > 1 && content.currentPage < totalPage){
      begin = (content.currentPage - 1) * pageCount;
      end = content.currentPage * pageCount -1;
      return { begin, end };
    }
  }

  //增删类名修改
  function isActive(){
    //拿到目前正在作用active的元素 并且获取他的innerText
    let activeBtn = document.getElementById('active'),
      oldActiveIndex = activeBtn? parseInt(activeBtn.innerText) : null;

    //如果两次点击同一个按钮则不做操作
    if (oldActiveIndex === content.currentPage){ return; }

    //若按钮存在 么此先做一个删除
    if (activeBtn){ activeBtn.id = ''; }

    list = Array.from(document.getElementsByClassName('pagination-li'));
    //遍历添加
    (list.find(i=> parseInt(i.innerText) === content.currentPage)).id = 'active';
  }

  //返回渲染数组
  function  getRenderList(){
    let temp = getArrIndex(data, getTotalPage(data,  pageCount), pageCount);
    return data.slice(temp.begin, temp.end + 1); //slice方法取头不拿尾
  }

  //第一次创造列表数据
  function createBtn(totalPage){
    let ul = document.getElementById('pagination-ul');
    if (!data.length) {
      li = document.createElement('li');li.innerText = '列表无数据';
      ul.appendChild(li);
      return;
    }
    //每次都至少显示五个 当前 当前的前2个 当前的后2个
    for (let i =1; i <= totalPage; i++){
      //开头
      if (i === 1){
        li = document.createElement('li');li.innerText = '<';if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');
        ul.appendChild(li);
      }
      //拿到页码按钮集合
      li = document.createElement('li');
      li.innerText = i;
      if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');

      //保证至少页码为8的时候才出现省略号
      if(i > 6 && totalPage > 7){
        li.innerText = '...';
        if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');
        ul.appendChild(li);
        li = document.createElement('li');li.innerText = totalPage;
        if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');
        ul.appendChild(li);
        li = document.createElement('li');li.innerText = '>';
        if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');
        ul.appendChild(li);
        break;
      }
      ul.appendChild(li);
      //到头了您
      if (i === totalPage){
        li = document.createElement('li');li.innerText = '>';
        if (!li.classList.contains('pagination-li')) li.classList.add('pagination-li');
        ul.appendChild(li);
      }
    }
  }

  function btnControl(totalPage) {
    //小于7 就直接全部排出来就ok 不用搞这些花里胡哨的
    if (totalPage < 8)return;
    let li,
      before = content.currentPage - 2, //头
      after = content.currentPage + 2, //尾巴
      list = document.getElementsByClassName('pagination-li'), //数据列表
      arr = Array.from(list).filter((i)=>{  //实际页码改变的按钮
        index = parseInt(i.innerText);
        return (index !== 1 && index !== totalPage && index.toString() !== 'NaN');
      }),
      headFlag = list[2],
      endFlag = list[list.length - 3];

    //控制插入 '...'
    if (content.currentPage > 4 && headFlag.innerText !== '...'){
      li = document.createElement('li');
      li.innerText = '...';
      list[0].parentElement.insertBefore(li, headFlag);
    }
    if ((content.currentPage > 1) && endFlag.innerText !== '...'){
      li = document.createElement('li');
      li.innerText = '...';
      list[0].parentElement.insertBefore(li, list[list.length - 2]); //加入之前的所以是 list.length-2
    }

    //控制删除 '...'
    if (content.currentPage < 5 && headFlag.innerText === '...'){
      headFlag.parentNode.removeChild(headFlag);
    }
    if (after + 1 >= totalPage && endFlag.innerText === '...'){
      endFlag.parentNode.removeChild(endFlag);
    }


    //关键的控制 基于他们展示时当前页 和 头尾 在边界位置以及普通位置的情况来做考虑
    //在中间的时候 以content.currentPage为中心 前后2格
    if (before > 1 && after < totalPage){
      for (let i = content.currentPage -  2, j = 0; i <= content.currentPage + 2; i++, j++){
        arr[j].innerText = i;
      }
    }

    //头碰到边界了 说明要从2开始 这个content.currentPage是3了
    if (before === 1){
      for (let i = content.currentPage - 1, j = 0; i <= content.currentPage + 3; i++, j++){
        arr[j].innerText = i;
      }
    }

    //尾巴碰到边界了 说明要从content.currentPage回头数三个开始，不然会生成一个和totalPage相同的page，就是bug了。
    if (after === totalPage){
      for (let i = content.currentPage -  3, j = 0; i < content.currentPage + 2; i++, j++){
        arr[j].innerText = i;
      }
    }

    //当前页首尾~同上
    if (content.currentPage === 1){
      for (let i = content.currentPage + 1, j = 0; i <= arr.length + 1; i++, j++){
        arr[j].innerText = i;
      }

    }
    if (content.currentPage === totalPage){
      for (let i = content.currentPage -  arr.length, j = 0; i < totalPage; i++, j++){
        arr[j].innerText = i;
      }
    }
  }

  function arrowControl(target, totalPage){
    let event = target || window.event;
    if (event) {
      target = event.target;
    }

    if (target) {
      switch (target.innerText){
        case '<': content.currentPage = content.currentPage === 1? 1 : content.currentPage - 1;break;
        case '>': content.currentPage = content.currentPage === totalPage? totalPage : content.currentPage + 1; break;
        case '...': break;
        default: content.currentPage = parseInt(target.innerText);
      }
    }
  }

  //这个是事件的监听函数
  function pagination(target){
    let totalPage = getTotalPage(data, pageCount);
    //兼容拿到事件
    arrowControl(target, totalPage);
    btnControl(totalPage, parseInt(content.currentPage));
    isActive();
    content.list = getRenderList();
  }
  //首次注册生成第一页数据和分页栏
  function firstInit() {
    createBtn(parseInt(getTotalPage(data, pageCount)));
    content.list = getRenderList();
    isActive();
  }

  (function () {
    firstInit();
    Array.from(document.getElementsByClassName('pagination-li')).forEach(i => i.onclick = function (e) {
      pagination(e);
    });
  })()
};


export default paginationByJS;



