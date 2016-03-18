var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');
/* 开启用户监听 */
router.get('/', function (req, res, next) {
    res.send('请求响应');
});


router.prepareSocketIO = function (server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        socket.on('join', function (user) {
            socket.user = user;
            socket.emit('state', 'SERVER', true);
            socket.broadcast.emit('state', 'SERVER', user + '上线了');
        });
        socket.on('sendMSG', function (msg) {
            socket.emit('chat', socket.user, msg);
            socket.broadcast.emit('chat', socket.user, msg);
        });
    });
};
module.exports = router;
