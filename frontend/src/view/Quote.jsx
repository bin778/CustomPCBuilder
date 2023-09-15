import { useState } from "react";

// 이미지 파일 목록
import COPY from "../images/copy.png";
import COMPATIBLE from "../images/compatible.png";
import WATTAGE from "../images/wattage.png";
import PRICE from "../images/price.png";

// CPU 이미지
import RYZEN9 from "../images/CPU/RYZEN9.jpg"
import RYZEN5 from "../images/CPU/RYZEN5.jpg"
// import I7 from "../images/CPU/i7.jpg"
import I5 from "../images/CPU/i5.jpg"
// import I3 from "../images/CPU/i3.jpg"

// SCSS 파일
import "../css/Quote.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Quote() {
  // 온라인 견적 카테고리 버튼
  let [btnActive, setBtnActive] = useState('cpu');

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
        <div>
          <span className="option-list">
            {/* CPU 옵션 필터 */}
            <span className={(btnActive === 'cpu' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">AMD</span></div>
              <div><input type="checkbox"></input><span className="option-content">인텔</span></div>
              <div className="list-line"></div>
              <div className="option-title">코어 수</div>
              <div><input type="checkbox"></input><span className="option-content">4</span></div>
              <div><input type="checkbox"></input><span className="option-content">6</span></div>
              <div><input type="checkbox"></input><span className="option-content">12</span></div>
              <div className="list-line"></div>
              <div className="option-title">소켓</div>
              <div><input type="checkbox"></input><span className="option-content">AM4</span></div>
              <div><input type="checkbox"></input><span className="option-content">AM5</span></div>
              <div><input type="checkbox"></input><span className="option-content">LGA1700</span></div>
              <div className="list-line"></div>
            </span>
            {/* 쿨러 옵션 필터 */}
            <span className={(btnActive === 'cooler' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">3RSYS</span></div>
              <div><input type="checkbox"></input><span className="option-content">NZXT</span></div>
              <div><input type="checkbox"></input><span className="option-content">쿨러마스터</span></div>
              <div className="list-line"></div>
              <div className="option-title">냉각 방식</div>
              <div><input type="checkbox"></input><span className="option-content">공랭</span></div>
              <div><input type="checkbox"></input><span className="option-content">수랭</span></div>
              <div className="list-line"></div>
            </span>
            {/* 메인보드 옵션 필터 */}
            <span className={(btnActive === 'mainboard' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">ASRock</span></div>
              <div><input type="checkbox"></input><span className="option-content">ASUS</span></div>
              <div><input type="checkbox"></input><span className="option-content">MSI</span></div> 
              <div className="list-line"></div>
              <div className="option-title">CPU</div>
              <div><input type="checkbox"></input><span className="option-content">AMD</span></div>
              <div><input type="checkbox"></input><span className="option-content">인텔</span></div>
              <div className="list-line"></div>
              <div className="option-title">소켓</div>
              <div><input type="checkbox"></input><span className="option-content">AM4</span></div>
              <div><input type="checkbox"></input><span className="option-content">AM5</span></div>
              <div><input type="checkbox"></input><span className="option-content">LGA1700</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
            </span>
            {/* 메모리 옵션 필터 */}
            <span className={(btnActive === 'memory' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">G.SKILL</span></div>
              <div><input type="checkbox"></input><span className="option-content">TeamGroup</span></div>
              <div><input type="checkbox"></input><span className="option-content">삼성전자</span></div>
              <div className="list-line"></div>
              <div className="option-title">메모리용량</div>
              <div><input type="checkbox"></input><span className="option-content">16GB</span></div>
              <div><input type="checkbox"></input><span className="option-content">32GB</span></div>
              <div className="list-line"></div>
            </span>
            {/* 비디오카드 옵션 필터 */}
            <span className={(btnActive === 'videocard' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">MAXSUN</span></div>
              <div><input type="checkbox"></input><span className="option-content">MSI</span></div>
              <div><input type="checkbox"></input><span className="option-content">ZOTAC</span></div>
              <div className="list-line"></div>
              <div className="option-title">칩셋</div>
              <div><input type="checkbox"></input><span className="option-content">RTX4070Ti</span></div>
              <div><input type="checkbox"></input><span className="option-content">RTX4060Ti</span></div>
              <div><input type="checkbox"></input><span className="option-content">RTX3060</span></div>
              <div><input type="checkbox"></input><span className="option-content">GTX1660 SUPER</span></div>
              <div><input type="checkbox"></input><span className="option-content">GTX1650</span></div>
              <div className="list-line"></div>
              <div className="option-title">메모리용량</div>
              <div><input type="checkbox"></input><span className="option-content">4GB</span></div>
              <div><input type="checkbox"></input><span className="option-content">6GB</span></div>
              <div><input type="checkbox"></input><span className="option-content">8GB</span></div>
              <div><input type="checkbox"></input><span className="option-content">12GB</span></div>
              <div className="list-line"></div>
            </span>
            {/* 저장공간 옵션 필터 */}
            <span className={(btnActive === 'storage' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">삼성전자</span></div>
              <div><input type="checkbox"></input><span className="option-content">시게이트</span></div>
              <div className="list-line"></div>
              <div className="option-title">장치</div>
              <div><input type="checkbox"></input><span className="option-content">HDD</span></div>
              <div><input type="checkbox"></input><span className="option-content">SSD</span></div>
              <div className="list-line"></div>
              <div className="option-title">용량</div>
              <div><input type="checkbox"></input><span className="option-content">500GB</span></div>
              <div><input type="checkbox"></input><span className="option-content">1TB</span></div>
              <div><input type="checkbox"></input><span className="option-content">2TB</span></div>
              <div><input type="checkbox"></input><span className="option-content">4TB</span></div>
              <div className="list-line"></div>
            </span>
            {/* 파워 옵션 필터 */}
            <span className={(btnActive === 'power' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">마이크로닉스</span></div>
              <div><input type="checkbox"></input><span className="option-content">잘만</span></div>
              <div><input type="checkbox"></input><span className="option-content">쿨러마스터</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
              <div className="option-title">정격출력</div>
              <div><input type="checkbox"></input><span className="option-content">600W</span></div>
              <div><input type="checkbox"></input><span className="option-content">700W</span></div>
              <div><input type="checkbox"></input><span className="option-content">850W</span></div>
              <div><input type="checkbox"></input><span className="option-content">1000W</span></div>
              <div className="list-line"></div>
            </span>
            {/* 케이스 옵션 필터 */}
            <span className={(btnActive === 'comcase' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox"></input><span className="option-content">3RSYS</span></div>
              <div><input type="checkbox"></input><span className="option-content">마이크로닉스</span></div>
              <div><input type="checkbox"></input><span className="option-content">앱코</span></div>
              <div className="list-line"></div>
              <div className="option-title">크기</div>
              <div><input type="checkbox"></input><span className="option-content">미니타워</span></div>
              <div><input type="checkbox"></input><span className="option-content">미들타워</span></div>
              <div><input type="checkbox"></input><span className="option-content">빅타워</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
            </span>
          </span>
          <span className="product-list">
            {/* CPU 상품 */}
            <div className={(btnActive === 'cpu' ? 'product' : 'hidden')}>
              <div className="list-line"></div>
              <img src={RYZEN9} className="product-image" alt="" />
              <span className="product-name">AMD 라이젠9-5900X</span>
              <span className="product-spec">12코어 / 24쓰레드 / 3.7Ghz / AM4 / 105W</span>
              <span className="product-price">499,900원</span>
              <div className="list-line"></div>
            </div>
            <div className={(btnActive === 'cpu' ? 'product' : 'hidden')}>
              <div className="list-line"></div>
              <img src={RYZEN5} className="product-image" alt="" />
              <span className="product-name">AMD 라이젠5-7600X</span>
              <span className="product-spec">6코어 / 12쓰레드 / 3.8Ghz / AM5 / 105W</span>
              <span className="product-price">378,000원</span>
              <div className="list-line"></div>
            </div>
            <div className={(btnActive === 'cpu' ? 'product' : 'hidden')}>
              <div className="list-line"></div>
              <img src={I5} className="product-image" alt="" />
              <span className="product-name">인텔 i5-12400</span>
              <span className="product-spec">6코어 / 12쓰레드 / 2.5Ghz / LGA1700 / 65W</span>
              <span className="product-price">229,500원</span>
              <div className="list-line"></div>
            </div>
          </span>
          <span className="cart-list">
            <div className={"cart" + (btnActive === 'cpu' ? ' active' : '')} onClick={() => { setBtnActive('cpu'); }}>CPU</div>
            <div className={"cart" + (btnActive === 'cooler' ? ' active' : '')} onClick={() => { setBtnActive('cooler'); }}>쿨러</div>
            <div className={"cart" + (btnActive === 'mainboard' ? ' active' : '')} onClick={() => { setBtnActive('mainboard'); }}>메인보드</div>
            <div className={"cart" + (btnActive === 'memory' ? ' active' : '')} onClick={() => { setBtnActive('memory'); }}>메모리</div>
            <div className={"cart" + (btnActive === 'videocard' ? ' active' : '')} onClick={() => { setBtnActive('videocard'); }}>비디오카드</div>
            <div className={"cart" + (btnActive === 'storage' ? ' active' : '')} onClick={() => { setBtnActive('storage'); }}>저장공간</div>
            <div className={"cart" + (btnActive === 'power' ? ' active' : '')} onClick={() => { setBtnActive('power'); }}>파워</div>
            <div className={"cart" + (btnActive === 'comcase' ? ' active' : '')} onClick={() => { setBtnActive('comcase'); }}>케이스</div>
          </span>
        </div>
      </div>
    </div>
  )
}