var express = require('express');
var router = express.Router();
var sqlHelper = require('../tools/sqlHelper');
var verifi = require('../tools/verification');
/* GET 方式获取跟人中心初始化数据. */
router.get('/', function(req, res, next) {
    var id = req.param('id'),
        type = req.param('type');
    sqlHelper.query('SELECT * FROM user as u,user_record as r where u.id = r.user_id and u.id = '+id,function(err,results,fields) {
        if (err) {
            throw err;
        }
        var result = results[0];
        if (results.length) {
            console.log(result);
            res.render('personal_center', { title:'个人中心',nickname:result.nickname,id:result.id,QQ:result.QQ,motto:result.motto,salary:result.salary,orientation:result.orientation,interest:result.interest,wishful:result.wishful,homeland:result.homeland,address:result.address,profession:result.profession,color:result.color,avatar:result.avatar});
        }else{
            sqlHelper.query('insert into user_record set user_id = '+id,function(err,results,fields){
                if (err) {
                    throw err;
                }
                if(results.affectedRows){
                    res.render('personal_center', { title: '个人中心',nickname:'', id:'',QQ:'',motto:'',salary:'',orientation:'',interest:'',wishful:'',homeland:'',address:'',profession:'',color:'',avatar:''});
                }
            });
        }
    });
});

router.post('/record', function(req, res, next) {
    var id = req.param('id'),
        QQ = req.param('QQ'),
        motto = req.param('motto'),
        salary = req.param('salary'),
        orientation = req.param('orientation'),
        interest = req.param('interest'),
        wishful = req.param('wishful'),
        homeland = req.param('homeland'),
        address = req.param('address'),
        profession =req.param('profession'),
        color = req.param('color'),
        avatar = req.param('avatar'),
        nickname = req.param('nickname');
    sqlHelper.query('update user u,user_record r set u.nickname = "'+nickname+'" and r.QQ="'+QQ+'" and r.motto="'+motto+'" and r.salary="'+salary+'" and r.orientation="'+orientation+'" and r.interest="'+interest+'" and r.wishful="'+wishful
        +'" and r.homeland="'+homeland+'" and r.address="'+address+'"  and r.profession="'+profession+'" and r.color="'+color/*+'" and r.avatar="'+avatar+'"*/+'" where u.id = r.user_id and u.id = '+id,function(err,results,fields) {
        if (err) {
            throw err;
        }
        if(results.affectedRows === 1){
            res.send(200,{
                status : 1,
                info : '修改成功'
            });
        }
     });
});
module.exports = router;
