import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/sign_up");
  }

  const goToLogin = () => {
    navigate("/login");
  }

  return (
    <div>
      <span onClick={goToSignUp}>회원가입</span>
      <span> </span>
      <span onClick={goToLogin}>로그인</span>
    </div>
  )
}