const express = require('express');
let router = express.Router(),
    methods = require('../methods/httpMethods'),
    mysql = require('mysql'), //引入mysql模块,
    connect = require('../config'), //引入连接数据库配置模块
    model = mysql.createConnection(connect), //创建连接服务
   { handle_request } = require('../methods/util');


model.connect(); //正式连接

//这边拦截路由 //可以使用导入的参数进行控制数据返回
//封装了一个函数 每次当我们给出名字和模式就可以进行接口路由的设置
handle_request(router, 'getPage', 'get', methods, model);

handle_request(router, 'getAllPage', 'get', methods, model);

handle_request(router, 'getPageById', 'post', methods, model);

handle_request(router, 'getAllPageById', 'post', methods, model);

handle_request(router, 'getPageByTag', 'post', methods, model);

handle_request(router, 'getPageByClassify', 'post', methods, model);

handle_request(router, 'addPage', 'post', methods, model);

handle_request(router, 'getPageByTime', 'post', methods, model);

handle_request(router, 'removePage', 'post', methods, model);

handle_request(router, 'updatePage', 'post', methods, model);

handle_request(router, 'switchPageStatus', 'post', methods, model);



handle_request(router, 'addTag', 'post', methods, model);

handle_request(router, 'removeTag', 'post', methods, model);

handle_request(router, 'getTag', 'get', methods, model);

handle_request(router, 'updateTag', 'post', methods, model);



handle_request(router, 'addClassify', 'post', methods, model);

handle_request(router, 'removeClassify', 'post', methods, model);

handle_request(router, 'getClassify', 'get', methods, model);

handle_request(router, 'updateClassify', 'post', methods, model);



handle_request(router, 'getMessage', 'post', methods, model);

handle_request(router, 'addMsg', 'post', methods, model);

handle_request(router, 'removeMessage', 'post', methods, model);

handle_request(router, 'switchMsgStatus', 'post', methods, model);

handle_request(router, 'getAllMsg', 'get', methods, model);

handle_request(router, 'getMsgById', 'post', methods, model);




handle_request(router, 'login', 'post', methods, model);

handle_request(router, 'changeSetting', 'post', methods, model);

handle_request(router, 'getUserInfo', 'get', methods, model);

handle_request(router, 'getAbout', 'get', methods, model);

handle_request(router, 'removeAbout', 'post', methods, model);

handle_request(router, 'addAbout', 'post', methods, model);


module.exports =  router;