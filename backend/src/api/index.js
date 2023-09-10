const express = require("express")
const router = express.Router()
const db = require("./db");

// /api/login POST 데이터를 전달 받는다.
router.post("/login", async (req, res) => {
  console.log(req.body);
  
  const results = await db.findUser(req.body);
  console.log(results);

  if(results && results.length > 0) {
    res.send({result: "success"})
  } else {
    res.send({result: "fail"})
  }
})

// /api/signup POST 데이터를 전달 받는다.
router.post("/signup", async (req, res) => {
  console.log(req.body);

  // 사용자 아이디 중복 체크
  const user = await db.checkUser(req.body);
  console.log(user);

  // 중복되었으면 메시지를 출력한다.
  if (user && user.length > 0) {
    res.send({ result: "dup-userid" });
  } else {
    // 중복되지 않았을 경우
    const result = await db.insertUser(req.body);
    console.log(result);

    if (result) {
      res.send({result: "success"})
    } else {
    res.send({result: "fail"})
    }
  }
});

router.delete("/accountdelete", async (req, res) => {
  const { user, name, pw } = req.query;

  const result = await db.deleteUser(req.query);
  console.log(result);

  if (result) {
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

module.exports = router;