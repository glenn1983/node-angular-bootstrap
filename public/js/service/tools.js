app.factory('regService',function(){
    return {
        username : function(str){
            if(str){
                return /^[\w][\w\d_]{5,20}$/.test(str);
            }
        },
        password : function(str){
            if(str){
                return /^[\w\d]{5,20}$/.test(str);
            }
        }
    }
});
