const express = require("express");
const path = require("path");
const app = express();

// 메인 페이지 접속 시 html 응답하기

// 미들웨어 : html, css, js, img 파일들이 담긴 곳 명시하기
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const http = require("http").createServer(app);
http.listen(7000, () => {
  console.log("server listen start : 7000");
});
