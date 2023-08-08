import { useNavigate } from "react-router-dom";

// SCSS 파일
import "../css/Login.scss"

export default function Login() {
  const navigate = useNavigate();

  // 회원 가입 페이지 이동
  const goToSignUp = () => {
    navigate("/sign_up");
  }

  return (
    <div className="login-layer">
      <div className="login-form">
        <div className="login-logo">CUSTOMPCBUILDER</div>
        <div>
          <div><input type="text" placeholder="아이디" id="id" className="login-input" /></div>
          <div><input type="password" placeholder="비밀번호" id="password" className="login-input" /></div>
          <div><button id="login" className="login-button">로그인</button></div>
          <div>
            <span>계정이 없으세요? </span>
            <span className="signup-button" onClick={goToSignUp}>회원가입</span>
          </div>
        </div>
      </div>
    </div>
  )
}