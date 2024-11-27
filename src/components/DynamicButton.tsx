import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import InfoContainer from "@components/InfoContainer";
// Styled-components
const StyledButton = styled.button<{ $isActive: boolean }>`
  margin: 10px;
  padding: 10px 20px;
  background-color: ${(props) => (props.$isActive ? "green" : "grey")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AnimationContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: lightgray;
  border-radius: 10px;
  text-align: center;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DynamicButton = ({ component: Component, componentName }: any) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const router = useRouter();

  return (
    <div>
      <StyledButton
        onClick={() => {
          setIsPreviewVisible((prev) => !prev); // 프리뷰 상태 활성화
        }}
        $isActive={isPreviewVisible}
      >
        Show {componentName}
      </StyledButton>

      {/* 애니메이션과 프리뷰 */}
      {isPreviewVisible && (
        <>
          <InfoContainer
            componentName={componentName}
            description={Component.description}
          />
          <AnimationContainer>
            <Component /> {/* 컴포넌트 프리뷰 */}
            <StyledButton
              onClick={() => {
                router.push(`/${componentName}`); // 라우팅
              }}
              $isActive={isPreviewVisible}
            >
              View Details
            </StyledButton>
          </AnimationContainer>
        </>
      )}
    </div>
  );
};

export default DynamicButton;
