"use client";

import React, { useRef, useEffect, useState } from "react";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null); // DOM의 현재 <div> 요소를 참조하여 자식 섹션 탐색 + scrollIntoView로 스크롤 이동 제어
  const [currentPage, setCurrentPage] = useState(0); // 현재 활성화된 섹션
  const isScrolling = useRef(false); // 스크롤 중인지 추적

  const handleScroll = (event: WheelEvent) => {
    if (isScrolling.current) return; // 스크롤 중이면 무시

    isScrolling.current = true;
    setTimeout(() => (isScrolling.current = false), 1000); // 1초 후 스크롤 가능

    const deltaY = event.deltaY; // 스크롤 방향
    const sections = containerRef.current?.children;

    // 만약 페이지가 1개이하면 특별한 동작 안함
    if (!sections || sections.length <= 1) {
      console.warn(
        "Single section or no sections found. Skipping scroll behavior.",
      );
      return;
    }

    let nextPage = currentPage;

    // 아래로이동시 및 현재페이지가 마지막이 아니면 다음 div(페이지)로이동
    // 스크롤 위로 이동시 현재페이지가 0이 아니면 이전 div(페이지)로 이동
    if (deltaY > 0 && currentPage < sections.length - 1) {
      nextPage += 1;
    } else if (deltaY < 0 && currentPage > 0) {
      // 위로 스크롤
      nextPage -= 1;
    }

    //scrollIntoView 를 사용하기위해 Element에서 HtmlElement로 캐스팅
    // scroolIntoView로 특정 섹션으로 화면이동
    (sections[nextPage] as HTMLElement).scrollIntoView({
      behavior: "smooth",
    });
    setCurrentPage(nextPage); // 현재 페이지 갱신
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => handleScroll(event);

    window.addEventListener("wheel", handleWheel); // wheel 이벤트를 추적하며 발견시에 handleWheel 호출

    return () => window.removeEventListener("wheel", handleWheel); // currentPage가 변경되면 wheel 이벤트 제거
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
