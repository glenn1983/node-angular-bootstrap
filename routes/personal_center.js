var express = require('express');
var router = express.Router();
var sqlHelper = require('../tools/sqlHelper');
var verifi = require('../tools/verification');
/* GET 方式获取跟人中心、商家、用户管理的初始化数据. */
router.get('/', function(req, res, next) {
    var id = req.query.id,
        type = req.query.type;
        verifi.hasLogin(req,res);
        switch (type){
            case "1":
                myInfo(id,res);
                break;
            case  "2":
                business(id,res);
                break;
            default: myInfo(id,res);
        }
});

//个人信息初始化
function myInfo(id,res){
     sqlHelper.query('SELECT * FROM user as u,user_record as r where u.id = r.user_id and u.id = '+id,function(err,results,fields) {
        if (err) {
            throw err;
        }
        var result = results[0];
        if (results.length) {
            var homeland = JSON.parse(result.homeland),
                address = JSON.parse(result.address);
            var  region1 = '',
                region2 = '';
            if(homeland){
                region1 = homeland.pn+'-'+homeland.cn+'-'+homeland.nn,
                region2 = address.pn+'-'+address.cn+'-'+address.nn;
            }
            res.render('personal_center', { title:'个人中心',nickname:result.nickname,id:result.id,QQ:result.QQ,motto:result.motto,salary:result.salary,orientation:result.orientation,interest:result.interest,wishful:result.wishful,homeland:region1,address:region2,profession:result.profession,color:result.color,avatar:result.avatar});
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
}

//商家信息展示，及编辑
function business(id,res){
    var id = id;
   sqlHelper.query('SELECT * FROM user as u where u.id = '+id,function(err,results,fields) {
        if (err) {
            throw err;
        }
        var result = results[0],
            this_business = 0;
        if (results.length) {
            if(result.limit >= 1){
                this_business = result.limit?result.limit:0;
                sqlHelper.query('select id, user_id,shop_name,shop_type from shoplist where user_id = '+id,function(err,results,fields){
                    if(err){
                        res.render('business', { title:'商家中心'});
                        return;
                    }
                    if(results.length){
                        var result = results[0];
                        res.setHeader("Set-Cookie", ['business='+this_business,'shop_id='+result.id,'shop_type='+result.shop_type,'shop_name='+encodeURI(result.shop_name)]);
                        res.render('business', { title:'商家中心',shop_name:result.shop_name});
                    }else{
                        res.render('business', { title:'商家中心',shop_name:''});
                    }
                });
            }else{
                res.render('business', { title:'商家中心',shop_name:''});
            }
        }else{
            res.render('business', { title:'商家中心',shop_name:''});
        }
    });
}
//编辑时请求数据

router.get('/get_record', function(req, res, next) {
    var id = req.query.id
    if(id) {
        sqlHelper.query('SELECT * FROM user as u,user_record as r where u.id = r.user_id and u.id = ' + id, function (err, results, fields) {
            if (err) {
                throw err;
            }
            if (results.length) {
                var result = results[0];
                var homeland = JSON.parse(result.homeland),
                    address = JSON.parse(result.address);
                var region1 = '',
                    region2 = '';
                if(homeland){
                    region1 = homeland.pn + '-' + homeland.cn + '-' + homeland.nn,
                    region2 = address.pn + '-' + address.cn + '-' + address.nn;
                }
                res.send(200, {
                    status: 1,
                    info: '查询成功',
                    data: { title: '个人中心', nickname: result.nickname, id: result.id, QQ: result.QQ, motto: result.motto, salary: result.salary, orientation: result.orientation, interest: result.interest, wishful: result.wishful, homeland: result.homeland, address: result.address, profession: result.profession, color: result.color, avatar: result.avatar}
                });
            }
        });
    }else{
        res.send(200, {
            status: 0,
            info: '未获取到id',
            data: { title: '个人中心',nickname:'', id:'',QQ:'',motto:'',salary:'',orientation:'',interest:'',wishful:'',homeland:'',address:'',profession:'',color:'',avatar:''}
        });
    }
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
    sqlHelper.query('update user u INNER JOIN user_record r ON u.id = r.user_id set u.nickname = "'+nickname+'", r.QQ="'+QQ+'", r.motto="'+motto+'", r.salary="'+salary+'", r.orientation="'+orientation+'", r.interest="'+interest+'", r.wishful="'+wishful
        +'", r.homeland=\''+homeland+'\', r.address=\''+address+'\', r.profession="'+profession+'", r.color="'+color+'", r.avatar="'+avatar+'" where u.id = '+id,function(err,results,fields) {
        if (err) {
            throw err;
        }
        if(results.affectedRows){
            res.send(200,{
                status : 1,
                info : '修改成功'
            });
        }
     });
});
module.exports = router;
