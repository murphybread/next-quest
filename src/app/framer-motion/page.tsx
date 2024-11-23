"use client";

import React, { useState } from "react";
import ClickableRotateRectangle from "@components/ClickableRotateRectangle";

const Page: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // 활성화 상태 관리

  return (
    <div>
      <button
        onClick={() => setIsActive((prev) => !prev)} // 활성화 상태 토글
        style={{
          position: "fixed", // 화면 기준 고정
          top: "50%", // 세로 중앙
          left: "20px", // 화면 왼쪽에서 20px
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {isActive ? "Deactivate" : "Activate"} Rectangle
      </button>
      {isActive && <ClickableRotateRectangle />}{" "}
      {/* 활성화 상태에 따라 렌더링 */}
    </div>
  );
};

export default Page;
