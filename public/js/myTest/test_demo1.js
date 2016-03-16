$(function(){
    var ruo = function(){
        var nameList = {};
        return{
            setName : function(n,v){
                if(nameList[n]){
                    return nameList[n];
                }else{
                    nameList[n] = v;
                    return '添加成功';
                }
            },
            getName : function(){
                return nameList;
            },
            clearName : function(n){
                delete nameList[n];
            }
        }
    }
    ruo.prototype.changeName = function(n,v){
        if(nameList[n]){
            nameList[n] = v;
            return true;
        }else{
            return false;
        }
    }
    var zhang = ruo();
    zhang.setName('若兰','霸道');
    zhang.setName('周星星','陈老师');
    zhang.setName('小迪','霸七仔');
    zhang.setName('赌侠','赌霸');
    var du = function(){
        this.nameList = zhang.getName();
    }
    du.prototype.getList = function(){
        return this.nameList;
    }
    var r = new du();
    console.log(r.getList());
    var Dojo = function(){

    }
    Dojo.prototype.event = {};
    Dojo.prototype.addEvent = function(eventName,fn){
        if(!this.event[eventName]){
            this.event[eventName] = [];
        }
        if(typeof fn === 'function'){
            this.event[eventName].push(fn)
        }else{
            throw '事件处理必须是个函数';
        }
    }
    Dojo.prototype.trigger = function(eventName){
        var evlist = this.event[eventName];
        if(evlist){
            var len = evlist.length;
            for(var i=0;i<len;i++){
                evlist[i]();
            }
        }
    }
    var dom = new Dojo();
    dom.addEvent('change',function(){
        console.log(1);
    });
    dom.addEvent('change',function(){
        console.log(2);
    });
    dom.addEvent('change',function(){
        console.log(3);
    });
    dom.addEvent('change',function(){
        console.log(4);
    });
    dom.trigger('change');
    var str = '';
    for(var i=0;i<10;i++){
        str+='<div style="background: '+forColor()+'"></div>'
    }
    $('#body').append(str);
    /*滚动将开始的那个绝对居中隐藏*/
    $(window).on('scroll',function(){
        var wH = $(window).height(),
            sTop = $('body').scrollTop();
        if(sTop > wH){
            $('#webFill').hide();
        }else{
            $('#webFill').show();
        }
    });
});

/*随机颜色函数*/
function forColor(){
    var color_arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'],
        color = '#',
        len = color_arr.length;
    for(var i=0;i < 6;i++){
        var j = Math.floor(Math.random()*len);
        color += color_arr[j];
    }
    return color
}

/*设置数据属性*/
var obj = {};
Object.defineProperty(obj,"name",{
    Writable : false,
    value  : function(str){
        return str+'天王盖地虎';
    }
})
obj.name = '呵呵呵，我就是要改！';
var oname = obj.name('暗号')
console.log(oname);
Object.defineProperty(window,'kaka',{
   Writable : false,
   value : function(str){
       return str+'送你离开钱力之外'
   }
});

var loadIframe = null;
function createIframe(){
   var iframe = document.createElement("iframe");
    iframe.style.cssText = "display:none;width:0px;height:0px;";
    document.body.appendChild(iframe);
    loadIframe = iframe;
}
function redirect(){
    alert(111)
    loadIframe.src="TencentWeibo://xxx";
    var t = Date.now();
    setTimeout(function(){
        if(Date.now()-t < 600){
            location.href="http://t.qq.com"
        }
    },500)
}
var mobileAppInstall = (function(){
    var ua = navigator.userAgent,
        loadIframe,
        win = window;

    function getIntentIframe(){
        if(!loadIframe){
            var iframe = document.createElement("iframe");
            iframe.style.cssText = "display:none;width:0px;height:0px;";
            document.body.appendChild(iframe);
            loadIframe = iframe;
        }
        return loadIframe;
    }

    function getChromeIntent(url){
// 根据自己的产品修改吧
        return  "intent://t.qq.com/#Intent;scheme="+url+";package=com.tencent.WBlog;end";
    }
    var appInstall = {
        isChrome:ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        isAndroid:ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        timeout:500,
        /**
         * 尝试跳转appurl,如果跳转失败，进入h5url
         * @param {Object} appurl 应用地址
         * @param {Object} h5url  http地址
         */
        open:function(appurl,h5url){
            var t = Date.now();
            appInstall.openApp(appurl);
            setTimeout(function(){
                if(Date.now() - t < appInstall.timeout+100){
                    h5url && appInstall.openH5(h5url);
                }
            },appInstall.timeout)
        },
        openApp:function(appurl){
            if(appInstall.isChrome){
                if(appInstall.isAndroid){
                    win.location.href = getChromeIntent(appurl);
                }else{
                    win.location.href = appurl;
                }
            }else{
                getIntentIframe().src = appurl;
            }
        },
        openH5:function(h5url){
            win.location.href = h5url;
        }
    }

    return appInstall;
})();
createIframe();

var add = add || null,
    r = 0;
if(add){
    r = add(1,2,3,4,5,6,7,8,9);
}
console.log(r);