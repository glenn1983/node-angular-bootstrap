var express = require('express');
var router = express.Router();
var sqlHelper = require('../tools/sqlHelper');
var verifi = require('../tools/verification');
/* GET 方式获取跟人中心、商家、用户管理的初始化数据. */
router.post('/create', function(req, res, next) {
    var id = req.param('id'),
        type = req.param('type'),
        name = req.param('name');
    verifi.hasLogin(req,res);
    sqlHelper.query('insert into shoplist set user_id='+id+',shop_type="'+type+'",shop_name="'+name+'"',function(err,results,fields){
        if (err) {
            throw err;
        }
        if(results.affectedRows){
           res.send({status:1,info:'创建成功'});
        }else{
            res.send({status:0,info:'创建失败'});
        }
    });
});
router.post('/shopInfo',function(req,res,next){
   var id = req.param('id');
   sqlHelper.query('select id, user_id,shop_name,shop_type from user as u,shoplist as s where u.id = s.user_id and u.id = '+id,function(err,results,fields){
        if(err){
            res.send({status:0,info:'系统出现问题，请稍后重试'});
        }
       if(results.length){
           var result = results[0];
           res.send({status:1,info:'查找成功',data:result});
       }else{
           res.send({status:0,info:'没有该店铺'});
       }
   });
});
module.exports = router;
