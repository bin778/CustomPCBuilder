// SCSS 파일
import "../css/SignUp.scss"

export default function SignUp() {
  return (
    <div className="signup-layer">
      <div className="signup-form">
        <div className="signup-logo">회원가입</div>
        <div className="signup-line"></div>
        {/* 입력 폼 */}
        <div>
          <input type="text" placeholder="아이디 (이메일 입력)" id="id" className="signup-input" />
        </div>
        <div>
          <input type="text" placeholder="이름" id="name" className="signup-input" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호" id="password" className="signup-input" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호 확인" id="password-check" className="signup-input" />
        </div>
        <div>
          <input type="text" placeholder="생년월일 (8자리 입력)" id="birthday" className="signup-input" />
        </div>
        {/* 회원가입 버튼 */}
        <div>
          <button type="button" className="signup-button">가입하기</button>
        </div>
      </div>
    </div>
  )
}