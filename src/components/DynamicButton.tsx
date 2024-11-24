import React, { useState } from "react";
import styled from "styled-components";

// Styled-components
const StyledButton = styled.button<{ $isActive: boolean; $index: number }>`
  position: fixed;
  left: 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? "green" : "gray")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  top: ${(props) =>
    `${20 + props.$index * 60}px`}; // 각 버튼이 겹치지 않도록 위치 조정
`;

const Container = styled.div`
  position: relative;
`;

interface DynamicButtonProps {
  component: React.FC; // 렌더링할 컴포넌트 타입
  componentName: string; // 버튼에 표시될 이름
  index: number; // 버튼의 순서
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  component: Component,
  componentName,
  index,
}) => {
  const [isActive, setIsActive] = useState(false); // 활성화 상태 관리

  return (
    <Container>
      {/* 버튼 */}
      <StyledButton
        onClick={() => setIsActive((prev) => !prev)}
        $isActive={isActive} // Transient Prop으로 전달
        $index={index} // Transient Prop으로 전달
      >
        {isActive ? `Deactivate ${componentName}` : `Activate ${componentName}`}
      </StyledButton>

      {/* 동적으로 렌더링되는 컴포넌트 */}
      {isActive && <Component />}
    </Container>
  );
};

export default DynamicButton;
