function add(){
    var result = 0,
    len = arguments.length;
    if(arguments.length){
        for(var i=0;i<len;i++){
            result += arguments[i];
        }
    }
    return result;
}
function range(a,t){
    if(a instanceof Array){
        switch (t){
           case 'bubble' :
               a = bubble_sort(a)
               break;
            case 'quik' :
                a = quik_sort(a);
                break;
            default :
               a = bubble_sort(a)
                break;
        }
    }
    return a.toString();
}
function bubble_sort(a){
    //返回从大到小的排序
    var len = a.length;
    for(var i=0;i<len;i++){
        for(var j=0;j<len;j++){
            if(a[i] > a[j] ){
                var temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
    return a;
}
function quik_sort(arr){
    //返回大小排序
    if(arr.length <=1){
        return arr;
    }
    var privotIndex = Math.floor(arr.length/2);
    var pivot = arr.splice(privotIndex,1)[0];
    var left = [];
    var right = [];
    for(var i=0;i<arr.length;i++){
        if(arr[i] > pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quik_sort(left).concat([pivot],quik_sort(right));
}
function name(t){
    if(t){
        return 'mocha';
    }else{
        return '摩卡';
    }
}
!function(){
    function aObjec(name){
        this.name = name;
    }
    function bObject(){

    }
    bObject.prototype = new aObjec('摩卡');
    bObject.prototype.constructor = bObject;
    var b = new bObject();
    console.log(b.name);
}();
var referrer = document.referrer;
if(referrer && document.referrer.search('http://localhost:3000') !== 0){
    console.log('是从非站内网页跳转过来的');
}
/*for(var i =0;i<100000;i++){
    //块级作用域，防止内存占用
    !function(){
        function bibao(){
            var moka = 111;
            return function(){
                return moka;
            }
        }
        console.log(bibao()());
    }()
}*/
var module = module || {};
module &&( module.exports = {
    'add' : add,
    'rang' : range,
    'name' : name
});
