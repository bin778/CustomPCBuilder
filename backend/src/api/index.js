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

// /api/accountdelete POST 데이터를 전달 받는다.
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

// /api/cpu GET 데이터를 전달 받는다.
router.get("/cpu", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const cpu = await db.selectCPU(req.query);
  res.send({ result: cpu });
})

// /api/cooler GET 데이터를 전달 받는다.
router.get("/cooler", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const cooler = await db.selectCooler(req.query);
  res.send({ result: cooler });
})

// /api/mainboard GET 데이터를 전달 받는다.
router.get("/mainboard", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const mainboard = await db.selectMainboard(req.query);
  res.send({ result: mainboard });
})

// /api/memory GET 데이터를 전달 받는다.
router.get("/memory", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const memory = await db.selectMemory(req.query);
  res.send({ result: memory });
})

// /api/videocard GET 데이터를 전달 받는다.
router.get("/videocard", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const videocard = await db.selectVideoCard(req.query);
  res.send({ result: videocard });
})

// /api/storage GET 데이터를 전달 받는다.
router.get("/storage", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const storage = await db.selectStorage(req.query);
  res.send({ result: storage });
})

// /api/power GET 데이터를 전달 받는다.
router.get("/power", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const power = await db.selectPower(req.query);
  res.send({ result: power });
})

// /api/comcase GET 데이터를 전달 받는다.
router.get("/comcase", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const comcase = await db.selectComCase(req.query);
  res.send({ result: comcase });
})

module.exports = router;