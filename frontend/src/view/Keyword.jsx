import { useState } from "react";
import axios from 'axios'

// 이미지 파일 목록
import SEARCH from "../images/search.png";

// SCSS 파일
import "../css/Keyword.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Keyword() {
  // 변수 선언 및 초기화
  const [keyword, setKeyword] = useState('');
  const [quote, setQuote] = useState('');

  var count = 0;
  var quote_title = [];
  var quote_price = [];
  var quote_image = [];
  var quote_wattage = 0;
  var quote_total_price = 0;

  // 일치하는 키워드가 있는지 검색하기
  const searchKeyword = async () => {
    console.log(keyword);

    try {
      const response = await axios.get("http://127.0.0.1:8000", {
        params: {
          keyword: keyword,
        }
      }).then((response) => setQuote(JSON.stringify(response.data)));
    } catch (error) {
      console.error(error);
    }
  }

  const list_str = quote.replaceAll('"','').replaceAll('\'','')
  .replaceAll(', ',',').replaceAll('][',',')
  .replaceAll('[','').replaceAll(']','');

  const list_data = list_str.split(',');

  if (list_data.length === 20) {
    count = 6;
  } else if (list_data.length === 23) {
    count = 7;
  } else if (list_data.length === 26) {
    count = 8;
  }

  // 견적 데이터를 부품 이름, 가격, 이미지 배열에 넣기
  // 전력량, 총 금액 넣기
  quote_title = [count];
  quote_price = [count];
  quote_image = [count];
  quote_wattage = list_data[list_data.length - 2];
  quote_total_price = list_data[list_data.length - 1];

  for (var i = 0; i < 6; i++) {
    quote_title[i] = list_data[i];
    quote_price[i] = list_data[i + count];
    quote_image[i] = list_data[i + (count * 2)];
  }

  return (
    <div className="keyword-layer">
      <Header />
      <div className="keyword-body">
        <div>
        <div className="search-title">원하는 용도를 입력하세요!</div>
          <img src={SEARCH} className="search-image" alt="" />
          <input type="text" placeholder="용도를 입력해주세요" id="keyword" className="search-input" value={keyword} onChange={e => {
            setKeyword(e.target.value);
          }}/>
        </div>
        <span className="search-button" onClick={searchKeyword}>검색</span>
        {/* 견적이 출력되는지 확인 */}
        <div>
          <h2>사양 출력</h2>
          <div>{quote_wattage}</div>
          <div>{quote_total_price}</div>
          <div>{quote_title[5]}</div>
        </div>
      </div>
    </div>
  )
}