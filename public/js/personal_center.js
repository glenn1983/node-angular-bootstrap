app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/edit',{
        templateUrl: 'template/editRecord.html',
        controller: 'editRecordController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
app.factory('dataService',function(){
    return {
        dataList : {}
    }
});
app.controller('personalController',['$scope','$location','$cookieStore','userLog','$window','userService','dataService',function($scope,$location,$cookieStore,userLog,$window,userService,dataService){
    var isLogin = $cookieStore.get('login');
    $scope.background = '';
    if(isLogin !== userLog.thisDate()){
        var host = $location.host(),
            port = $location.port(),
            url = 'http://'+host+':'+port;
        $window.location.href = url;
    }
    $scope.editUser = function () {
        userService.recordList({'id':$cookieStore.get('id')}).then(function(data){
            if(data.status){
                dataService.dataList= data.data;
                $location.path('/edit');
            }
        });
    }
}]);
app.controller('editRecordController',['$scope','$location','userLog','$cookieStore','userService','$window','dataService',function($scope,$location,userLog,$cookieStore,userService,$window,dataService){
    $scope.cancel = function () {
        $location.path('/');
    }
    /*
     *id,QQ,motto,salary,orientation,interest,wishful,,homeland,address,profession,color,avatar
     * */
    var dataList = dataService.dataList;
    if(dataList.homeland){
        $scope.nickname = dataList.nickname,
        $scope.QQ = dataList.QQ,
        $scope.motto = dataList.motto,
        $scope.salary = dataList.salary,
        $scope.orientation = dataList.orientation,
        $scope.interest = dataList.interest,
        $scope.wishful = dataList.wishful,
        $scope.homeland = dataList.homeland,
        $scope.address = dataList.address,
        $scope.profession = dataList.profession,
        $scope.color = dataList.color,
        $scope.avatar = dataList.avatar;
        $scope.hRegion = dataList.homeland || '{"p":"","c":"","n":"","pn":"","cn":"","nn":""}';
        $scope.aRegion = dataList.address || '{"p":"","c":"","n":"","pn":"","cn":"","nn":""}';
    }else{
        $location.path('/');
    }
    var recordData= {
        id : $cookieStore.get('id'),
       nickname:$scope.nickname||'',
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
        recordData= {
            id : $cookieStore.get('id'),
            nickname:$scope.nickname||'',
            QQ : $scope.QQ||'',
            motto : $scope.motto||'',
            salary : $scope.salary||'',
            orientation : $scope.orientation||'',
            interest : $scope.interest||'',
            wishful : $scope.wishful||'',
            homeland : $scope.hRegion||'',
            address : $scope.aRegion||'',
            profession : $scope.profession||'',
            color : $scope.color||'',
            avatar : $scope.avatar||''
        };
        userService.record(recordData).then(function(data){
            if(data.status === 1){
                alert('修改成功！');
                $location.path('/');
                $window.location.reload('/');
            }
        });
    }
 }]);