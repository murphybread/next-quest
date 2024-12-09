import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

type GradeType = 'rare' | 'unique' | 'legendary' | 'default';
type AnimationPhase = 'initial' | 'spinning' | 'gradeEffect' | 'reveal';

const CARD_SPIN_TIME = {
  DEFAULT: 5000, // 기본 회전 시간
  GRADE_EFFECT: 1000, // 등급 효과 시간
  SLOW_SPIN: 1000,
};

// 애니메이션 키프레임 정의
const spin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(1800deg); }
`;

const slowSpin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const grow = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
`;
const enhancedBlueGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(0, 0, 255, 0); }
  50% { box-shadow: 0 0 120px 30px rgba(0, 0, 255, 1); }
`;

const enhancedGoldGlow = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0); }
  50% { box-shadow: 0 0 80px 30px rgba(255, 215, 0, 1); }
`;

const enhancedRainbowGlow = keyframes`
  0%, 25% { box-shadow: 0 0 200px rgba(255, 0, 0, 1); }
  50% { box-shadow: 0 0 200px rgba(0, 255, 0, 1); }
  75% { box-shadow: 0 0 200px rgba(0, 0, 255, 1); }
  100% { box-shadow: 0 0 200px rgba(255, 255, 0, 1); }
`;

const particleEffect = keyframes`
  0% { opacity: 0.6; transform: translate(0, 0) scale(1); }
  100% { opacity: 1; transform: translate(calc(var(--x) * 100px), calc(var(--y) * 100px)) scale(0.5);
`;

// 등급별 애니메이션 조합
const GradeAnimations = {
  getAnimation: (phase: AnimationPhase) => {
    const defaultAnimation = css`${spin} ${CARD_SPIN_TIME.DEFAULT}ms linear forwards`;
    const rareEffect = css`${enhancedBlueGlow} ${CARD_SPIN_TIME.GRADE_EFFECT}ms linear infinite`;
    const uniqueEffect = css`${enhancedGoldGlow} ${CARD_SPIN_TIME.GRADE_EFFECT}ms linear infinite`;
    const legendaryEffect = css`${enhancedRainbowGlow} ${CARD_SPIN_TIME.GRADE_EFFECT}ms linear infinite`;

    const rareAnimation = css`${slowSpin} ${CARD_SPIN_TIME.SLOW_SPIN}ms ease-in forwards`;
    const uniqueAnimation = css`${slowSpin} ${CARD_SPIN_TIME.SLOW_SPIN}ms ease-in ${CARD_SPIN_TIME.DEFAULT + CARD_SPIN_TIME.SLOW_SPIN + CARD_SPIN_TIME.GRADE_EFFECT}ms forwards, ${uniqueEffect}, ${particleEffect} 2s ease-out infinite`;
    const legendaryAnimation = css`${slowSpin} ${CARD_SPIN_TIME.SLOW_SPIN}ms ease-in ${CARD_SPIN_TIME.DEFAULT + (CARD_SPIN_TIME.SLOW_SPIN + CARD_SPIN_TIME.GRADE_EFFECT) * 2}ms forwards, ${legendaryEffect}, ${particleEffect} 2s ease-out infinite`;

    switch (phase) {
      case 'spinning':
        return css`
          animation: ${defaultAnimation};
        `;
      case 'rare':
        return css`
          animation: ${rareAnimation}
        `;
      case 'unique':
        return css`
          animation: ${defaultAnimation}, ${rareAnimation}, ${uniqueAnimation}
        `;
      case 'legendary':
        return css`
          animation: ${defaultAnimation}, ${rareAnimation}, ${uniqueAnimation}, ${legendaryAnimation}
        `;
        
      case 'reveal':
        return css`
          animation: ${particleEffect} 2s ease-out infinite
        `
      default:
        return '';
    }
  },
};
const CardContainer = styled.div`
  perspective: 1000px;
`;

interface CardBorderProps {
  $phase: AnimationPhase;
}

const CardBorder = styled.div<CardBorderProps>`
  width: 224px;
  height: 324px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.9)),
    linear-gradient(45deg, #bca373, #3b3b3b);
  border-radius: 15px;
  border: 12px solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  ${({ $phase}) => GradeAnimations.getAnimation($phase)};
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
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const wait = (ms) =>new Promise((resolve) => setTimeout(resolve,ms) )

  const handleClick = async () => {
    if (phase === 'initial') {
      setPhase('spinning');
      await wait(CARD_SPIN_TIME.DEFAULT);
      setPhase('rare');
      await wait(CARD_SPIN_TIME.SLOW_SPIN);
      setTimeout(() => setPhase('reveal'));
      
      
    } else if (phase === 'reveal') {
      setPhase('initial');
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardBorder $phase={phase}>
        <CardInner
          style={{
            transform: phase === 'reveal' ? 'rotateY(0deg)' : 'rotateY(180deg)',
            transition: phase === 'reveal' ? 'transform 0.6s ease-out' : 'none',
          }}
        >
          <CardFront>
            <CardImage
              src={frontImages[phase === 'reveal' ? 3 : 0]}
              alt={`Card front ${phase === 'reveal' ? 'revealed' : 'hidden'}`}
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