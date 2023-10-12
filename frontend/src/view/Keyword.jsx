import { useState, useEffect } from "react";
import axios from 'axios'

// 이미지 파일 목록
import SEARCH from "../images/search.png";

// SCSS 파일
import "../css/Keyword.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Keyword() {
  const [text, setText] = useState('');

  axios.get("http://127.0.0.1:8000", {}).then((response) => setText(JSON.stringify(response.data)));

  return (
    <div className="keyword-layer">
      <Header />
      <div className="keyword-body">
        <div>
        <div className="search-title">원하는 용도를 입력하세요!</div>
          <img src={SEARCH} className="search-image" alt="" />
          <input type="text" id="keyword" className="search-input" />
        </div>
        <span className="search-button">검색</span>
        {/* <h1>{text}</h1> */}
      </div>
    </div>
  )
}