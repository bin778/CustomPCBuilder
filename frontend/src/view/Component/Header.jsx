import { useNavigate } from "react-router-dom";

// 이미지 파일 목록
import LOGIN_LOGO from "../../images/login-logo.png";

// SCSS 파일
import "../../css/Header.scss"

function Header() {
  const navigate = useNavigate();

  // 로그인 페이지 이동
  const goToLogin = () => {
    navigate("/");
  }

  // 로그인 페이지 이동
  const goToAccountDelete = () => {
    navigate("/account_delete");
  }

  // 메인 페이지 이동
  const goToMain = () => {
    navigate("/main");
  }

  // 온라인 견적 페이지 이동
  const goToQuote = () => {
    navigate("/quote");
  }

  // 맞춤 견적 페이지 이동
  const goToKeyword = () => {
    navigate("/keyword");
  }

  return (
    <div className="main-header">
      {/* 메인 로고 */}
      <span className="main-logo" onClick={goToMain}>CUSTOMPCBUILDER</span>
      {/* 메인 메뉴 */}
      <span className="main-menu" onClick={goToQuote}>온라인 견적</span>
      <span className="main-menu" onClick={goToKeyword}>맞춤 견적</span>
      {/* 로그 아웃 메뉴 */}
      <span className="login-menu" onClick={goToAccountDelete}>회원 탈퇴</span>
      <span className="login-menu" onClick={goToLogin}>로그아웃</span>
      <img src={LOGIN_LOGO} className="login-logo" alt="" />
    </div>
  )
}

export default Header;