import { useState, useEffect } from "react";
import axios from 'axios'

// 이미지 파일 목록
import COMPATIBLE from "../images/compatible.png";
import WATTAGE from "../images/wattage.png";
import PRICE from "../images/price.png";
import LEFT from "../images/left.png";
import RIGHT from "../images/right.png";
import EXIT from "../images/exit.png";

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
  let [TotalPrice, setTotalPrice] = useState([]);
  
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

    // fetch 함수 목록
    fetchTotalPrice();
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 장바구니 총 가격을 계산한다.
  const fetchTotalPrice = () => {
    axios.get("/api/totalprice").then((res) => {
      const totalpriceData = res.data.result.total_price;
      setTotalPrice(totalpriceData[0].total_price);
    }).catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생: ', error);
    });
  }

  // 장바구니 목록을 불러온다.
  const fetchCart = () => {
    axios.get("/api/cart").then((res) => {
      const cartData = res.data.result;
      setCart(cartData);
      fetchTotalPrice();
    }).catch((error) => {
      console.error('장바구니 목록을 불러오는 중 오류 발생: ', error);
    });
  }

  // 해당 상품 수량 추가하기
  const OnClickAddCount = (id) => {
    axios.put(`/api/addcount/${id}`).then((res) => {
      fetchCart();
    }).catch((error) => {
      console.error('상품 개수를 추가하는 중 오류 발생: ', error);
    });
  }

  // 해당 상품 수량 삭제하기
  const OnClickMinusCount = (count, id) => {
    // 상품의 개수가 1개 이상일 때만 삭제 가능
    if (count > 1) {
      axios.put(`/api/minuscount/${id}`).then((res) => {
        fetchCart();
      }).catch((error) => {
        console.error('상품 개수를 삭제하는 중 오류 발생: ', error);
      })
    }
  }

  // 상품을 장바구니에 추가하기
  const onClickAddCart = (id, title, manufacturer, price) => {
    // 장바구니에 상품이 있는 지 확인
    const existingCartItem = Cart.find(item => item.product_id === id);

    if (existingCartItem) {
      // 상품에 장바구니가 있으면 실행 X
    } else {
      // 상품을 장바구니에 추가한다.
      const data = { id, title, manufacturer, price };
      axios.post("/api/addcart", data).then((res) => {
        fetchCart();
      }).catch((error) => {
        console.error('데이터를 추가하는 중 오류 발생: ', error);
      });
    }
  }

  // 상품을 장바구니에 삭제하기
  const OnClickDeleteCart = (id) => {
    axios.delete(`/api/deletecart/${id}`).then((res) => {
      fetchCart();
    }).catch((error) => {
      console.error('데이터를 삭제하는 중 오류 발생: ', error);
    });
  }

  // 모든 상품을 초기화하기
  const OnClickReset = () => {
    if(window.confirm("정말로 초기화하시겠습니까?")) {
      axios.delete("/api/resetcart").then((res) => {
        fetchCart();
      }).catch((error) => {
        console.error('데이터를 초기화하는 중 오류 발생: ', error);
      });
    } else {
      return;
    }
  }

  // 상품을 장바구니에 추가하는 핸들러
  const handleAddToCart = (id, title, manufacturer, price) => { 
    onClickAddCart(id, title, manufacturer, price);
  };

  // 상품을 장바구니에 삭제하는 핸들러
  const handleDeleteFromCart = (id) => {
    OnClickDeleteCart(id);
  }

  // CPU 체크박스 필터 기능
  const [amdChecked, setAmdChecked] = useState(false);
  const [intelChecked, setIntelChecked] = useState(false);
  const [core4Checked, setCore4Checked] = useState(false);
  const [core6Checked, setCore6Checked] = useState(false);
  const [core12Checked, setCore12Checked] = useState(false);
  const [am4Checked, setAm4Checked] = useState(false);
  const [am5Checked, setAm5Checked] = useState(false);
  const [lga1700Checked, setLga1700Checked] = useState(false);

  const filterCPU = (cpuList) => {
    let filteredCPU = cpuList.filter(cpu => {
      // 체크박스가 모두 해제되었을 때, 모든 상품을 반환
      if (!amdChecked && !intelChecked && !core4Checked && !core6Checked && !core12Checked && !am4Checked && !am5Checked && !lga1700Checked)
        return true;
      
      // CPU 제조사
      if (amdChecked && cpu.cpu_manufacturer === 'AMD')
        return true;
      else if (intelChecked && cpu.cpu_manufacturer === '인텔')
        return true;
      
      // CPU 코어 수
      if (core4Checked && cpu.cpu_core === 4)
        return true;
      else if (core6Checked && cpu.cpu_core === 6)
        return true;
      else if (core12Checked && cpu.cpu_core === 12)
        return true;

      // CPU 소켓
      if (am4Checked && cpu.cpu_socket === 'AM4')
        return true;
      else if (am5Checked && cpu.cpu_socket === 'AM5')
        return true;
      else if (lga1700Checked && cpu.cpu_socket === 'LGA1700')
        return true;

      return false;
    });
    return filteredCPU;
  }

  // CPU 체크박스 이벤트
  const handleAmdCheckboxChange = (event) => {
    setAmdChecked(event.target.checked);
  };
  
  const handleIntelCheckboxChange = (event) => {
    setIntelChecked(event.target.checked);
  };

  const handleCore4CheckboxChange = (event) => {
    setCore4Checked(event.target.checked);
  };

  const handleCore6CheckboxChange = (event) => {
    setCore6Checked(event.target.checked);
  };

  const handleCore12CheckboxChange = (event) => {
    setCore12Checked(event.target.checked);
  };

  const handleAm4CheckboxChange = (event) => {
    setAm4Checked(event.target.checked);
  };

  const handleAm5CheckboxChange = (event) => {
    setAm5Checked(event.target.checked);
  };

  const handleLga1700CheckboxChange = (event) => {
    setLga1700Checked(event.target.checked);
  };

  // CPU 컴포넌트
  const CpuComponent = ({ cpuItem }) => {
    return (
      <li key={cpuItem.cpu_id} className={(btnActive === 'cpu' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + cpuItem.cpu_image} className="product-image" alt="" />
        <span className="product-name">{cpuItem.cpu_manufacturer} {cpuItem.cpu_title}</span>
        <span className="product-spec">{cpuItem.cpu_core}코어 / {cpuItem.cpu_thread}쓰레드 / {cpuItem.cpu_clock}Ghz / {cpuItem.cpu_socket} / {cpuItem.cpu_wattage}W</span>
        <span className="product-price">{cpuItem.cpu_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(cpuItem.cpu_id, cpuItem.cpu_title, cpuItem.cpu_manufacturer, cpuItem.cpu_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(cpuItem.cpu_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 쿨러 체크박스 필터 기능
  const [rsys3Checked, setRsys3Checked] = useState(false);
  const [nzxtChecked, setNzxtChecked] = useState(false);
  const [coolermasterChecked, setCoolermasterChecked] = useState(false);
  const [airChecked, setAirChecked] = useState(false);
  const [waterChecked, setWaterChecked] = useState(false);

  const filterCooler = (coolerList) => {
    let filteredCooler = coolerList.filter(cooler => {
      // 체크박스가 모두 해제되었을 때, 모든 상품을 반환
      if (!rsys3Checked && !nzxtChecked && !coolermasterChecked && !airChecked && !waterChecked)
        return true;
      
      // 쿨러 제조사
      if (rsys3Checked && cooler.cooler_manufacturer === '3RSYS')
        return true;
      else if (nzxtChecked && cooler.cooler_manufacturer === 'NZXT')
        return true;
      else if (coolermasterChecked && cooler.cooler_manufacturer === '쿨러마스터')
        return true;
      
      // 냉각 방식
      if (airChecked && cooler.cooler_cooling === '공랭')
        return true;
      else if (waterChecked && cooler.cooler_cooling === '수랭')
        return true;
      
      return false;
    });
    return filteredCooler;
  }

  // 쿨러 체크박스 이벤트
  const handle3rsysCheckboxChange = (event) => {
    setRsys3Checked(event.target.checked);
  };

  const handleNzxtCheckboxChange = (event) => {
    setNzxtChecked(event.target.checked);
  };

  const handleCoolerMasterCheckboxChange = (event) => {
    setCoolermasterChecked(event.target.checked);
  };

  const handleAirCheckboxChange = (event) => {
    setAirChecked(event.target.checked);
  };

  const handleWaterCheckboxChange = (event) => {
    setWaterChecked(event.target.checked);
  };

  // 쿨러 컴포넌트
  const CoolerComponent = ({ coolerItem }) => {
    return (
      <li key={coolerItem.cooler_id} className={(btnActive === 'cooler' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + coolerItem.cooler_image} className="product-image" alt="" />
        <span className="product-name">{coolerItem.cooler_manufacturer} {coolerItem.cooler_title}</span>
        <span className="product-spec">{coolerItem.cooler_cooling} / {coolerItem.cooler_wattage}W</span>
        <span className="product-price">{coolerItem.cooler_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(coolerItem.cooler_id, coolerItem.cooler_title, coolerItem.cooler_manufacturer, coolerItem.cooler_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(coolerItem.cooler_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 메인보드 컴포넌트
  const MainboardComponent = ({ mainboardItem }) => {
    return (
      <li key={mainboardItem.mainboard_id} className={(btnActive === 'mainboard' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + mainboardItem.mainboard_image} className="product-image" alt="" />
        <span className="product-name">{mainboardItem.mainboard_manufacturer} {mainboardItem.mainboard_title}</span>
        <span className="product-spec">{mainboardItem.mainboard_cpu} / {mainboardItem.mainboard_socket} / {mainboardItem.mainboard_chipset} / {mainboardItem.mainboard_formfactors} / {mainboardItem.mainboard_wattage}W</span>
        <span className="product-price">{mainboardItem.mainboard_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(mainboardItem.mainboard_id, mainboardItem.mainboard_title, mainboardItem.mainboard_manufacturer, mainboardItem.mainboard_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(mainboardItem.mainboard_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 메모리 컴포넌트
  const MemoryComponent = ({ memoryItem }) => {
    return (
      <li key={memoryItem.memory_id} className={(btnActive === 'memory' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + memoryItem.memory_image} className="product-image" alt="" />
        <span className="product-name">{memoryItem.memory_manufacturer} {memoryItem.memory_title}</span>
        <span className="product-spec">{memoryItem.memory_capacity}GB / {memoryItem.memory_clock}Mhz / {memoryItem.memory_wattage}W</span>
        <span className="product-price">{memoryItem.memory_price.toLocaleString('ko-KR')}원</span>
        <div className="list-line"></div>
        <button className="product-button" onClick={() => handleAddToCart(memoryItem.memory_id, memoryItem.memory_title, memoryItem.memory_manufacturer, memoryItem.memory_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(memoryItem.memory_id)}>삭제</button>
      </li>
    );
  };

  // 비디오카드 컴포넌트
  const VideocardComponent = ({ videocardItem }) => {
    return (
      <li key={videocardItem.videocard_id} className={(btnActive === 'videocard' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + videocardItem.videocard_image} className="product-image" alt="" />
        <span className="product-name">{videocardItem.videocard_manufacturer} {videocardItem.videocard_title}</span>
        <span className="product-spec">{videocardItem.videocard_chipset} / {videocardItem.videocard_capacity}GB / {videocardItem.videocard_clock}Mhz / {videocardItem.videocard_wattage}W</span>
        <span className="product-price">{videocardItem.videocard_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(videocardItem.videocard_id, videocardItem.videocard_title, videocardItem.videocard_manufacturer, videocardItem.videocard_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(videocardItem.videocard_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 저장공간 컴포넌트
  const StorageComponent = ({ storageItem }) => {
    return (
      <li key={storageItem.storage_id} className={(btnActive === 'storage' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + storageItem.storage_image} className="product-image" alt="" />
        <span className="product-name">{storageItem.storage_manufacturer} {storageItem.storage_title}</span>
        <span className="product-spec">{storageItem.storage_device} / {storageItem.storage_capacity} / {storageItem.storage_wattage}W</span>
        <span className="product-price">{storageItem.storage_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(storageItem.storage_id, storageItem.storage_title, storageItem.storage_manufacturer, storageItem.storage_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(storageItem.storage_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 파워 컴포넌트
  const PowerComponent = ({ powerItem }) => {
    return (
      <li key={powerItem.power_id} className={(btnActive === 'power' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + powerItem.power_image} className="product-image" alt="" />
        <span className="product-name">{powerItem.power_manufacturer} {powerItem.power_title}</span>
        <span className="product-spec">{powerItem.power_formfactors} / {powerItem.power_output}W</span>
        <span className="product-price">{powerItem.power_price.toLocaleString('ko-KR')}원</span>
        <button className="product-button" onClick={() => handleAddToCart(powerItem.power_id, powerItem.power_title, powerItem.power_manufacturer, powerItem.power_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(powerItem.power_id)}>삭제</button>
        <div className="list-line"></div>
      </li>
    );
  };

  // 케이스 컴포넌트
  const ComcaseComponent = ({ comcaseItem }) => {
    return (
      <li key={comcaseItem.comcase_id} className={(btnActive === 'comcase' ? 'product' : 'hidden')}>
        <div className="list-line"></div>
        <img src={process.env.PUBLIC_URL + comcaseItem.comcase_image} className="product-image" alt="" />
        <span className="product-name">{comcaseItem.comcase_manufacturer} {comcaseItem.comcase_title}</span>
        <span className="product-spec">{comcaseItem.comcase_size} / {comcaseItem.comcase_formfactors}</span>
        <span className="product-price">{comcaseItem.comcase_price.toLocaleString('ko-KR')}원</span>
        <div className="list-line"></div>
        <button className="product-button" onClick={() => handleAddToCart(comcaseItem.comcase_id, comcaseItem.comcase_title, comcaseItem.comcase_manufacturer, comcaseItem.comcase_price)}>추가</button>
        <button className="product-button" onClick={() => handleDeleteFromCart(comcaseItem.comcase_id)}>삭제</button>
      </li>
    );
  }

  return (
    <div className="quote-layer">
      <Header />
      <div className="quote-form">
        {/* 부품 메뉴 선택 */}
        <div className="quote-menu">
          <span className={"cart-menu left1" + (btnActive === 'cpu' ? ' active-menu' : '')} onClick={() => { setBtnActive('cpu'); }}>CPU</span>
          <span className={"cart-menu" + (btnActive === 'cooler' ? ' active-menu' : '')} onClick={() => { setBtnActive('cooler'); }}>쿨러</span>
          <span className={"cart-menu" + (btnActive === 'mainboard' ? ' active-menu' : '')} onClick={() => { setBtnActive('mainboard'); }}>메인보드</span>
          <span className={"cart-menu right1" + (btnActive === 'memory' ? ' active-menu' : '')} onClick={() => { setBtnActive('memory'); }}>메모리</span>
          <span className={"cart-menu bottom left2" + (btnActive === 'videocard' ? ' active-menu' : '')} onClick={() => { setBtnActive('videocard'); }}>비디오카드</span>
          <span className={"cart-menu bottom" + (btnActive === 'storage' ? ' active-menu' : '')} onClick={() => { setBtnActive('storage'); }}>저장공간</span>
          <span className={"cart-menu bottom" + (btnActive === 'power' ? ' active-menu' : '')} onClick={() => { setBtnActive('power'); }}>파워</span>
          <span className={"cart-menu bottom right2" + (btnActive === 'comcase' ? ' active-menu' : '')} onClick={() => { setBtnActive('comcase'); }}>케이스</span>
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
            <span className="text-bar text-price">{Number(TotalPrice).toLocaleString('ko-KR')}</span>
            <span className="text-bar">원</span>
          </span>
        </div>
        <div>
          <span className="option-list">
            {/* CPU 옵션 필터 */}
            <span className={(btnActive === 'cpu' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="cpu-amd" onChange={handleAmdCheckboxChange}></input><span className="option-content">AMD</span></div>
              <div><input type="checkbox" id="cpu-intel" onChange={handleIntelCheckboxChange}></input><span className="option-content">인텔</span></div>
              <div className="list-line"></div>
              <div className="option-title">코어 수</div>
              <div><input type="checkbox" id="cpu-4core" onChange={handleCore4CheckboxChange}></input><span className="option-content">4</span></div>
              <div><input type="checkbox" id="cpu-6core" onChange={handleCore6CheckboxChange}></input><span className="option-content">6</span></div>
              <div><input type="checkbox" id="cpu-12core" onChange={handleCore12CheckboxChange}></input><span className="option-content">12</span></div>
              <div className="list-line"></div>
              <div className="option-title">소켓</div>
              <div><input type="checkbox" id="cpu-am4" onChange={handleAm4CheckboxChange}></input><span className="option-content">AM4</span></div>
              <div><input type="checkbox" id="cpu-am5" onChange={handleAm5CheckboxChange}></input><span className="option-content">AM5</span></div>
              <div><input type="checkbox" id="cpu-lga1700" onChange={handleLga1700CheckboxChange}></input><span className="option-content">LGA1700</span></div>
              <div className="list-line"></div>
            </span>
            {/* 쿨러 옵션 필터 */}
            <span className={(btnActive === 'cooler' ? '' : 'hidden')}>
              <div className="list-line"></div>
              <div className="option-title">제조사</div>
              <div><input type="checkbox" id="cooler-3rsys" onChange={handle3rsysCheckboxChange}></input><span className="option-content">3RSYS</span></div>
              <div><input type="checkbox" id="cooler-nzxt" onChange={handleNzxtCheckboxChange}></input><span className="option-content">NZXT</span></div>
              <div><input type="checkbox" id="cooler-coolermaster" onChange={handleCoolerMasterCheckboxChange}></input><span className="option-content">쿨러마스터</span></div>
              <div className="list-line"></div>
              <div className="option-title">냉각 방식</div>
              <div><input type="checkbox" id="cooler-air" onChange={handleAirCheckboxChange}></input><span className="option-content">공랭</span></div>
              <div><input type="checkbox" id="cooler-water" onChange={handleWaterCheckboxChange}></input><span className="option-content">수랭</span></div>
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
              {filterCPU(CPU).map((cpuItem) => (
                <CpuComponent key={cpuItem.cpu_id} cpuItem={cpuItem} />
              ))}
              {/* 쿨러 상품 */}
              {filterCooler(Cooler).map((coolerItem) => (
                <CoolerComponent key={coolerItem.cooler_id} coolerItem={coolerItem} />
              ))}
              {/* 메인보드 상품 */}
              {Mainboard.map((mainboardItem) => (
                <MainboardComponent key={mainboardItem.mainboard_id} mainboardItem={mainboardItem} />
              ))}
              {/* 메모리 상품 */}
              {Memory.map((memoryItem) => (
                <MemoryComponent key={memoryItem.memory_id} memoryItem={memoryItem} />
              ))}
              {/* 비디오카드 상품 */}
              {VideoCard.map((videocardItem) => (
                <VideocardComponent key={videocardItem.videocard_id} videocardItem={videocardItem} />
              ))}
              {/* 저장공간 상품 */}
              {Storage.map((storageItem) => (
                <StorageComponent key={storageItem.storage_id} storageItem={storageItem} />
              ))}
              {/* 파워 상품 */}
              {Power.map((powerItem) => (
                <PowerComponent key={powerItem.power_id} powerItem={powerItem} />
              ))}
              {/* 케이스 상품 */}
              {ComCase.map((comcaseItem) => (
                <ComcaseComponent key={comcaseItem.comcase_id} comcaseItem={comcaseItem} />
              ))}
            </ul>
          </span>
          <span className="cart-list">
            {/* 장바구니 목록 */}
            {Cart.map((cartItem) => (
              <li key={cartItem.quote_order_id} className="basket">
                <span className="basket-title">{cartItem.product_manufacturer} {cartItem.product_title}</span>
                <div>
                  <img src={EXIT} className="basket-exit" onClick={() => OnClickDeleteCart(cartItem.product_id)} alt="" />
                </div>
                <div>
                  <img src={LEFT} className="basket-left" onClick={() => OnClickMinusCount(cartItem.product_count, cartItem.product_id)} alt="" />
                  <span className="basket-count">{cartItem.product_count}</span>
                  <img src={RIGHT} className="basket-right" onClick={() => OnClickAddCount(cartItem.product_id)} alt="" />
                </div>
                <span className="basket-price">{cartItem.product_price.toLocaleString('ko-KR')}원</span>
              </li>
            ))}
          </span>
        </div>
        <div>
          <span className="quote-button" onClick={OnClickReset}>초기화</span>
          <span className="quote-button">주문</span>
        </div>
      </div>
    </div>
  )
}