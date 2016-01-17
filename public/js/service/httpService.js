app.factory('userService',['$q','$http',function($q,$http){
    function reg(user,pass){/*注册*/
        var $d = $q.defer();
        $http.post('/register',{username:user,password : pass}).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    function login(user,pass){/*登录*/
        var $d = $q.defer();
        $http.post('/login',{username:user,password : pass}).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    function userInfo(id){/*获取用户信息*/
        var $d = $q.defer();
        $http.post('/userInfo',{id:id}).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    function record(data){/*资料编辑*/
        var $d = $q.defer();
        $http.post('/personal_center/record',data).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    return {
        'reg' : reg,
        'login' : login,
        'userInfo' : userInfo,
        'record': record
    }
}]);
