var express = require('express');
var router = express.Router();
var verification = {};
verification.username = function(str){
    if(typeof str === 'string'){
       return /^[\w][\w\d_]{5,20}$/.test(str);
    }else{
        return false;
    }
}

verification.password = function(str){
    if(str){
        return /^[\w\d]{5,20}$/.test(str);
    }else{
        return false;
    }
}
verification.hasLogin = function (req,res) {
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });
    if(!Cookies.login&&!Cookies.id){
        return res.redirect("/#/login");
    }
    return;
}
module.exports = verification;