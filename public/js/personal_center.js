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
app.controller('editRecordController',['$scope','$location','userLog','$cookieStore','userService','$location','regionService',function($scope,$location,userLog,$cookieStore,userService,$location,regionService){
    $scope.cancel = function () {
        $location.path('/');
    }
    $scope.homelandArea = {
        province : '',
        city : '',
        county : ''
    };
    $scope.addressArea = {
        province : '',
        city : '',
        county : ''
    };
    $scope.aProvince = regionService.province(),
    $scope.aCity = [{id:'',name:'',key:''}],
    $scope.aCounty = [{id:'',name:'',key:''}];
    $scope.hProvince = regionService.province(),
    $scope.hCity = [{id:'',name:'',key:''}],
    $scope.hCounty = [{id:'',name:'',key:''}];
    $scope.changeProvince = function(i){
        if(i){
            $scope.homelandArea.province = $scope.Province1;
            $scope.hCity = regionService.city($scope.Province1);
        }else{
            $scope.addressArea.province = $scope.Province1;
            $scope.hCity = regionService.city($scope.Province1);
        }
    }
    $scope.changeCity = function(i){
        if(i){
            $scope.homelandArea.city = $scope.City1;
            $scope.hCounty = regionService.county($scope.Province1,$scope.City1);
        }else{
            $scope.homelandArea.city = $scope.City1;
            $scope.hCounty = regionService.county($scope.Province1,$scope.City1);
        }
    }
    $scope.changeCounty = function(i){
        if(i){
            $scope.homelandArea.county = $scope.County1;
        }else{
            $scope.homelandArea.county = $scope.County1;
        }
    }
    /*
     *id,QQ,motto,salary,orientation,interest,wishful,,homeland,address,profession,color,avatar
     * */
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
            homeland : $scope.homeland||'',
            address : $scope.address||'',
            profession : $scope.profession||'',
            color : $scope.color||'',
            avatar : $scope.avatar||''
        };
        userService.record(recordData).then(function(data){
            if(data.status === 1){
                alert('修改成功！');
                $location.path('/');
            }
        });
    }
 }]);