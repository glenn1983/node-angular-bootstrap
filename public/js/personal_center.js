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
app.controller('editRecordController',['$scope','$location','userLog',function($scope,$location,userLog){
    $scope.cancel = function () {
        $location.path('/');
    }
}]);