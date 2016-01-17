app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/edit',{
        templateUrl: 'template/editRecord.html',
        controller: 'editRecordController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
app.controller('personalController',['$scope','$location','$cookieStore','userLog','$window',function($scope,$location,$cookieStore,userLog,$window){
    var isLogin = $cookieStore.get('login');
    $scope.background = '';
    if(isLogin !== userLog.thisDate()){
        var host = $location.host(),
            port = $location.port(),
            url = 'http://'+host+':'+port;
        $window.location.href = url;
    }
    $scope.editUser = function () {
        $location.path('/edit');
    }
}]);
app.controller('editRecordController',['$scope','$location','userLog','$cookieStore','userService','$window',function($scope,$location,userLog,$cookieStore,userService,$window){
    $scope.cancel = function () {
        $location.path('/');
    }
    /*
    *id,QQ,motto,salary,orientation,interest,wishful,,homeland,address,profession,color,avatar
    * */
   var data = {
        id : $cookieStore.get('id'),
       nickname:$scope.nickname,
        QQ : $scope.QQ||'',
        motto : $scope.motto||'',
        salary : $scope.salary||'',
        orientation : $scope.orientation||'',
        interest : $scope.interest||'',
        wishful : $scope.wishful||'',
        homeland : $scope.homeland||'',
        address : $scope.address||'',
        profession : $scope.profession||'',
        color : $scope.color||'',
        avatar : $scope.avatar||''
    };
    $scope.save = function () {
        userService.record(data).then(function(data){
            if(data.status === 1){
                alert('修改成功！');
                $window.location.reload('/');
            }
        });
    }
 }]);