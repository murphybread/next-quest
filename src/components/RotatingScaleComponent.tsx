"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import React from "react";
import styled from "styled-components";

// 기본 스타일 정의
const StyledMotionDiv = styled(motion.div)`
  background: linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%);
  height: 100px;
  width: 100px;
  border-radius: 10px;
`;

const RotatingScaleComponent: React.FC = () => {
  // MotionValue와 Transform 정의
  const rotate = useMotionValue(0); // 회전 상태 구독
  const scale = useTransform(rotate, [0, 270], [0, 1]); // 회전에 따라 스케일 변화

  // Variants 정의
  const blockVariants = {
    initial: {
      rotate: 0,
    },
    target: {
      rotate: 270,
    },
  };

  return (
    <StyledMotionDiv
      style={{
        rotate, // MotionValue 연결
        scale, // Transform 연결
      }}
      variants={blockVariants} // Variants 연결
      initial="initial" // 초기 상태
      animate="target" // 애니메이션 종료 상태
      transition={{
        ease: "easeInOut", // 부드러운 진행
        duration: 4, // 4초 동안 진행
      }}
    />
  );
};

(RotatingScaleComponent as any).description = `
1. 회전과 스케일 변화를 동시에 적용합니다.
2. 회전이 0-270도변화시 스케일이 0-1로 변화합니다.
`;

export default RotatingScaleComponent;
