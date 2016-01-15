app.controller('personalController',['$scope','$location','$cookieStore','userLog',,function($scope,$location,$cookieStore,userLog){
    var isLogin = $cookieStore.get('login');
    $scope.background = '';
    if(isLogin === userLog.thisDate()){
        $location.path('/');
    }
}]);