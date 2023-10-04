import { useState, useEffect } from "react";
import axios from 'axios'

// 컴포넌트 파일
import Header from "./Component/Header.jsx";

export default function Keyword() {
  return (
    <div className="keyword-layer">
      <Header />
    </div>
  )
}