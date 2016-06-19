var socket = io.connect('http://localhost:3000');
var userName = "逗逼" + parseInt(Math.random()*1e4);
socket.on('connect', function () {
    socket.emit('join', userName);
    var ele = document.createElement('td'),
        txt =document.createTextNode(userName+'进入房间，欢迎！！！');
    ele.appendChild(txt);
    $('#content').appendChild(ele);
});
socket.on('chat', function (user, data) {
    var p = document.createElement('tr');
    var direct = 'align-left';
    if (user === userName) {
        direct = 'align-right';
        p.innerHTML = '<td ><span class=""><span class="info">' + data + '</span> <span class="name">' + user + '</span></td><span></span>';
    } else {
        p.innerHTML = '<td ><span class="name"> <span>' + user + '</span>   <span class="info">' + data + '</span><span></span></td>';
    }
    p.className = direct;
    $('#content').appendChild(p);
});

$('#send').addEventListener('click', function (target) {
    var content = $('#textContent').innerHTML;
    if (content = content.replace(" ", "")) {
        socket.emit('sendMSG', content);
        $('#textContent').innerHTML = "";
    }
});
function $(flag) {
    return document.querySelector(flag);
}
jQuery('#textContent').on('keyup',function(e){
    var c = e.keyCode;
    if(c === 13){
        var content = $('#textContent').innerHTML;
        if (content = content.replace(" ", "")) {
            socket.emit('sendMSG', content);
            $('#textContent').innerHTML = "";
        }
    }
});

