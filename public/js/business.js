app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'template/businessInfo.html',
        controller: 'businessController'
    })
    .when('/create',{
            templateUrl: 'template/createBusiness.html',
            controller: 'createController'
        })
    .when('/list',{
        templateUrl : 'template/goods_list.html',
        controller : 'goods_listController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
app.factory('userName',['$cookieStore','userLog',function($cookieStore,userLog){
    var userId = $cookieStore.get('id'),
        login = $cookieStore.get('login'),
        isLogin = (new Date().getTime()) - (new Date(login).getTime()) < 8.64e8;
    return {
        shop_name:'',
        shop_type : $cookieStore.get('shop_type'),
        shop_id : $cookieStore.get('shop_id'),
        userId : userId,
        isLogin : isLogin
    }
}]);
app.controller('createController',['$scope','$location','$cookieStore','userLog','userService','userName',function($scope,$location,$cookieStore,userLog,userService,userName){
    var userId = userName.userId;
    $scope.shop_name = '',
    $scope.typeList = [
        {id:1,name:'男装'},
        {id:2,name:'女装'},
        {id:3,name:'家居'},
        {id:4,name:'母婴'},
        {id:5,name:'美妆'},
        {id:6,name:'鞋包'},
        {id:7,name:'珠宝'},
        {id:8,name:'食品'},
        {id:9,name:'户外'},
        {id:10,name:'游戏'},
        {id:11,name:'学习'}
    ],
    $scope.save = function () {
        if(userId && typeof userId === 'number'){
            var data = {
              id : userId,
              name : $scope.shop_name,
              type : $scope.shop_type
            };
            if(data.name&&data.type){
                userService.sendInfo('/business/create',data).then(function(e){
                    if(e.status === 1){
                        $cookieStore.put('business',1);
                        userName.shop_name = $scope.shop_name,
                        userName.shop_type = $scope.shop_type;
                        $location.path('/');
                    }
                });
            }
        }
    }
}]);
app.controller('businessController',['$scope','$location','$cookieStore','userLog','userService','userName',function($scope,$location,$cookieStore,userLog,userService,userName){
    var isLogin = userName.isLogin,
        userId = userName.userId;
    $scope.shop_name = userName.shop_name,
    $scope.shop_type = userName.shop_type,
    $scope.typeList = [
        {id:1,name:'男装'},
        {id:2,name:'女装'},
        {id:3,name:'家居'},
        {id:4,name:'母婴'},
        {id:5,name:'美妆'},
        {id:6,name:'鞋包'},
        {id:7,name:'珠宝'},
        {id:8,name:'食品'},
        {id:9,name:'户外'},
        {id:10,name:'游戏'},
        {id:11,name:'学习'}
    ],
    $scope.shop_id = userName.shop_id,
    $scope.goods_name = '',
    $scope.price = '',
    $scope.old_price = '',
    $scope.stock = '',
    $scope.img = '',
    $scope.dirty = !1,
    $scope.denomination = [],
    $scope.validity = [],
    $scope.noupload = !1,
    $scope.goods_list = function(){
        $location.path('/list');
    };
    var denomination = [],
    validity = [];
    angular.forEach($scope.typeList, function (value, i) {
        if (value.id == $scope.shop_type) {
            $scope.shop_type = value.name
        }
    });
    $scope.funny = function(n){
        denomination = $scope.denomination;
        var index = -1;
        angular.forEach(denomination,function(value,i){
            if(value === n){
                index = i;
            }
        });
        if(index>-1){
            denomination.splice(index,1);
        }else{
            denomination.push(n);
        }
    },
    $scope.life = function(n){
        validity = $scope.validity;
        var index = -1;
        angular.forEach(validity,function(value,i){
            if(value === n){
                index = i;
            }
        });
        if(index>-1){
            validity.splice(index,1);
        }else{
            validity.push(n);
        }
    };
    $scope.save = function(){
        $scope.dirty = !0;
        $scope.noupload = $scope.img === 'img/img.png';
        if($scope.goods_name && $scope.price && $scope.old_price && $scope.stock && $scope.img && $scope.validity.length && $scope.denomination.length){
            userService.sendInfo('business/addGoods',{
                id : $scope.shop_id,
                name : $scope.goods_name,
                price : $scope.price,
                old_price : $scope.old_price,
                stock : $scope.stock,
                img : $scope.img,
                denomination : $scope.denomination,
                validity : $scope.validity
            }).then(function(e){
                if(e.status){
                    toastr.success(e.info);
                    $scope.goods_name ='',
                    $scope.price = '',
                    $scope.old_price = '',
                    $scope.stock = '',
                    $scope.img = 'img/img.png',
                    $scope.denomination = [],
                    $scope.validity = [],
                    $scope.dirty = !1;
                    $location.path('/list');
                }
            });
        }
    };
}]);
app.controller('goods_listController',['userService','$scope','$location','userName',function(userService,$scope,$location,userName){
    var shop_id = userName.shop_id,
        goods_list = [];
    $scope.add_goods = function(){
        $location.path('/');
    }
    userService.sendInfo('/business/goods_list',{id:shop_id}).then(function(data){
        if(data.status){
            $scope.goods_list = data.data;
        }else{
            toastr.error(data.info);
        }
    });
}]);