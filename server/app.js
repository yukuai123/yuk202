const express = require('express');
const app = express();

//这边开启服务
const bodyParser = require('body-parser');


app.all("*",function(req,res,next){
  //多个跨域请求可以这样写
  // req.headers.origin.toLowerCase() == "http://www.zhangpeiyue.com"
  // || req.headers.origin.toLowerCase() =="http://127.0.0.1"

  if(req.headers.origin.toLowerCase() === "http://127.0.0.1:8080"
      || req.headers.origin.toLowerCase() === "http://127.0.0.1:8081"
      || req.headers.origin.toLowerCase() === "http://localhost"

  ) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    console.log('接收跨域')
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//引入模板
const router = require('./router/router.js');

app.listen(3000, function(){
  console.log('server running....');
});


app.use(router);
app.use('/node_modules/',express.static('./node_modules/'));