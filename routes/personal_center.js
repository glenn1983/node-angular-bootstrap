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
module.exports = router;
