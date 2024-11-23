import React, { useState } from "react";

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
    <div>
      {/* 버튼 */}
      <button
        onClick={() => setIsActive((prev) => !prev)}
        style={{
          position: "fixed",
          top: `${20 + index * 60}px`, // 각 버튼이 겹치지 않도록 위치 조정
          left: "20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {isActive ? `Deactivate ${componentName}` : `Activate ${componentName}`}
      </button>

      {/* 동적으로 렌더링되는 컴포넌트 */}
      {isActive && <Component />}
    </div>
  );
};

export default DynamicButton;
