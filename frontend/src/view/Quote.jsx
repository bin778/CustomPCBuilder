// 이미지 파일 목록
import COPY from "../images/copy.png";
import COMPATIBLE from "../images/compatible.png";
import WATTAGE from "../images/wattage.png";
import PRICE from "../images/price.png";

// SCSS 파일
import "../css/Quote.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Quote() {
  return (
    <div className="quote-layer">
      <Header />
      <div className="quote-form">
        <div>
          <img src={COPY} className="copy" alt="" />
          <input type="text" id="link" className="copy-link" />
          <span className="quote-button">초기화</span>
          <span className="quote-button">주문</span>
        </div>
        <div>
          <span className="compatible">
            <img src={COMPATIBLE} className="bar-image" alt="" />
            <span className="text-bar">호환성</span>
          </span>
          <span className="wattage">
            <img src={WATTAGE} className="bar-image" alt="" />
            <span className="text-bar">전력량</span>
          </span>
          <span className="price">
            <img src={PRICE} className="bar-image" alt="" />
            <span className="text-bar">원</span>
          </span>
        </div>

      </div>
    </div>
  )
}