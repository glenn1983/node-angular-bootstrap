var express = require('express');
var router = express.Router();
var sqlHelper = require('../../tools/sqlHelper');
//设置跨域访问
/*express.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/
router.get('/goods_list_jsonp',function(req,res,next){
    var id = req.query.id;
    sqlHelper.query('select * from goods_list where shop_id = '+id,function(err,results,fields){
        if(err){
            res.jsonp(JSON.stringify({status:0,info:'系统出现问题，请稍后重试'}));
            return;
        }
        if(results.length){
            res.jsonp(JSON.stringify({"status" : 1,"info":"查找成功","data":results}));
        }else{
            res.jsonp(JSON.stringify({status:0,info:'没有商品'}));
        }
    });
});

router.post('/goods_list_allow',function(req,res,next){
    var id = req.body.id;
    sqlHelper.query('select * from goods_list where shop_id = '+id,function(err,results,fields){
        res.header("Access-Control-Allow-Origin", "http://dev.kuayu.com");//设置跨域访问
        if(err){
            res.send({status:0,info:'系统出现问题，请稍后重试'});
            return;
        }
        if(results.length){
            res.send({"status" : 1,"info":"查找成功","data":results});
        }else{
            res.send({status:0,info:'没有商品'});
        }
    });
});

module.exports = router;
