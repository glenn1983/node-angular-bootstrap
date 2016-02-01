var express = require('express');
var router = express.Router();
var sqlHelper = require('../../tools/sqlHelper');
router.get('/goods_list',function(req,res,next){
    var id = req.query.id;
    sqlHelper.query('select * from goods_list where shop_id = '+id,function(err,results,fields){
        if(err){
            res.jsonp({status:0,info:'系统出现问题，请稍后重试'});
            return;
        }
        if(results.length){
           // res.jsonp({status:1,info:'查找成功',data:results});
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({"data":results}));
            res.end();
        }else{
            res.jsonp({status:0,info:'没有商品'});
        }
    });
});
module.exports = router;
