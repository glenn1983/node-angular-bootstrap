var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
fs = require('fs'),
AVATAR_UPLOAD_FOLDER = '/img/upimg/';
/*图片上传地址*/
router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = '../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.render('images', { status : 0,info : '上传失败',url:''});
            return;
        }
        var extName = '';  //后缀名
        switch (files.file.type) {
            case "image/gif":
                extName = 'gif';
                break;
            case "image/jpeg":
                extName = 'jpg';
                break;
            case "image/png":
                extName = 'png';
                break;
            case "image/x-png":
                extName = 'png';
                break;
        }
        if(extName.length == 0){
            res.render('images', { status : 0,info : '只支持png和jpg格式图片',url:''});
            return;
        }
        var avatarName = Math.random() + "." + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath);  //重命名
        res.render('images',{status: 1,info: '上传成功',url : newPath.split('public/')[1]});
    });
});
module.exports = router;