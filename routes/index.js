var express = require('express');
var md5 = require('md5');
var router = express.Router();
var verifi = require('../tools/verification');
var sqlHelper = require('../tools/sqlHelper');
var connect = require('connect');
router.get('/con',function(req,res,next){
    var app = connect();
    console.log(app);
    res.end('123');
});
/* GET 方式获取首页初始化. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*用户注册*/
router.post('/register', function(req, res, next) {
   var username = req.param('username'),
       password = req.param('password');
       if(verifi.username(username) && verifi.password(password)){
           sqlHelper.query('SELECT * FROM user where username = "'+username+'"',function(err,results,fields){
               if(err){
                   throw err;
               }
               if(results.length){
                   res.send(200,{status : 0,msg : '用户名已经被注册'});
               }else{
                   var md5pass = md5(password);
                   sqlHelper.query('INSERT INTO user SET username = "'+username+'", password = "'+md5pass+'"',function(err,results,fields){
                       if(err){
                           throw err;
                       }
                       if(results.affectedRows){
                           res.send(200,{status : 1,msg : '注册成功',id:results.insertId});
                       }
                   });
               }
           });
       }else{
           res.send(200,{status : 0,msg:'请检查用户名密码是否格式正确'});
       }
});
router.post('/login',function(req,res,next){
    var username = req.param('username'),
        password = req.param('password'),
        md5pass = md5(password);
    sqlHelper.query('SELECT * FROM user where username = "'+username+'"and password ="'+md5pass+'"',function(err,results,fields) {
        if (err) {
            throw err;
        }
        if (results.length) {
            res.send(200, {status: 1, msg: '登录成功',id:results[0].id});
        }else{
            res.send(200,{status:0,msg:'用户名或密码错误'});
        }
    });
});
router.post('/userInfo',function(req,res,next){
    var id = req.param('id');
    typeof id === 'number'&& sqlHelper.query('SELECT * FROM user where id = '+id ,function(err,results,fields) {
        if (err) {
            throw err;
        }
        if (results.length) {
            var r = results[0];
            res.send(200, {status: 1,id:r.id,nickname: r.nickname,limit: r.limit});
        }else{
            res.send(200,{status:0,msg:'没有对应的用户'});
        }
    });
});
router.get('/goods_list',function(req,res,next){
    sqlHelper.query('select g.shop_id, s.shop_name,g.id,g.goods_name,g.price,g.old_price,g.stock,g.denomination,g.validity,g.img from goods_list as g ,shoplist as s where g.shop_id = s.id ',function(err,results,fields){
        if(err){
            res.send(200,{status:0,info:'系统错误，请稍后重试',data:[]});
        }
        if(results.length){
            res.send(200,{status : 1,info:'查询成功',data:results});
        }else{
            res.send(200,{status : 1,info:'没有数据',data:[]});
        }
    });
});
router.get('/good_info',function(req,res,next){
    var id = parseInt(req.query.id);
    if(id && typeof id === 'number'){
        sqlHelper.query('select s.shop_name,g.id,g.goods_name,g.price,g.old_price,g.stock,g.denomination,g.validity,g.img from goods_list as g ,shoplist as s where g.shop_id = s.id and g.id='+id,function(err,results,fields){
            if(err){
                res.send({status:0,info:'查询有问题'});
            }
            if(results.length){
                res.send({status:1,info:'查询成功',data:results});
            }else{
                res.send({status:0,info:'没有该商品',data:[]});
            }
        })
    }else{
        res.send({status:0,info:'Id不正确',data:[]});
    }
});
router.get('/shop_goods',function(req,res,next){
    var id = parseInt(req.query.id);
    if(id && typeof id === 'number'){
        sqlHelper.query('select s.shop_name,g.id,g.goods_name,g.price,g.old_price,g.stock,g.denomination,g.validity,g.img from goods_list as g ,shoplist as s where g.shop_id = s.id and s.id='+id,function(err,results,fields){
            if(err){
                res.send({status:0,info:'查询存在问题'});
                return
            }
            res.send({status:1,info:'查询成功',data:results});
        });
    }else{
        res.send({status:0,info:'id不正确',data:[]});
    }
});
module.exports = router;
