"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import styled from "styled-components";

const StyledMotionDiv = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: skyblue;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ClickableRotateRectangle: React.FC = () => {
  const [isRight, setIsRight] = useState(true); // 방향 상태

  const handleClick = () => {
    setIsRight((prev) => !prev); // 방향 전환
  };

  return (
    <StyledMotionDiv
      onClick={handleClick} // 클릭 이벤트
      initial={{ x: 0, rotate: 0 }} // 초기 상태
      animate={
        isRight
          ? { x: 100, rotate: 360 } // 오른쪽으로 이동하며 360도 회전
          : { x: -100, rotate: -360 } // 왼쪽으로 이동하며 -360도 회전
      }
      transition={{
        duration: 1, // 애니메이션 지속 시간
        ease: "easeInOut", // 부드럽게 연결
      }}
    />
  );
};

(ClickableRotateRectangle as any).description = `
1. 사각형을 클릭할 때마다 오른쪽으로 이동하며 360도 회전합니다.
2. 다시 클릭하면 왼쪽으로 이동하며 -360도 회전합니다.
`;

export default ClickableRotateRectangle;
