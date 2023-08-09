import { useState } from "react";
import { useNavigate } from "react-router-dom";

// SCSS 파일
import "../css/Login.scss"

export default function Login() {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');

  const navigate = useNavigate();

  const realName = "최영빈"; 
  const realId = "bin778@naver.com";
  const realPw = "12345678";

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
        <div>
          <div>
            <input type="text" placeholder="E-Mail" id="id" className="login-input" onChange={e => {
              setId(e.target.value);
            }}/>
          </div>
          <div>
            <input type="password" placeholder="Password" id="password" className="login-input" onChange={e => {
              setPw(e.target.value);
            }}/>
          </div>
          <div><button type="button" className="login-button" onClick={e => {
            if (realId === id && realPw === pw) {
              alert(realName + '님 환영합니다.');
              e.stopPropagation();
              goToMain();
            } else {
              alert('이메일 혹은 패스워드가 일치하지 않습니다.');
            }
          }}>로그인</button></div>
          <div>
            <span>계정이 없으세요? </span>
            <span className="signup-button" onClick={goToSignUp}>회원가입</span>
          </div>
        </div>
      </div>
    </div>
  )
}