const mysql = require('mysql2');  // mysql 모듈 로드

const conn = {  // mysql 접속 설정
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'USER'
}

const db = {};

const queryFunc = (sql) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    connection.query(sql, (err, results) => {
      if (err) {
        console.trace(err);
        reject(err);
      } else {
        connection.end();
        console.log(results);
        resolve(results);
      }
    });
  });
}

db.findUser = (params) => {
  return new Promise(async (resolve) => {
    const { id, pw } = params;

    const sql = 
      " select * from user_info where " +
      ` user_id = "${id}" and user_password="${pw}"; `;
    const result = await queryFunc(sql);
    resolve(result);
  });
}

db.checkUser = (params) => {
  return new Promise(async (resolve, reject) => {
    const { id } = params;
    const sql = `select * from user_info where user_id='${id}';`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

db.insertUser = (params) => {
  return new Promise(async (resolve, reject) => {
    const { id, name, password, birth } = params;

    const sql = `insert into user_info (user_id, user_name, user_password, user_birth)
            values ('${id}', '${name}', '${password}', '${birth}');`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

module.exports = db;