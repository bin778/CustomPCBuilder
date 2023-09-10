import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// SCSS 파일
import "../css/AccountDelete.scss"

export default function AccountDelete() {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  const navigate = useNavigate();

  const onClickDelete = (e) => {
    console.log(id, pw);

    if(!id) {
      alert("아이디(이메일)를 입력해주세요!");
      return;
    }

    if(!pw) {
      alert("비밀번호를 입력해주세요!");
      return;
    }
  }

  // 메인 페이지로 이동
  const goToMain = () => {
    navigate("/main");
  }

  return (
    <div className="delete-layer">
      <div className="delete-form">
        <div className="delete-logo">회원 탈퇴</div>
        <div className="delete-line"></div>
        <div className="delete-context">회원 탈퇴를 원하시면 자신의 아이디와 비밀번호를 입력하세요</div>
        <div>
          <input type="text" placeholder="아이디" id="id" className="delete-input" onChange={e => {
            setId(e.target.value);
          }}/>
        </div>
        <div>
          <input type="password" placeholder="비밀번호" id="password" className="delete-input" onChange={e => {
            setPw(e.target.value);
          }}/>
        </div>
        <div className="delete-line"></div>
        <div>
          <button type="button" className="delete-button" onClick={goToMain}>취소</button>
          <button type="button" className="delete-button" onClick={onClickDelete}>탈퇴</button>
          </div>
      </div>
    </div>
  )
}