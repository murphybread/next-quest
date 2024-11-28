import SmoothScroll from "@components/SmoothScroll";
import Sections from "@components/Sections/Sections";

const SmoothScrollwithSection = () => {
  return (
    <SmoothScroll>
      <Sections />;
    </SmoothScroll>
  );
};

(SmoothScrollwithSection as any).description = `
1. 마우스 휠로 섹션을 스크롤합니다.
2. 현재 4가지의 페이지가 한 페이지안에서 스크롤로 보여집니다.
`;

export default SmoothScrollwithSection;
