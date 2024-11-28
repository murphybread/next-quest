"use client";

import React, { useRef, useEffect, useState } from "react";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null); // 전체 컨테이너 참조
  const [currentPage, setCurrentPage] = useState(0); // 현재 활성화된 섹션
  const isScrolling = useRef(false); // 스크롤 중인지 추적

  const handleScroll = (event: WheelEvent) => {
    if (isScrolling.current) return; // 스크롤 중이면 무시

    isScrolling.current = true;
    setTimeout(() => (isScrolling.current = false), 1000); // 1초 후 스크롤 가능

    const deltaY = event.deltaY; // 스크롤 방향
    const sections = containerRef.current?.children;

    if (!sections || sections.length <= 1) {
      console.warn(
        "Single section or no sections found. Skipping scroll behavior.",
      );
      return;
    }

    let nextPage = currentPage;

    if (deltaY > 0 && currentPage < sections.length - 1) {
      // 아래로 스크롤
      nextPage += 1;
    } else if (deltaY < 0 && currentPage > 0) {
      // 위로 스크롤
      nextPage -= 1;
    }

    // 이동
    (sections[nextPage] as HTMLElement).scrollIntoView({
      behavior: "smooth",
    });
    setCurrentPage(nextPage); // 현재 페이지 갱신
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => handleScroll(event);

    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel); // Cleanup
  }, [currentPage]);

  return (
    <div ref={containerRef} style={{ height: "100vh", overflow: "hidden" }}>
      {children}
    </div>
  );
}

(SmoothScroll as any).description = `
1. 마우스 휠로 섹션을 스크롤합니다.
2. 현재 4가지의 페이지가 한 페이지안에서 스크롤로 보여집니다.
`;

export default SmoothScroll;
