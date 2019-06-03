let util = require('./util');
module.exports = {
  //这边做具体方法的操作
  //把增删改成在抽象出一层来 下面的查询代码基本上都一样没必要重新写


  //node中req.query是查询参数 get用的
  //req.body是 请求体参数post用的

  //传入每一个sql语句给工具函数

  //page
  addPage(...args) {
    let content = args[0].body.content, create_time = args[0].body.create_time, tag_id = args[0].body.tag_id,
        classify_id = args[0].body.classify_id, title = args[0].body.title, status = args[0].body.status,
        sql = `INSERT INTO page (content, create_time, tag_id, classify_id, title, status) VALUES ('${content}', '${create_time}', '${tag_id}', '${classify_id}', '${title}', '${status}')`;
    util.handleSql([sql, ...args]);
  }, //添加文章

  getPage(...args) {
    let sql = `SELECT DISTINCT
    page.id,
        page.content,
        page.create_time,
        page.classify_id,
        page.title,
        classify.name as 'classify_name',
        tag.name as 'tag_name',
        page.tag_id,
        page.status
    FROM
    page ,
        classify ,
        tag
    WHERE
    page.classify_id = classify.id AND
    page.tag_id = tag.id AND
    page.status = 1
    ORDER BY create_time DESC`;


    util.handleSql([sql, ...args]);
  }, //获取所有的文章

  getAllPage(...args){
    let sql = `SELECT DISTINCT
        page.id,
        page.content,
        page.create_time,
        page.classify_id,
        page.title,
        classify.name as 'classify_name',
        tag.name as 'tag_name',
        page.tag_id,
        page.status
    FROM
    page ,
    classify ,
    tag
    WHERE
    page.classify_id = classify.id AND
    page.tag_id = tag.id`;

    util.handleSql([sql, ...args]);

  },


  getPageById(...args) {

    let id = args[0].body.id,
        sql = `SELECT DISTINCT
        page.id,
        page.content,
        page.create_time,
        page.classify_id,
        page.title,
        classify.name as 'classify_name',
        tag.name as 'tag_name',
        page.tag_id,
        page.status
    FROM
    page ,
    classify ,
    tag
    WHERE
    page.classify_id = classify.id AND
    page.tag_id = tag.id AND page.id = ${id} AND status=1`;
    util.handleSql([sql, ...args]);
  }, //根据id来获取文章

  getAllPageById(...args) {

    let id = args[0].body.id,
        sql = `SELECT DISTINCT
        page.id,
        page.content,
        page.create_time,
        page.classify_id,
        page.title,
        classify.name as 'classify_name',
        tag.name as 'tag_name',
        page.tag_id,
        page.status
    FROM
    page ,
    classify ,
    tag
    WHERE
    page.classify_id = classify.id AND
    page.tag_id = tag.id AND page.id = ${id}`;
    util.handleSql([sql, ...args]);
  },

  getPageByTag(...args) {
    let tag_id = args[0].body.tag_id,
        sql = `select * from page where tag_id='${tag_id}' AND status=1`;

    util.handleSql([sql, ...args]);
  }, //根据标签来获取文章

  getPageByClassify(...args) {
    let classify_id = args[0].body.classify_id,
        sql = `select * from page where classify_id='${classify_id}' AND status=1`;

    util.handleSql([sql, ...args]);
  },  //根据分类来获取文章

  //2019-03-24 15:41:26 注意时间要是这样的格式
  getPageByTime(...args) {
    let begin = args[0].body.begin,
        end = args[0].body.end,
        sql = `SELECT * FROM page WHERE create_time > '${begin}' AND create_time < '${end}' LIMIT 0, 1000`;
    util.handleSql([sql, ...args]);
  }, //根据时间来查询

  removePage(...args) {
    let id = args[0].body.id,
        sql = `DELETE FROM page WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  }, //删除文章

  updatePage(...args) {
    let id = args[0].body.id,
        content = args[0].body.content,
        tag_id = args[0].body.tag_id,
        classify_id = args[0].body.classify_id,
        title = args[0].body.title,
        status = args[0].body.status,
        sql = `UPDATE page SET content='${content}', title='${title}', tag_id='${tag_id}', status=${status}, classify_id='${classify_id}' WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  }, //提供跟新id 和 跟新内容 （检查内容是否一致 一致就不添加） /前端检查

  switchPageStatus(...args){
    let id = args[0].body.id,
        status = args[0].body.status,
        sql = `UPDATE page SET status=${status} WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  //tag classify  id name
  addTag(...args) {
    let name = args[0].body.name,
        sql = `INSERT INTO tag (name) VALUES ('${name}')`;
    util.handleSql([sql, ...args]);
  },

  getTag(...args) {
    let sql = `select * from tag`;
    util.handleSql([sql, ...args]);
  },

  removeTag(...args) {
    let id = args[0].body.id,
        sql = `DELETE FROM tag WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  updateTag(...args) {
    let id = args[0].body.id,
        name = args[0].body.name;
    sql = `UPDATE tag SET name=${name} WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  addClassify(...args) {
    let name = args[0].body.name,
        sql = `INSERT INTO classify (name) VALUES ('${name}')`;
    util.handleSql([sql, ...args]);
  },

  getClassify(...args) {
    let sql = `select * from classify`;
    util.handleSql([sql, ...args]);
  },

  removeClassify(...args) {
    let id = args[0].body.id,
        sql = `DELETE FROM classify WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  updateClassify(...args) {
    let id = args[0].body.id,
        name = args[0].body.name;
    sql = `UPDATE classify SET name='${name}' WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },


  //message 前端设置给不给page_id 给的话那么就需要给在body中体现
  //page_id 是控制选择展示的是 留言板还是文章评论的数据。
  getMessage(...args) {

    let flag = args[0].body.page_id? 'not': '',
        sql = `select * from message where page_id is ${flag} null AND status=1 ORDER BY create_time DESC`;

    //这里也只是把所有的文章中的评论抓出来了 我们要展示的时候还需要自己判断要展示什么啊

    //需要这里做一个递归啊
    //基线条件是父id 匹配不到子选项了
    //要重新构造数组
    //要一个零食数组存 根元素
    //单根元素被找完的时候 继续去除了根元素的子元素
    //找到的就从该数组中剔除
    function foo(data, res, req) {

      //1 获取第一层根元素
      let root = [];
      if (req.body.page_id){
        data = data.filter(i => i.page_id === req.body.page_id);
      }
      data.forEach((i, index, arr) => {
        if (i.parent_id === null) {
          root.push(arr.splice(index, 1)[0]);
        }
      });

      //这边的结果在于 您需要一个能够保存的指针来构造出想要的数据结构
      function createData(data, root) {

        if (!root.length || !data.length) return;
        let temp = [];
        root.forEach(i => {
          if (!i['children']) i['children'] = [];
          let ele = [];
          data.forEach((item, index, arr) => {
            //删除data元素中的被选为根元素的元素
            if (item.parent_id === i.id) ele.push(arr.splice(index, 1)[0]);
          });
          i['children'].push(...ele);
          temp.push(...i['children']);
        });
        createData(data, temp);
      }

      createData(data, root);
      res.end(JSON.stringify(root));
    }

    util.handleSql([sql, ...args, foo]);
  },  //不在文章中的评论 page_id即为 null  返回数据应该是{ id,content,username, create_time, reply...}

  getAllMsg(...args){
    let sql = `SELECT * FROM message ORDER BY create_time DESC LIMIT 0, 1000`;
    util.handleSql([sql, ...args]);
  },

  getMsgById(...args){
    let id = args[0].body.id,
    sql = `SELECT * FROM message where id=${id} LIMIT 0, 1`;
    util.handleSql([sql, ...args]);
  },


  getMessageSize(...args) {
    let sql = `SELECT COUNT(*) FROM message WHERE status = 1`;
    util.handleSql([sql, ...args, foo]);
  }, //返回留言总数

  addMsg(...args) {
    let content = args[0].body.content, create_time = args[0].body.create_time, nickname = args[0].body.nickname,
        parent_id = args[0].body.parent_id, e_mail = args[0].body.e_mail, status = args[0].body.status, page_id = args[0].body.page_id,
        sql = `INSERT INTO message (content, create_time, nickname, parent_id, e_mail, status, page_id) VALUES ('${content}', '${create_time}', '${nickname}', ${parent_id}, '${e_mail}', ${status}, ${page_id})`;
    util.handleSql([sql, ...args]);
  },

  removeMessage(...args) {
    let id = args[0].body.id,
        sql = `DELETE FROM message WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  switchMsgStatus(...args) {
    let id = args[0].body.id,
        status = args[0].body.status,
        sql = `UPDATE message SET status=${status} WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },



  //admin
  login(...args) {
    let username = args[0].body.username,
        password = args[0].body.password,
        sql = `select * from admin where username='${username}' and password='${password}'`;

    util.handleSql([sql, ...args]);
  },

  changeSetting(...args) {
    let blobname = args[0].body.blobname,
        sign = args[0].body.sign,
        id = args[0].body.id,
        username = args[0].body.username,
        password = args[0].body.password,
        sql = `UPDATE admin SET username='${username}', password='${password}', blobname='${blobname}', sign='${sign}' WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  getUserInfo(...args){
    let sql = "select * from  admin";
    util.handleSql([sql,  ...args]);

  },

  //About
  getAbout(...args){
    let sql = "select * from about order by id desc";
    util.handleSql([sql,  ...args]);
  },

  removeAbout(...args){

    let id = args[0].body.id,
        sql = `DELETE FROM about WHERE (id=${id})`;
    util.handleSql([sql, ...args]);
  },

  addAbout(...args){
    let word = args[0].body.word,
        sql = `INSERT INTO about (word) VALUES ('${word}')`;
    util.handleSql([sql, ...args]);
  }
};