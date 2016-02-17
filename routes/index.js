var express = require('express');
var md5 = require('md5');
var router = express.Router();
var verifi = require('../tools/verification');
var sqlHelper = require('../tools/sqlHelper');
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
    sqlHelper.query('select s.shop_name,g.id,g.goods_name,g.price,g.old_price,g.stock,g.denomination,g.validity,g.img from goods_list as g ,shoplist as s where g.shop_id = s.id ',function(err,results,fields){
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
module.exports = router;
