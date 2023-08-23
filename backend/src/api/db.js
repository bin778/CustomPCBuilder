const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3306;

// MySQL 연동
const db = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // DB 계정
  password: "1234", // DB 비밀번호
  database: "CustomPCBuilder", // 사용할 DB
});

app.use(cors({
  origin: "*", // 출처 허용 옵션
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// 데이터 조회하기
app.get("/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT * FROM USER_INFO";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = express;