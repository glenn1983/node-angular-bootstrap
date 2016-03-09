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
});