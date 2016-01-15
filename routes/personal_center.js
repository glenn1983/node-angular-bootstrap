var express = require('express');
var md5 = require('md5');
var router = express.Router();
var sqlHelper = require('../tools/sqlHelper');
var verifi = require('../tools/verification');
/* GET 方式获取跟人中心初始化数据. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
