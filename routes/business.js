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
           sqlHelper.query('update user as u set u.limit = 1 where u.id='+id,function(err,result,fields){
                if(err){
                    res.send({status:0,info:'操作数据库失败，请稍后重试！'});
                    return
                }
               if(results.affectedRows){
                   sqlHelper.query('select * from shoplist as s where s.user_id = '+id,function(err,results,fields){
                       if(err){
                           res.send({status : 0,info:'创建存在问题，请稍后'});
                       }
                       if(results.length){
                           res.send({status:1,info:'创建成功',data:results});
                       }else{
                           res.send({status:0,info:'创建未成功'});
                       }
                   });
               }
           });
        }else{
            res.send({status:0,info:'创建失败'});
        }
    });
});
router.post('/shopInfo',function(req,res,next){
   var id = req.param('id');
   sqlHelper.query('select s.id, s.user_id,s.shop_name,s.shop_type from user as u,shoplist as s where u.id = s.user_id and u.id = '+id,function(err,results,fields){
        if(err){
            res.send({status:0,info:'系统出现问题，请稍后重试'});
            return;
        }
       if(results.length){
           var result = results[0];
           res.send({status:1,info:'查找成功',data:result});
       }else{
           res.send({status:0,info:'没有该店铺'});
       }
   });
});
router.post('/addGoods',function(req,res,next){
    var id = req.body.id,
        name = req.body.name,
        price = req.body.price,
        old_price = req.body.old_price,
        stock = req.body.stock,
        denomination = req.body.denomination,
        validity = req.body.validity,
        img = req.body.img,
        shop_id = req.body.shop_id;
    if(id&&name&&price&&old_price&&stock&&denomination&&denomination.length&&validity&&validity.length){
        sqlHelper.query('select id from shoplist where id = '+shop_id,function(err,results,fields){
            if(err){
                res.send({status:0,info:'系统出现问题，请稍后重试'});
                return;
            }
            if(results.length){
                sqlHelper.query('insert into goods_list set shop_id ='+shop_id+',goods_name="'+name+'",price='+price+',old_price='+old_price+',stock='+stock+',denomination="'+denomination.toString()+'",validity="'+validity.toString()+'",img="'+img+'"',function(err,results,fields){
                    if(err){
                        res.send({status:0,info:'系统出现问题，请稍后重试'});
                        return;
                    }
                    if(results.affectedRows){
                        res.send({status:1,info:'添加成功'});
                    }
                });
            }else{
                res.send({status:0,info:'店铺ID不正确！'});
            }
        });
    }else{
        res.send({status:0,info:'添加商品失败，请稍后重试！'});
    }
});
router.post('/goods_list',function(req,res,next){
    var id = req.body.id;
    sqlHelper.query('select * from goods_list where shop_id = '+id,function(err,results,fields){
        if(err){
            res.send({status:0,info:'系统出现问题，请稍后重试'});
            return;
        }
        if(results.length){
            res.send({status:1,info:'查找成功',data:results});
        }else{
            res.send({status:0,info:'没有商品'});
        }
    });
});
module.exports = router;
