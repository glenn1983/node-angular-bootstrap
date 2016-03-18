var zQuery = function(selector,context){
    return new zQuery.prototype.init();
},
$ = zQuery;
zQuery.prototype = {
    init : function(){
        return this;
    },
    version : '0.0.1',
    author : '周正义'
};
zQuery.fn = zQuery.prototype;
zQuery.fn.init.prototype = zQuery.fn;

function aa(){
    return this;
}
aa.prototype.name = '摩卡';
var b = new aa();

