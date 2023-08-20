const express = require("express")
const router = express.Router()

// /api/login POST 데이터를 전달 받는다.
router.post("/login", (req, res) => {
  console.log(req.body)

  const {id, pw} = req.body
  if(id === "bin778@naver.com" && pw === "chlb017587!") {
    res.send({result: "success"})
  } else {
    res.send({result: "fail"})
  }
})

// /api/signup POST 데이터를 전달 받는다.
router.post("/signup", (req, res) => {
  console.log(req.body);

  const {id, name, password, passwordConfirm, birth} = req.body;

  if (id && name && password && passwordConfirm && birth) {
    res.send({result: "success"});
  } else {
    res.send({result: "fail"});
  }
})

module.exports = router;