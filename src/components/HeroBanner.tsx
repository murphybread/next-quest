"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";

// 스타일 정의
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.$backgroundColor || "#f5f5f5"}; /* $로 프롭스를 CSS 처리 */
  font-size: 24px;
`;

const StyledSlideNextButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  cursor: pointer;
`;

const StyledSlidePrevButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 40px;
  z-index: 10;
  cursor: pointer;
`;

const slides = [
  { content: "Page 1 Content", backgroundColor: "#FFD700" },
  { content: "Page 2 Content", backgroundColor: "#87CEEB" },
  { content: "Page 3 Content", backgroundColor: "#FF6347" },
  { content: "Page 4 Content", backgroundColor: "#90EE90" },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 클라이언트에서 상태를 업데이트하는 타이머 설정
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      {/* AnimatePresence로 상태 기반 슬라이드 전환 */}
      <AnimatePresence>
        <Slide
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          $backgroundColor={slides[currentIndex].backgroundColor} // $로 처리하여 DOM 전달 방지
        >
          {slides[currentIndex].content}
        </Slide>
      </AnimatePresence>

      {/* 좌우 이동 버튼 */}
      <StyledSlideNextButton
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
        }
      >
        &gt;
      </StyledSlideNextButton>
      <StyledSlidePrevButton
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
          )
        }
      >
        &lt;
      </StyledSlidePrevButton>
    </SliderContainer>
  );
};

(HeroBanner as any).description = `
1. 자동으로 5초마다 다음 슬라이들 이동
2. 오른쪽 아래의 좌우 버튼을 통해 next, prev 슬라이드 이동
`;

export default HeroBanner;
