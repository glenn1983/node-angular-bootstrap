var mysql = require('mysql');
var client = mysql.createConnection({
    user: 'root',
    password: ''
});
client.connect();
client.query('use zzyanode');
module.exports = client;
