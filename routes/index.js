var express = require('express');
var md5 = require('md5');
var router = express.Router();
var mysql = require('mysql');
var verifi = require('../tools/verification');

var client = mysql.createConnection({
    user: 'root',
    password: ''
});
client.connect();
client.query('use zzyanode');
/* GET 方式获取首页初始化. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*用户注册*/
router.post('/register', function(req, res, next) {
   var username = req.param('username'),
       password = req.param('password');
       if(verifi.username(username) && verifi.password(password)){
           client.query('SELECT * FROM user where username = "'+username+'"',function(err,results,fields){
               if(err){
                   throw err;
               }
               if(results.length){
                   res.send(200,{status : 0,msg : '用户名已经被注册'});
               }else{
                   var md5pass = md5(password);
                   client.query('INSERT INTO user SET username = "'+username+'", password = "'+md5pass+'"',function(err,results,fields){
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
    client.query('SELECT * FROM user where username = "'+username+'"and password ="'+md5pass+'"',function(err,results,fields) {
        if (err) {
            throw err;
        }
        if (results.length) {
            res.send(200, {status: 1, msg: '登录成功',id:results[0].id});
        }else{
            res.send(200,{status:0,msg:'用户名或密码错误'});
        }
    });
})
module.exports = router;
