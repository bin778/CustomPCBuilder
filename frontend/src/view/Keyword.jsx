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
  let quote_title = [];
  let count = 0;
  let quote_name = [];
  let quote_price = [];
  let quote_image = [];
  let quote_wattage = 0;
  let quote_total_price = 0;

  // 버튼 활성화(keyword면 키워드 견적창, search면 검색 창이 표시된다.)
  const [btnActive, setBtnActive] = useState('search');

  // 일치하는 키워드가 있는지 검색하기
  const searchKeyword = async () => {
    console.log(keyword);

    try {
      const response = await axios.get("http://127.0.0.1:8000", {
        params: {
          keyword: keyword,
        }
      });
      setQuote(JSON.stringify(response.data));
      // 일치하는 키워드가 없을 때 처리
      if (JSON.stringify(response.data) === "\"exception\"") {
        setBtnActive('search');
        alert("제대로 된 키워드를 입력해주세요!");
        return;
      } else {
        setBtnActive('keyword');
        return;
      }
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
    quote_title = ['CPU','메인보드','메모리','저장공간','케이스','파워'];
  } else if (list_data.length === 23) {
    count = 7;
    quote_title = ['CPU','메인보드','그래픽카드','메모리','저장공간','케이스','파워'];
  } else if (list_data.length === 26) {
    count = 8;
    quote_title = ['CPU','메인보드','그래픽카드','메모리','저장공간','케이스','쿨러','파워'];
  }

  // 견적 데이터를 부품 이름, 가격, 이미지 배열에 넣기
  // 전력량, 총 금액 넣기
  quote_name = [count];
  quote_price = [count];
  quote_image = [count];
  quote_wattage = list_data[list_data.length - 2];
  quote_total_price = list_data[list_data.length - 1];

  for (let i = 0; i < count; i++) {
    quote_name[i] = list_data[i];
    quote_price[i] = list_data[i + count];
    quote_image[i] = list_data[i + (count * 2)];
  }

  const quote_result = (quote_name, quote_image, quote_price) => {
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(
        <div key={quote_name[i]}>
          <div className="keyword-quote-title">{quote_title[i]}</div>
          <div className="keyword-quote">
            <div className="keyword-name">{quote_name[i]}</div>
            <img src={process.env.PUBLIC_URL + quote_image[i]} className="keyword-image" alt="" />
            <div className="keyword-price">{quote_price[i].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
          </div>
        </div>
      );
    }
    return result;
  }

  // 취소 버튼
  const cancelButton = () => {
    setBtnActive('search');
  }

  return (
    <div className="keyword-layer">
      <Header />
      <div className="keyword-body">
        <div className={btnActive === 'search' ? '' : 'hidden'}>
          <div>
          <div className="search-title">원하는 용도를 입력하세요!</div>
          <div className="search-context">부품이 호환되지 않을 경우 적용되지 않을수도 있습니다.</div>
            <img src={SEARCH} className="search-image" alt="" />
            <input type="text" placeholder="용도를 입력해주세요" id="keyword" className="search-input" value={keyword} onChange={e => {
              setKeyword(e.target.value);
            }}/>
          </div>
          <span className="search-button" onClick={searchKeyword}>검색</span>
        </div>
      </div>
      <div className={btnActive === 'keyword' ? 'keyword-result-form' : 'hidden'}>
          <div className="keyword-title">PC 견적구성</div>
          <div className="keyword-context">용도에 맞는 PC 견적 구성을 완료하였습니다!</div>
          <div className="list-line"></div>
          <div className="keyword-scroll">{quote_result(quote_name,quote_image,quote_price)}</div>
          <div className="list-line"></div>
          <div className="keyword-wattage">
            <span>총 전력량</span>
            <span className="right">{quote_wattage}W</span>
          </div>
          <div className="keyword-total-price">
            <span>총 합계금액</span>
            <span className="right">{quote_total_price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</span>
          </div>
          <div>
            <button type="button" className="keyword-button" onClick={cancelButton}>취소</button>
            <button type="button" className="keyword-button">주문</button>
          </div>
        </div>
    </div>
  )
}