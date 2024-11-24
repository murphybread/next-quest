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

const InfoContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  white-space: pre-wrap;
`;

interface DescriptiveComponent extends React.FC {
  description?: string;
}

interface DynamicButtonProps {
  component: DescriptiveComponent; // 렌더링할 컴포넌트 타입
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
        $isActive={isActive}
        $index={index}
      >
        {isActive ? `Deactivate ${componentName}` : `Activate ${componentName}`}
      </StyledButton>

      {/* 동적으로 렌더링되는 컴포넌트 */}
      {isActive && (
        <>
          <Component />
          {/* 설명 컨테이너 */}
          <InfoContainer>
            <h4>{componentName}</h4>
            <p>{Component.description}</p>
          </InfoContainer>
        </>
      )}
    </Container>
  );
};

export default DynamicButton;
