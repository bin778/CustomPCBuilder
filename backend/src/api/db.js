const mysql = require('mysql2');  // mysql 모듈 로드

const conn = {  // mysql 접속 설정
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'USER'
}

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속

let sql = "SELECT * FROM USER_INFO";

connection.query(sql, function(err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});

module.exports = mysql;