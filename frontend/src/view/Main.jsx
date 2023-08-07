import { useNavigate } from "react-router-dom";

// 이미지 파일 목록
import LOGIN_LOGO from "../images/login-logo.png";
import COMPUTER from "../images/computer.png";

// SCSS 파일
import "../css/Main.scss"

export default function Main() {
  const navigate = useNavigate();

  // 회원 가입 페이지 이동
  const goToSignUp = () => {
    navigate("/sign_up");
  }

  // 로그인 페이지 이동
  const goToLogin = () => {
    navigate("/login");
  }

  return (
    <div className="main-layer">
      <div className="main-header">
        {/* 메인 로고 */}
        <span className="main-logo">CUSTOMPCBUILDER</span>
        {/* 메인 메뉴 */}
        <span className="main-menu">온라인 견적</span>
        <span className="main-menu">맞춤 견적</span>
        <span className="main-menu">PC부품 검색</span>
        <span className="main-menu">질문 게시판</span>
        {/* 로그인 메뉴 */}
        <span className="login-menu" onClick={goToLogin}>로그인</span>
        <span className="login-menu" onClick={goToSignUp}>회원가입</span>
        <img src={LOGIN_LOGO} className="login-logo" alt="" />
      </div>
      <div className="main-body">
        <img src={COMPUTER} className="computer" alt="" />
        <div className="main-title">아직도 컴퓨터 견적을 어떻게 맞춰야 되는지 모르겠다고요?</div>
        <div className="main-context">'맞춤견적'에서 검색창에서 원하는 키워드를 입력하면, 원하는 사양과 가격의 컴퓨터를 알아서 맞춰줍니다.</div>
      </div>
    </div>
  )
}