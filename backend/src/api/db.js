const mysql = require('mysql2');  // mysql 모듈 로드

const conn = {  // mysql 접속 설정
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'custompcbilder'
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

// 로그인 아이디, 비밀번호 확인
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

// 회원가입 중복 체크
db.checkUser = (params) => {
  return new Promise(async (resolve, reject) => {
    const { id } = params;
    const sql = `select * from user_info where user_id='${id}';`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 회원가입 등록 및 추가
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