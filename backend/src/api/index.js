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