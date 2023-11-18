import { useState, useEffect } from "react";
import axios from 'axios'

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
  // 온라인 견적 버튼 활성화
  let [btnActive, setBtnActive] = useState('cpu');

  // 부품 목록 State
  let [CPU, setCPU] = useState([]);
  let [Cooler, setCooler] = useState([]);
  let [Mainboard, setMainboard] = useState([]);
  let [Memory, setMemory] = useState([]);
  let [VideoCard, setVideoCard] = useState([]);
  let [Storage, setStorage] = useState([]);
  let [Power, setPower] = useState([]);
  let [ComCase, setComCase] = useState([]);

  // 주문 목록 State
  let [Cart, setCart] = useState([]);
  
  useEffect(() => {
    // CPU DB 목록 불러오기
    axios.get("/api/cpu").then((res) => {
      const cpuData = res.data.result;
      setCPU(cpuData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // Cooler DB 목록 불러오기
    axios.get("/api/cooler").then((res) => {
      const coolerData = res.data.result;
      setCooler(coolerData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // Mainboard DB 목록 불러오기
    axios.get("/api/mainboard").then((res) => {
      const mainboardData = res.data.result;
      setMainboard(mainboardData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // Memory DB 목록 불러오기
    axios.get("/api/memory").then((res) => {
      const memoryData = res.data.result;
      setMemory(memoryData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // VideoCard DB 목록 불러오기
    axios.get("/api/videocard").then((res) => {
      const videocardData = res.data.result;
      setVideoCard(videocardData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // Storage DB 목록 불러오기
    axios.get("/api/storage").then((res) => {
      const storageData = res.data.result;
      setStorage(storageData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // Power DB 목록 불러오기
    axios.get("/api/power").then((res) => {
      const powerData = res.data.result;
      setPower(powerData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });

    // ComCase DB 목록 불러오기
    axios.get("/api/comcase").then((res) => {
      const comcaseData = res.data.result;
      setComCase(comcaseData);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });
  }, []);

  // 상품을 장바구니에 추가하기
  const onClickAddCart = (id, title, manufacturer, price) => {
    const data = { id, title, manufacturer, price };
    
    axios.post("/api/addcart", data).then((res) => {
      const cartData = res.data;
      setCart(cartData);
      console.log("추가 완료");
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });
  }

  // 상품을 장바구니에 삭제하기
  const OnClickDeleteCart = (id) => {
    axios.delete(`/api/deletecart/${id}`).then((res) => {
      const cartData = res.data;
      setCart(cartData);
      console.log("삭제 완료");
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });
  }

  // 상품을 장바구니에 추가하기
  const ProductComponent = ({ cpuItem }) => {
    return (
      <li key={cpuItem.cpu_id} className={(btnActive === 'cpu' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + cpuItem.cpu_image} className="product-image" alt="" />
        <span className="product-name">{cpuItem.cpu_manufacturer} {cpuItem.cpu_title}</span>
        <span className="product-spec">{cpuItem.cpu_core}코어 / {cpuItem.cpu_thread}쓰레드 / {cpuItem.cpu_clock}Ghz / {cpuItem.cpu_socket} / {cpuItem.cpu_wattage}W</span>
        <span className="product-price">{cpuItem.cpu_price.toLocaleString('ko-KR')}원</span>
        <div className="list-line"></div>
      </li>
    );
  };

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
              <div><input type="checkbox" id="cpu-amd"></input><span className="option-content">AMD</span></div>
              <div><input type="checkbox" id="cpu-intel"></input><span className="option-content">인텔</span></div>
              <div className="list-line"></div>
              <div className="option-title">코어 수</div>
              <div><input type="checkbox" id="cpu-4core"></input><span className="option-content">4</span></div>
              <div><input type="checkbox" id="cpu-6core"></input><span className="option-content">6</span></div>
              <div><input type="checkbox" id="cpu-12core"></input><span className="option-content">12</span></div>
              <div className="list-line"></div>
              <div className="option-title">소켓</div>
              <div><input type="checkbox" id="cpu-am4"></input><span className="option-content">AM4</span></div>
              <div><input type="checkbox" id="cpu-am5"></input><span className="option-content">AM5</span></div>
              <div><input type="checkbox" id="cpu-lga1700"></input><span className="option-content">LGA1700</span></div>
              <div className="list-line"></div>
            </span>
            {/* 쿨러 옵션 필터 */}
            <span className={(btnActive === 'cooler' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="cooler-3rsys"></input><span className="option-content">3RSYS</span></div>
              <div><input type="checkbox" id="cooler-nzxt"></input><span className="option-content">NZXT</span></div>
              <div><input type="checkbox" id="cooler-coolermaster"></input><span className="option-content">쿨러마스터</span></div>
              <div className="list-line"></div>
              <div className="option-title">냉각 방식</div>
              <div><input type="checkbox" id="cooler-air"></input><span className="option-content">공랭</span></div>
              <div><input type="checkbox" id="cooler-water"></input><span className="option-content">수랭</span></div>
              <div className="list-line"></div>
            </span>
            {/* 메인보드 옵션 필터 */}
            <span className={(btnActive === 'mainboard' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="mainboard-asrock"></input><span className="option-content">ASRock</span></div>
              <div><input type="checkbox" id="mainboard-asus"></input><span className="option-content">ASUS</span></div>
              <div><input type="checkbox" id="mainboard-msi"></input><span className="option-content">MSI</span></div> 
              <div className="list-line"></div>
              <div className="option-title">CPU</div>
              <div><input type="checkbox" id="mainboard-amd"></input><span className="option-content">AMD</span></div>
              <div><input type="checkbox" id="mainboard-intel"></input><span className="option-content">인텔</span></div>
              <div className="list-line"></div>
              <div className="option-title">소켓</div>
              <div><input type="checkbox" id="mainboard-am4"></input><span className="option-content">AM4</span></div>
              <div><input type="checkbox" id="mainboard-am5"></input><span className="option-content">AM5</span></div>
              <div><input type="checkbox" id="mainboard-lga1700"></input><span className="option-content">LGA1700</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox" id="mainboard-atx"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox" id="mainboard-matx"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
            </span>
            {/* 메모리 옵션 필터 */}
            <span className={(btnActive === 'memory' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="memory-gskill"></input><span className="option-content">G.SKILL</span></div>
              <div><input type="checkbox" id="memory-teamgroup"></input><span className="option-content">TeamGroup</span></div>
              <div><input type="checkbox" id="memory-samsung"></input><span className="option-content">삼성전자</span></div>
              <div className="list-line"></div>
              <div className="option-title">메모리용량</div>
              <div><input type="checkbox" id="memory-16gb"></input><span className="option-content">16GB</span></div>
              <div><input type="checkbox" id="memory-32gb"></input><span className="option-content">32GB</span></div>
              <div className="list-line"></div>
            </span>
            {/* 비디오카드 옵션 필터 */}
            <span className={(btnActive === 'videocard' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="videocard-asus"></input><span className="option-content">ASUS</span></div>
              <div><input type="checkbox" id="videocard-maxsun"></input><span className="option-content">MAXSUN</span></div>
              <div><input type="checkbox" id="videocard-msi"></input><span className="option-content">MSI</span></div>
              <div><input type="checkbox" id="videocard-zotac"></input><span className="option-content">ZOTAC</span></div>
              <div className="list-line"></div>
              <div className="option-title">메모리용량</div>
              <div><input type="checkbox" id="videocard-4gb"></input><span className="option-content">4GB</span></div>
              <div><input type="checkbox" id="videocard-6gb"></input><span className="option-content">6GB</span></div>
              <div><input type="checkbox" id="videocard-8gb"></input><span className="option-content">8GB</span></div>
              <div><input type="checkbox" id="videocard-12gb"></input><span className="option-content">12GB</span></div>
              <div><input type="checkbox" id="videocard-16gb"></input><span className="option-content">16GB</span></div>
              <div className="list-line"></div>
            </span>
            {/* 저장공간 옵션 필터 */}
            <span className={(btnActive === 'storage' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="storage-samsung"></input><span className="option-content">삼성전자</span></div>
              <div><input type="checkbox" id="storage-seagate"></input><span className="option-content">시게이트</span></div>
              <div className="list-line"></div>
              <div className="option-title">장치</div>
              <div><input type="checkbox" id="storage-hdd"></input><span className="option-content">HDD</span></div>
              <div><input type="checkbox" id="storage-sdd"></input><span className="option-content">SSD</span></div>
              <div className="list-line"></div>
            </span>
            {/* 파워 옵션 필터 */}
            <span className={(btnActive === 'power' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="power-micronics"></input><span className="option-content">마이크로닉스</span></div>
              <div><input type="checkbox" id="power-zalman"></input><span className="option-content">잘만</span></div>
              <div><input type="checkbox" id="power-coolermaster"></input><span className="option-content">쿨러마스터</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox" id="power-atx"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox" id="power-matx"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
              <div className="option-title">정격출력</div>
              <div><input type="checkbox" id="power-600w"></input><span className="option-content">600W</span></div>
              <div><input type="checkbox" id="power-700w"></input><span className="option-content">700W</span></div>
              <div><input type="checkbox" id="power-850w"></input><span className="option-content">850W</span></div>
              <div><input type="checkbox" id="power-1000w"></input><span className="option-content">1000W</span></div>
              <div className="list-line"></div>
            </span>
            {/* 케이스 옵션 필터 */}
            <span className={(btnActive === 'comcase' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="comcase-3rsys"></input><span className="option-content">3RSYS</span></div>
              <div><input type="checkbox" id="comcase-micronics"></input><span className="option-content">마이크로닉스</span></div>
              <div><input type="checkbox" id="comcase-abko"></input><span className="option-content">앱코</span></div>
              <div className="list-line"></div>
              <div className="option-title">크기</div>
              <div><input type="checkbox" id="comcase-mini"></input><span className="option-content">미니타워</span></div>
              <div><input type="checkbox" id="comcase-middle"></input><span className="option-content">미들타워</span></div>
              <div><input type="checkbox" id="comcase-big"></input><span className="option-content">빅타워</span></div>
              <div className="list-line"></div>
              <div className="option-title">폼팩터</div>
              <div><input type="checkbox" id="comcase-atx"></input><span className="option-content">ATX</span></div>
              <div><input type="checkbox" id="comcase-matx"></input><span className="option-content">M-ATX</span></div>
              <div className="list-line"></div>
            </span>
          </span>
          <span className="product-list">
            <ul>
              {/* CPU 상품 */}
              {CPU.map((cpuItem) => (
                <ProductComponent key={cpuItem.cpu_id} cpuItem={cpuItem} />
              ))}
              {/* 쿨러 상품 */}
              {Cooler.map((coolerItem) => (
                <li key={coolerItem.cooler_id} className={(btnActive === 'cooler' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + coolerItem.cooler_image} className="product-image" alt="" />
                  <span className="product-name">{coolerItem.cooler_manufacturer} {coolerItem.cooler_title}</span>
                  <span className="product-spec">{coolerItem.cooler_cooling} / {coolerItem.cooler_wattage}W</span>
                  <span className="product-price">{coolerItem.cooler_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 메인보드 상품 */}
              {Mainboard.map((mainboardItem) => (
                <li key={mainboardItem.mainboard_id} className={(btnActive === 'mainboard' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + mainboardItem.mainboard_image} className="product-image" alt="" />
                  <span className="product-name">{mainboardItem.mainboard_manufacturer} {mainboardItem.mainboard_title}</span>
                  <span className="product-spec">{mainboardItem.mainboard_cpu} / {mainboardItem.mainboard_socket} / {mainboardItem.mainboard_chipset} / {mainboardItem.mainboard_formfactors} / {mainboardItem.mainboard_wattage}W</span>
                  <span className="product-price">{mainboardItem.mainboard_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 메모리 상품 */}
              {Memory.map((memoryItem) => (
                <li key={memoryItem.memory_id} className={(btnActive === 'memory' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + memoryItem.memory_image} className="product-image" alt="" />
                  <span className="product-name">{memoryItem.memory_manufacturer} {memoryItem.memory_title}</span>
                  <span className="product-spec">{memoryItem.memory_capacity}GB / {memoryItem.memory_clock}Mhz / {memoryItem.memory_wattage}W</span>
                  <span className="product-price">{memoryItem.memory_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 비디오카드 상품 */}
              {VideoCard.map((videocardItem) => (
                <li key={videocardItem.videocard_id} className={(btnActive === 'videocard' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + videocardItem.videocard_image} className="product-image" alt="" />
                  <span className="product-name">{videocardItem.videocard_manufacturer} {videocardItem.videocard_title}</span>
                  <span className="product-spec">{videocardItem.videocard_chipset} / {videocardItem.videocard_capacity}GB / {videocardItem.videocard_clock}Mhz / {videocardItem.videocard_wattage}W</span>
                  <span className="product-price">{videocardItem.videocard_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 저장공간 상품 */}
              {Storage.map((storageItem) => (
                <li key={storageItem.storage_id} className={(btnActive === 'storage' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + storageItem.storage_image} className="product-image" alt="" />
                  <span className="product-name">{storageItem.storage_manufacturer} {storageItem.storage_title}</span>
                  <span className="product-spec">{storageItem.storage_device} / {storageItem.storage_capacity} / {storageItem.storage_wattage}W</span>
                  <span className="product-price">{storageItem.storage_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 파워 상품 */}
              {Power.map((powerItem) => (
                <li key={powerItem.power_id} className={(btnActive === 'power' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + powerItem.power_image} className="product-image" alt="" />
                  <span className="product-name">{powerItem.power_manufacturer} {powerItem.power_title}</span>
                  <span className="product-spec">{powerItem.power_formfactors} / {powerItem.power_output}W</span>
                  <span className="product-price">{powerItem.power_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
              {/* 케이스 상품 */}
              {ComCase.map((comcaseItem) => (
                <li key={comcaseItem.comcase_id} className={(btnActive === 'comcase' ? 'product' : 'hidden')}>
                  <div className="list-line"></div>
                  <img src={process.env.PUBLIC_URL + comcaseItem.comcase_image} className="product-image" alt="" />
                  <span className="product-name">{comcaseItem.comcase_manufacturer} {comcaseItem.comcase_title}</span>
                  <span className="product-spec">{comcaseItem.comcase_size} / {comcaseItem.comcase_formfactors}</span>
                  <span className="product-price">{comcaseItem.comcase_price.toLocaleString('ko-KR')}원</span>
                  <div className="list-line"></div>
                </li>
              ))}
            </ul>
          </span>
          {/* 부품 메뉴 선택 */}
          <span className="cart-list">
            <div>
              <div className={"cart-catalog" + (btnActive === 'cpu' ? ' active-catalog' : '')} onClick={() => { setBtnActive('cpu'); }}>CPU</div>
              <div className={"cart-order" + (btnActive === 'cpu' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'cooler' ? ' active-catalog' : '')} onClick={() => { setBtnActive('cooler'); }}>쿨러</div>
              <div className={"cart-order" + (btnActive === 'cooler' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'mainboard' ? ' active-catalog' : '')} onClick={() => { setBtnActive('mainboard'); }}>메인보드</div>
              <div className={"cart-order" + (btnActive === 'mainboard' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'memory' ? ' active-catalog' : '')} onClick={() => { setBtnActive('memory'); }}>메모리</div>
              <div className={"cart-order" + (btnActive === 'memory' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'videocard' ? ' active-catalog' : '')} onClick={() => { setBtnActive('videocard'); }}>비디오카드</div>
              <div className={"cart-order" + (btnActive === 'videocard' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'storage' ? ' active-catalog' : '')} onClick={() => { setBtnActive('storage'); }}>저장공간</div>
              <div className={"cart-order" + (btnActive === 'storage' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'power' ? ' active-catalog' : '')} onClick={() => { setBtnActive('power'); }}>파워</div>
              <div className={"cart-order" + (btnActive === 'power' ? ' active-order' : ' hidden')}></div>
            </div>
            <div>
              <div className={"cart-catalog" + (btnActive === 'comcase' ? ' active-catalog' : '')} onClick={() => { setBtnActive('comcase'); }}>케이스</div>
              <div className={"cart-order" + (btnActive === 'comcase' ? ' active-order' : ' hidden')}></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}