import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// SCSS 파일
import "../css/SignUp.scss"

export default function SignUp() {
  // 아이디, 이름, 비밀번호, 비밀번호확인, 생년월일
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birth, setBirth] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if(!idRegExp.test(currentId)) {
      setIsId(false);
    } else {
      setIsId(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if (password !== currentPasswordConfirm) {
      setIsPasswordConfirm(false);
    } else {
      setIsPasswordConfirm(true);
    }
  };

  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);

    if (currentBirth.length !== 8) {
      setIsBirth(false);
    } else {
      setIsBirth(true);
    }
  }

  // 사용자의 회원정보 체크
  const onClickRegist = (e) => {
    console.log(id, name, password, passwordConfirm, birth);
    console.log(isId, isName, isPassword, isPasswordConfirm, isBirth);

    if (isId === false) {
      alert("아이디(이메일) 형식에 맞게 입력해주세요!");
      return;
    }

    if (isName === false) {
      alert("이름은 2~5글자 사이로 입력해주세요!");
      return;
    }

    if (isPassword === false) {
      alert("비밀번호는 영문자, 숫자, 특수문자를 섞어서 8자리 이상이여야 합니다!");
      return;
    }

    if (isPasswordConfirm === false) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (isBirth === false) {
      alert("생년월일을 제대로 입력해주세요!");
      return;
    }

    const params = {id, name, password, passwordConfirm, birth};

    axios.post("/api/signup",params).then((res) => {
      const {result} = res.data;
      if (result === "success") {
        alert(params.name + "님 환영합니다. 회원가입을 완료하였습니다.");
        e.stopPropagation();
        goToMain();
      } else {
        alert("죄송하지만 회원가입을 할 수 없습니다.");
      }
    });
  };

  // 메인 페이지로 이동
  const navigate = useNavigate();
  
  const goToMain = () => {
    navigate("/");
  }

  return (
    <div className="signup-layer">
      <div className="signup-form">
        <div className="signup-logo">회원가입</div>
        <div className="signup-line"></div>
        {/* 입력 폼 */}
        <div>
          <input type="text" placeholder="아이디 (이메일 입력)" value={id} onChange={onChangeId} className="signup-input" />
        </div>
        <div>
          <input type="text" placeholder="이름" value={name} onChange={onChangeName} className="signup-input" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} className="signup-input" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={onChangePasswordConfirm} className="signup-input" />
        </div>
        <div>
          <input type="text" placeholder="생년월일 (8자리 입력)" value={birth} onChange={onChangeBirth} className="signup-input" />
        </div>
        {/* 회원가입 버튼 */}
        <div>
          <button type="button" className="signup-button" onClick={onClickRegist}>가입하기</button>
        </div>
      </div>
    </div>
  )
}