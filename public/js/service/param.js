app.factory('userLog',function(){
    function thisDate(){
        var d = new Date(),
            time = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate();
        return time;
    }
    return {
        thisDate : thisDate
    };
});
