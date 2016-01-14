app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',{
            templateUrl: 'template/index.html',
            controller: 'shopListController'
        })
        .when('/login', {
            templateUrl: 'template/index_login.html',
            controller: 'loginController'
        })
        .when('/register',{
            templateUrl: 'template/index_register.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
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
app.factory('userLog',function(){
    function thisDate(){
        var d = new Date(),
            time = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate();
            return time;
    }
    return {
        thisDate : thisDate
    };
});
app.factory('userInfo',['$q','$http',function($q,$http){
    function reg(user,pass){
        var $d = $q.defer();
        $http.post('/register',{username:user,password : pass}).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    function login(user,pass){
        var $d = $q.defer();
        $http.post('/login',{username:user,password : pass}).success(function(data,status){
            $d.resolve(data);
        }).error(function(data,status){
            $d.reject(data);
        });
        return $d.promise;
    }
    return {
        'reg' : reg,
        'login' : login
    }
}]);
app.controller('loginController',['$scope','$location','$cookieStore','userLog','regService','userInfo',function($scope,$location,$cookieStore,userLog,regService,userInfo){
    var isLogin = $cookieStore.get('login'),
        username = '',
        password = '';
    if(isLogin === userLog.thisDate()){
        $location.path('/');
    }
    $scope.changeTemplate = function(i){
        if(!i){
            $location.path('/login');
        }else{
            $location.path('/register');
        }
    };
    $scope.login = function(){
        username = $scope.username,
        password = $scope.password;
        userInfo.login(username,password).then(function(data){
            if(data.status){
                $cookieStore.put('login',userLog.thisDate());
                $cookieStore.put('id',data.id);
                $location.path('/');
            }else{
                alert(data.msg);
            }
        });
    }
}]);
app.controller('registerController',['$scope','$location','regService','userInfo','$cookieStore','userLog',function($scope,$location,regService,userInfo,$cookieStore,userLog){
    var isLogin = $cookieStore.get('login');
    if(isLogin === userLog.thisDate()){
        $location.path('/');
    }
    $scope.changeTemplate = function(i){
        if(!i){
            $location.path('/login');
        }else{
            $location.path('/register');
        }
    };
    $scope.username = '',
    $scope.password = '',
    $scope.repassword = '';
    $scope.register = function(){
        if($scope.username && $scope.password && $scope.repassword){
            var username = $scope.username,
                password = $scope.password,
                repassword = $scope.repassword;
            if(password && repassword){
                if(!regService.username(username)){
                    alert('用户名格式不正确');
                    return
                }
                if(!regService.password(password)){
                    alert('密码格式不正确');
                    return
                }
                userInfo.reg(username,password).then(function(data){
                   if(data.status){
                       alert('注册成功');
                       $cookieStore.put('login',userLog.thisDate());
                       $cookieStore.put('id',data.id);
                       $location.path('/');
                   }else{
                       alert(data.msg);
                   }
                });
            }else{
                alert('两次输入密码不一致！');
            }

        }else{
            alert('请填写完整');
        }
    }
}]);
app.controller('shopListController',['$scope','$location','$cookieStore','userLog',function($scope,$location,$cookieStore,userLog){
    var isLogin = $cookieStore.get('login');
    if(isLogin !== userLog.thisDate()){
        $location.path('/login');
    }
}]);
