import { useState, useEffect } from "react";
import axios from 'axios'

// 이미지 파일 목록
import SEARCH from "../images/search.png";

// SCSS 파일
import "../css/Keyword.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Keyword() {
  const [keyword, setKeyword] = useState('');

  const searchKeyword = (e) => {
    console.log(keyword);
  }

  return (
    <div className="keyword-layer">
      <Header />
      <div className="keyword-body">
        <div>
        <div className="search-title">원하는 용도를 입력하세요!</div>
          <img src={SEARCH} className="search-image" alt="" />
          <input type="text" placeholder="용도를 입력해주세요" id="keyword" className="search-input" onChange={e => {
            setKeyword(e.target.value);
          }}/>
        </div>
        <span className="search-button" onClick={searchKeyword}>검색</span>
      </div>
    </div>
  )
}