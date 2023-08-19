import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// SCSS 파일
import "../css/Login.scss"

export default function Login() {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  const navigate = useNavigate();

  const onClickLogin = (e) => {
    console.log(id, pw);

    if(!id) {
      alert("아이디(이메일)를 입력해주세요!");
      return;
    }

    if(!pw) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    axios.post("/api/login", {id: id, pw: pw}).then((res) => {
      console.log(res.data);
      const {result} = res.data
      if (result === "success") {
        e.stopPropagation();
        goToMain();
      } else {
        alert("아이디 혹은 패스워드가 일치하지 않습니다!");
      }
    });
  }

  // 회원 가입 페이지 이동
  const goToSignUp = () => {
    navigate("/sign_up");
  }

  // 메인 페이지로 이동
  const goToMain = () => {
    navigate("/");
  }

  return (
    <div className="login-layer">
      <div className="login-form">
        <div className="login-logo">CUSTOMPCBUILDER</div>
        <div className="login-line"></div>
        <div>
          <div>
            <input type="text" placeholder="아이디" id="id" className="login-input" onChange={e => {
              setId(e.target.value);
            }}/>
          </div>
          <div>
            <input type="password" placeholder="비밀번호" id="password" className="login-input" onChange={e => {
              setPw(e.target.value);
            }}/>
          </div>
          <div><button type="button" className="login-button" onClick={onClickLogin}>로그인</button></div>
          <div>
            <span>계정이 없으세요? </span>
            <span className="signup-button" onClick={goToSignUp}>회원가입</span>
          </div>
        </div>
      </div>
    </div>
  )
}