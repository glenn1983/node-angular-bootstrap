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
        .when('/good_info/:id',{
            templateUrl : 'template/good_info.html',
            controller : 'good_info'
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
    $scope.key_login = function(e){
        var code = e.charCode;
        if(code === 13){
            $scope.login();
        }
    }
    $scope.login = function(){
        username = $scope.username,
        password = $scope.password;
        userService.login(username,password).then(function(data){
            if(data.status){
                $cookieStore.put('login',userLog.thisDate());
                $cookieStore.put('id',data.id);
                $cookieStore.put('business',data.limit||0);
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
        $cookieStore.remove('id'),
        $cookieStore.remove('shop_name'),
        $cookieStore.remove('shop_type'),
        $cookieStore.remove('business'),
        $cookieStore.remove('shop_id');
        $location.path('/login');
    }
    $scope.userLink = function(i){
        return 'personal_center?id='+userId+'&type='+i;
    }
    var img_logo = document.querySelector('img.img-circle'),
        dom_img = angular.element(img_logo);//先引入jquery 使用angular.element 就可以像使用$一样了
    userService.sendInfo('/goods_list').then(function(e){
        if(e.status){
            $scope.goods_list = e.data;
        }
    });
    $scope.good_info = function(id){
        if(id && angular.isNumber(id)){
            $location.path('/good_info/:'+id);
        }else{
            toastr.info('商品存在问题，请选择其他商品');
        }
    }
}]);
app.controller('good_info',['$scope','$location','userService','$routeParams',function($scope,$location,userService,$routeParams){
    var param = $routeParams,
        id = param.id.slice(1,2);
    userService.sendInfo('/good_info?id='+id).then(function(e){
        if(e.status){
            var data = e.data[0];
            $scope.denomination = data.denomination.split(','),
            $scope.goods_name = data.goods_name,
            $scope.id = data.id,
            $scope.img =  data.img,
            $scope.old_price =  data.old_price,
            $scope.price = data.price,
            $scope.shop_name = data.shop_name,
            $scope.stock =  data.stock,
            $scope.validity =  data.validity.split(',');
        }else{
            toastr.error(e.info);
        }
    })
}]);
