/*app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'template/editRecord.html',
        controller: 'businessController'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);*/
app.controller('businessController',['$scope','$location','$cookieStore','userLog','userService',function($scope,$location,$cookieStore,userLog,userService){
    var isLogin = $cookieStore.get('login'),
        userId = $cookieStore.get('id');
    if(isLogin !== userLog.thisDate()){
        $location.path('/login');
    }
    $cookieStore.remove('login');
}]);

