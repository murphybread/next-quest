"use client";
import { motion } from "framer-motion";

const AnimatedBox: React.FC = () => {
  return (
    <motion.div
      initial={{ x: 0, rotate: 0 }} // 시작 상태
      animate={{ x: 100, rotate: 270 }} // 종료 상태
      transition={{ duration: 1, ease: "easeIn" }} // 변화 방식
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "skyblue",
      }}
    />
  );
};

export default AnimatedBox;
