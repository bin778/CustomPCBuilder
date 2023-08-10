// 이미지 파일 목록
import COMPUTER from "../images/computer.png";

// SCSS 파일
import "../css/Main.scss"

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Main() {
  return (
    <div className="main-layer">
      <Header />
      <div className="main-body">
        <img src={COMPUTER} className="computer" alt="" />
        <div className="main-title">아직도 컴퓨터 견적을 어떻게 맞춰야 되는지 모르겠다고요?</div>
        <div className="main-context">'맞춤견적'에서 검색창에서 원하는 키워드를 입력하면, 원하는 사양과 가격의 컴퓨터를 알아서 맞춰줍니다.</div>
      </div>
    </div>
  )
}