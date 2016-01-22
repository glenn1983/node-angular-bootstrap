app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'template/businessInfo.html',
        controller: 'businessController'
    })
    .when('/create',{
            templateUrl: 'template/createBusiness.html',
            controller: 'createController'
        })
    .otherwise({
        redirectTo: '/'
    });
}]);
app.directive('regRule', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            var reg = new RegExp(attrs.regRule);
            ngModel.$parsers.push(function(val) {
                if (!val || val.length === 0) {
                    return;
                }
                if(reg.test(val)){
                    ngModel.$setValidity('checkingAvailability', true);
                }else{
                    ngModel .$setValidity('checkingAvailability', false);
                }
                return val;
            })
        }
    }
});
app.controller('createController',['$scope','$location','$cookieStore','userLog','userService',function($scope,$location,$cookieStore,userLog,userService){
    var userId = $cookieStore.get('id');
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
                        $location.path('/');
                    }
                });
            }
        }
    }
}]);
app.controller('businessController',['$scope','$location','$cookieStore','userLog','userService',function($scope,$location,$cookieStore,userLog,userService){
    var isLogin = $cookieStore.get('login'),
        userId = $cookieStore.get('id'),
        busy = $cookieStore.get('business');
    if(!busy){
        $location.path('/create');
    }

}]);

