import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const BOX_SHADOW = {
  BLUR_RADIUS: "120px",
  SHADOW_RADIUS: "30px",
};

// 애니메이션 정의
const spin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(1440deg); } /* 기본 5바퀴 */
`;

const slowSpin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(720deg); } /* 추가 1바퀴 */
`;

const grow = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
`;

const enhancedBlueGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(0, 0, 255, 0); }
  50% { box-shadow: 0 0 ${BOX_SHADOW["BLUR_RADIUS"]} ${BOX_SHADOW["SHADOW_RADIUS"]} rgba(0, 0, 255, 1); }
`;

const enhancedGoldGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0); }
  50% { box-shadow: 0 0 80px rgba(255, 215, 0, 1); }
`;

const enhancedRainbowGlow = keyframes`
  0%, 25% { box-shadow: 0 0 200px rgba(255, 0, 0, 1); }
  50% { box-shadow: 0 0 200px rgba(0, 255, 0, 1); }
  75% { box-shadow: 0 0 200px rgba(0, 0, 255, 1); }
  100% { box-shadow: 0 0 200px rgba(255, 255, 0, 1); }
`;

const particleEffect = keyframes`
  0% { 
    opacity: 1; 
    transform: scale(0.5) translate(0, 0);
  }
  100% { 
    opacity: 0; 
    transform: scale(2) translate(
      calc(var(--translateX, 0) * 100px), 
      calc(var(--translateY, 0) * 100px)
    );
  }
`;

const particleAnimation = css`
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.5),
      transparent 70%
    );
    animation: ${particleEffect} 2s ease-out infinite;
  }
  &::before {
    --translateX: 0.5;
    --translateY: -0.7;
  }
  &::after {
    --translateX: -0.5;
    --translateY: 0.7;
  }
`;

// 등급별 애니메이션 조합
const GradeAnimations = {
  rare: css`
    animation:
      ${spin} 5s linear forwards,
      ${slowSpin} 1s ease-in 5s forwards,
      ${enhancedBlueGlow} 1s linear 6s infinite;
  `,
  unique: css`
    animation:
      ${spin} 4s linear forwards,
      ${slowSpin} 1s ease-in 4s forwards,
      ${enhancedBlueGlow} 1s linear 5s infinite,
      ${slowSpin} 1s ease-in 5s forwards,
      ${enhancedGoldGlow} 1s linear 6s infinite;
  `,
  legendary: css`
    animation:
      ${spin} 4s linear forwards,
      ${slowSpin} 1s ease-in 4s forwards,
      ${enhancedBlueGlow} 1s linear 5s infinite,
      ${slowSpin} 1s ease-in 6s forwards,
      ${enhancedGoldGlow} 1s linear 7s infinite,
      ${slowSpin} 1s ease-in 8s forwards,
      ${enhancedRainbowGlow} 1s linear 9s infinite;
    ${particleAnimation}
  `,
  default: css`
    animation: ${spin} 4s linear forwards;
  `,
};

const CardContainer = styled.div`
  perspective: 1000px; /* 3D 효과 */
`;

const CardBorder = styled.div<{ $animationState: string; $grade: string }>`
  width: 224px;
  height: 324px;
  background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    linear-gradient(45deg, #bca373, #3b3b3b);
  border-radius: 15px;
  border: 12px solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;

  ${(props) => GradeAnimations[props.$grade] || GradeAnimations.default};
`;
const CardInner = styled.div`
  width: 224px;
  height: 324px;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.6s ease-out;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;

const CardFront = styled(CardFace)`
  transform: rotateY(0deg);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const frontImages = {
  0: "/images/initial_front.jpg",
  1: "/images/question_1.jpg",
  2: "/images/question_1.jpg",
  3: "/images/answer_1.jpg",
};

const backImage = "/images/card_back.jpg";

const Card = () => {
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return; // 이미 애니메이션 중이면 중복 실행 방지

    setIsAnimating(true);

    // 단계적으로 애니메이션 실행
    setAnimationStep(1); // 회전 시작
    setTimeout(() => setAnimationStep(2), 5000); // 느린 회전
    setTimeout(() => setAnimationStep(3), 7000); // 크기 증가
    setTimeout(() => {
      setIsAnimating(false); // 애니메이션 종료 상태로 변경
    }, 10000);
  };

  const handleClick = () => {
    if (!isAnimating) {
      // 애니메이션 중이 아닐 때만 처리
      if (animationStep === 0) {
        // 초기 상태에서 클릭하면 애니메이션 시작
        startAnimation();
      } else {
        // 애니메이션이 끝난 상태에서 클릭하면 초기화
        setAnimationStep(0);
      }
    }
  };

  const animationState =
    animationStep === 1
      ? "spinning"
      : animationStep === 2
        ? "slow-spin"
        : animationStep === 3
          ? "growing"
          : "none";

  return (
    <CardContainer onClick={handleClick}>
      <CardBorder $animationState={animationState} $grade="rare">
        <CardInner
          style={{
            transform:
              animationStep === 3 ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardFront>
            <CardImage
              src={frontImages[animationStep]}
              alt={`Card front ${animationStep}`}
            />
          </CardFront>
          <CardBack>
            <CardImage src={backImage} alt="Card back" />
          </CardBack>
        </CardInner>
      </CardBorder>
    </CardContainer>
  );
};

(Card as any).description = `
4번의 클릭으로 한 사이클이 동작합니다.
1. 초기상태 일반 카드 앞면 (대기 상태)
2. 첫번 째 클릭으로 카드가 회전하면서 어떤 카드가 나올지 숨겨집니다. (무한 회전)
3. 두번 째 클릭으로 카드가 천천히 속도가 느려지다가 멈춥니다.
4. 세번 째 클릭으로 카드가 커지면서 공개됩니다.
5. 네번 째 클릭으로 초기상태로 돌아갑니다.
`;

export default Card;
