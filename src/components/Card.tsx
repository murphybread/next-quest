import { useState } from "react";
import styled, { keyframes, css } from "styled-components";

// 애니메이션 정의
const spin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(1800deg); } /* 기본 5바퀴 */
`;

const slowSpin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); } /* 추가 1바퀴 */
`;

const grow = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
`;

const enhancedBlueGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(0, 0, 255, 0); }
  50% { box-shadow: 0 0 80px rgba(0, 0, 255, 1); }
`;

const enhancedGoldGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0); }
  50% { box-shadow: 0 0 80px rgba(255, 215, 0, 1); }
`;

const enhancedRainbowGlow = keyframes`
  0%, 25% { box-shadow: 0 0 40px rgba(255, 0, 0, 1); }
  50% { box-shadow: 0 0 80px rgba(0, 255, 0, 1); }
  75% { box-shadow: 0 0 80px rgba(0, 0, 255, 1); }
  100% { box-shadow: 0 0 80px rgba(255, 255, 0, 1); }
`;

const particleEffect = keyframes`
  0% { opacity: 1; transform: scale(1) translate(0, 0); }
  100% { opacity: 0; transform: scale(2) translate(calc(100px * var(--x)), calc(100px * var(--y))); }
`;

const Particle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${particleEffect} 1s ease-out infinite;
  transform-origin: center;
  --x: ${(props: { x: number }) => props.x}; /* x축 방향 */
  --y: ${(props: { y: number }) => props.y}; /* y축 방향 */
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
      ${spin} 5s linear forwards,
      ${slowSpin} 1s ease-in 5s forwards,
      ${enhancedBlueGlow} 1s linear 6s infinite,
      ${slowSpin} 1s ease-in 6s forwards,
      ${enhancedGoldGlow} 1s linear 7s infinite;
  `,
  legendary: css`
    animation:
      ${spin} 5s linear forwards,
      ${slowSpin} 1s ease-in 5s forwards,
      ${enhancedBlueGlow} 1s linear 6s infinite,
      ${slowSpin} 1s ease-in 6s forwards,
      ${enhancedGoldGlow} 1s linear 7s infinite,
      ${slowSpin} 1s ease-in 7s forwards,
      ${enhancedRainbowGlow} 1s linear 8s infinite;
  `,
  default: css`
    animation: ${spin} 5s linear forwards;
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

  const flipCard = () => {
    setAnimationStep((prevStep) => (prevStep + 1) % 4);
  };

  const animationState =
    animationStep === 1
      ? "spinning"
      : animationStep === 2
        ? "slow-spin"
        : animationStep === 3
          ? "growing"
          : "none"; // 기본값을 none으로 설정하여 애니메이션 안함

  return (
    <CardContainer onClick={flipCard}>
      <CardBorder $animationState={animationState} $grade="legendary">
        <CardInner>
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
1. 초기상태 일반 카드 앞면
2. 첫번 째 클릭으로 카드가 회전하면서 어떤 카드가 나올지 숨겨집니다. (무한 회전)
3. 두번 째 클릭으로 카드가 천천히 속도가 느려지다가 멈춥니다.
4. 세번 째 클릭으로 카드가 커지면서 공개됩니다.
5. 네번 째 클릭으로 초기상태로 돌아갑니다.
`;

export default Card;
