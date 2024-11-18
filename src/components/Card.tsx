import { useState } from "react";
import '@styles/card.css';

// 애니메이션 상태에 따라 표시할 텍스트를 객체로 관리
const frontText: Record<number, string>  = {
  0: 'Start Front',
  1: '?',
  2: '?',
  3: 'End Front',
};



const Card: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0); // 애니메이션 상태 추적

  const flipCard = () => {
    setAnimationStep((prevStep) => (prevStep + 1) % 4); // 4단계 순차적으로 변경
  };

  return (
    <div
      className={`card 
        ${animationStep === 1 ? 'spinning' : ''} 
        ${animationStep === 2 ? 'slow-spin' : ''} 
        ${animationStep === 3 ? 'growing' : ''}`}
      onClick={flipCard}
    >
      <div className="card-inner">
        <div className="card-front">
          <h2>{frontText[animationStep]}</h2>
        </div>
        <div className="card-back">
          <h2>Back</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;