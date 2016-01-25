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
app.controller('loginController',['$scope','$location','$cookieStore','userLog','regService','userService',function($scope,$location,$cookieStore,userLog,regService,userService){
    var isLogin = $cookieStore.get('login'),
        username = '',
        password = '';
    $scope.background = '';
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
        userService.login(username,password).then(function(data){
            if(data.status){
                $cookieStore.put('login',userLog.thisDate());
                $cookieStore.put('id',data.id);
                $cookieStore.put('business',data.limit);
                $location.path('/');
            }else{
                alert(data.msg);
            }
        });
    }
}]);
app.controller('registerController',['$scope','$location','regService','userService','$cookieStore','userLog',function($scope,$location,regService,userService,$cookieStore,userLog){
    var isLogin = $cookieStore.get('login');
    if(isLogin === userLog.thisDate()){
        $location.path('/');
    }
    $scope.background = '';
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
                userService.reg(username,password).then(function(data){
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
app.controller('shopListController',['$scope','$location','$cookieStore','userLog','userService',function($scope,$location,$cookieStore,userLog,userService){
    var isLogin = $cookieStore.get('login'),
        userId = $cookieStore.get('id');
    $scope.background = 'conbg',
    $scope.userInfo = {};
    if(isLogin !== userLog.thisDate()){
        $location.path('/login');
    }
    userService.userInfo(userId).then(function(data){
        if(data.status){
            $scope.userInfo['id'] = data.id,
            $scope.userInfo['nickname'] = data.nickname,
            $scope.userInfo['limit'] = data.limit;
        }
    });
    $scope.exit = function(){
        $cookieStore.remove('login'),
        $cookieStore.remove('id');
        $location.path('/login');
    }
    $scope.userLink = function(i){
        return 'personal_center?id='+userId+'&type='+i;
    }
}]);
