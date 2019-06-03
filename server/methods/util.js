module.exports = {

  //解构拿到所有的参数
  handleSql([sql, req, res, model, callback = null]){
      model.query(sql, (err, result)=>{
        if (err) { console.log(err);res.end(JSON.stringify(err)) }else{
          res.setHeader('Content-Type','text/plain;charset=utf-8');
          if (!callback){
            res.end(JSON.stringify(result));
          } else{
            callback(result, res, req);
          }
        }
      })
  },


  handle_request(router, name, model, methods, connect){
    router[model]('/' + name, function(req, res){
      methods[name](req,  res, connect);
    });
  }


};
