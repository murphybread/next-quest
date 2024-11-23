"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

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
    <motion.div
      style={{
        background: "linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%)",
        height: "100px",
        width: "100px",
        borderRadius: "10px",
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

export default RotatingScaleComponent;
