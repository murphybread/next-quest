import { useState } from "react";
import '@styles/card.css';

const frontImages: Record<number, string> = {
  0: '/images/initial_front.jpg', // 앞면 이미지
  1: '/images/question_1.jpg',
  2: '/images/question_1.jpg',
  3: 'https://storage.googleapis.com/magic-prompt-well/images/A%20small%2C%20twinkling%20star%20with%20a%20gentle%20golden%20glow.%20It%20floats%20just%20above%20the%20caster%27s%20shoulder%2C%20leaving%20a%20trail%20of%20shimmering%20stardust.%20Its%20light%20is%20soothing%20and%20warm%2C%20capable%20of%20providing%20guidance%20in%20the%20darkest%20of%20nights.png',
};

const backImages: string = '/images/card_back.jpg'; // 뒷면 이미지

const Card: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0); // 클릭 상태 추적
  const isBackVisible = animationStep >= 1 && animationStep <= 2; // 2~3단계에서는 뒷면 보임

  const flipCard = () => {
    setAnimationStep((prevStep) => (prevStep + 1) % 4); // 단계 순환: 0 → 1 → 2 → 3 → 0
  };

  return (
    <div
      className={`card 
        ${animationStep === 1 ? 'spinning' : ''} 
        ${animationStep === 2 ? 'slow-spin' : ''} 
        ${animationStep === 3 ? 'growing' : ''}`}
      onClick={flipCard}
    >
      <div className="card-border"
      style = {{
          transform:
            animationStep === 0 || animationStep === 3
              ? 'rotateY(0deg)' // 초기 또는 멈춘 상태: 앞면만 보임
              : 'rotateY(360deg)', // 회전 중: 앞뒤면 번갈아 보임
      }} >
        <div className="card-inner" style={{ transform: isBackVisible ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="card-front">
            <img src={frontImages[animationStep]} alt={`Card front ${animationStep}`} className="card-image" />
          </div>
          {isBackVisible && ( // 뒷면 표시 여부 조건
            <div className="card-back">
              <img src={backImages} alt="Card back" className="card-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
