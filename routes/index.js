var express = require('express');
var md5 = require('md5');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*用户注册*/
router.post('/register', function(req, res, next) {
   var username = req.param('username'),
       password = req.param('password');
       res.send(200,{status : 1});
});
module.exports = router;
