const mysql = require('mysql2');  // mysql 모듈 로드
const express = require("express");
const app = express();

const conn = {  // mysql 접속 설정
  host: '127.0.0.1', // DB 호스트 설정
  port: '3306', // DB 포트번호 설정
  user: 'root', // DB 유저 설정
  password: '1234', // DB 비밀번호 설정
  database: 'custompcbuilder' // DB 스키마 설정
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
        resolve(results);
      }
    });
  });
}

// 사용자 아이디, 비밀번호 확인
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

// 사용자 아이디, 비밀번호 삭제
db.deleteUser = (params) => {
  return new Promise(async (resolve) => {
    const { id, name, pw } = params;

    const sql = `delete from user_info where user_id='${id}' and user_name='${name}' and user_password='${pw}'`;

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

// CPU DB 목록 가져오기
db.selectCPU = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from cpu;`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 쿨러 DB 목록 가져오기
db.selectCooler = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from cooler;`;
    
    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 메인보드 DB 목록 가져오기
db.selectMainboard = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from mainboard`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 메모리 DB 목록 가져오기
db.selectMemory = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from memory`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 그래픽카드 DB 목록 가져오기
db.selectVideoCard = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from videocard`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 저장공간 DB 목록 가져오기
db.selectStorage = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from storage`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 파워 DB 목록 가져오기
db.selectPower = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from power`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 케이스 DB 목록 가져오기
db.selectComCase = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `select * from comcase`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 장바구니 목록 추가하기
db.insertCart = (id, title, manufacturer, price, wattage, output) => {
  return new Promise(async (resolve, reject) => {
    product_count = 1;
    const sql = `insert into quote_order (product_id, product_title, product_manufacturer, product_count, product_price, product_wattage, product_output) values
      ('${id}', '${title}', '${manufacturer}', '${product_count}', '${price}', '${wattage}', '${output}');`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 장바구니 목록 삭제하기
db.deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = `delete from quote_order where product_id='${id}';`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 장바구니 목록 조회하기
db.selectCart = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM quote_order;`;
    
    const result = await queryFunc(sql);
    resolve(result);
  })
};

// 장바구니 상품 개수 증가
db.addCount = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = `update quote_order set product_count = product_count + 1 where product_id='${id}'`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 장바구니 상품 개수 감소
db.minusCount = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = `update quote_order set product_count = product_count - 1 where product_id='${id}'`;

    const result = await queryFunc(sql);
    resolve(result);
  })
}

// 장바구니 총액 조회
db.selectTotalPriceCart = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT SUM(product_count * product_price) AS total_price FROM quote_order`;

    const result = await queryFunc(sql);
    resolve(result);
  })
};

// 장바구니 초기화
db.resetCart = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `DELETE FROM quote_order;`;

    const result = await queryFunc(sql);
    resolve(result);
  })
};

// 장바구니 총 전력량 조회
db.selectTotalWattage = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT SUM(product_count * product_wattage) AS total_wattage FROM quote_order`;

    const result = await queryFunc(sql);
    resolve(result);
  })
};

// 장바구니 총 출력량 조회
db.selectTotalOutput = () => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT SUM(product_output) AS total_output FROM quote_order`;

    const result = await queryFunc(sql);
    resolve(result);
  })
};

module.exports = db;