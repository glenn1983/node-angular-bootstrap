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
module.exports = verification;