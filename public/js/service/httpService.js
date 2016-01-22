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
    function recordList(data) {/*获取个人资料列表*/
        var $d = $q.defer();
        $http.get('/personal_center/get_record?id='+data.id).success(function(data,status){
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

    function sendInfo(url,data){//一次封装，终身受益
        var $d = $q.defer();
        if(data){
            $http.post(url,data).success(function(data,status){
                $d.resolve(data);
            }).error(function(data,status){
                $d.reject(data);
            });
            return $d.promise;
        }else{
            $http.get(url).success(function(data,status){
                $d.resolve(data);
            }).error(function(data,status){
                $d.reject(data);
            });
            return $d.promise;
        }
    }

    return {
        'reg' : reg,
        'login' : login,
        'userInfo' : userInfo,
        'recordList' : recordList,
        'record': record,
        'sendInfo' :sendInfo
    }
}]);
