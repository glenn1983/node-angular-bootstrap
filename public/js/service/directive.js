app.directive('imgDirective',function(){
    return {
        restrict : 'A',
        replace : true,
        scope : {
            img : '='
        },
        template : '<div style="width: 100px;"><img ng-src="{{img}}" width="100" height="100"/></div>',
        link : function (scope, iElement, iAttrs,ngModel){
            var $ele = $(iElement);
            $ele.on('click',function(){
                $('#upfile').eq(0).click();
            });
            $('#upfile').on('change',function(){
                var $this = $(this),
                    $file = $this[0].files[0],
                    $size = parseInt($file.size/1024),
                    $clone = $this;
                if($size>2048){
                    alert('图片最大不能超过2M');
                }else{
                    $('#upForm').html($clone).submit();
                    $('#myIframe').on('load',function(){
                        var $iframe = $(this),
                            $data = $iframe[0].contentWindow.document.body.innerHTML,
                            $json = JSON.parse($data);
                        if($json.status){
                            scope.$apply(function(){
                                scope.img = $json.url;
                            });
                        }else{
                            alert($json.info);
                        }
                    });
                }
            });
        },
        controller : function ($scope, $element, $attrs, $transclude) {
            if(!$scope.img){
                $scope.img = 'img/img.png'
            }
        }
    }
});
app.directive('regRule', function() {
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
