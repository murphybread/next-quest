import { useState } from "react";
import styles from "@styles/Card.module.css";

const frontImages: Record<number, string> = {
  0: "/images/initial_front.jpg", // 앞면 이미지
  1: "/images/question_1.jpg",
  2: "/images/question_1.jpg",
  3: "/images/answer_1.jpg",
};

const backImages = "/images/card_back.jpg"; // 뒷면 이미지

interface DescriptiveComponent extends React.FC {
  description: string; // 설명 메타데이터
}

const Card: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0); // 클릭 상태 추적

  const flipCard = () => {
    setAnimationStep((prevStep) => (prevStep + 1) % 4); // 단계 순환: 0 → 1 → 2 → 3 → 0
  };

  return (
    <div
      className={`${styles.card} ${
        animationStep === 1
          ? styles.spinning
          : animationStep === 2
            ? styles["slow-spin"]
            : animationStep === 3
              ? styles.growing
              : ""
      }`}
      onClick={flipCard}
    >
      <div className={styles["card-border"]}>
        <div className={styles["card-inner"]}>
          <div className={styles["card-front"]}>
            <img
              src={frontImages[animationStep]}
              alt={`Card front ${animationStep}`}
              className={styles["card-image"]}
            />
          </div>
          <div className={styles["card-back"]}>
            <img
              src={backImages}
              alt="Card back"
              className={styles["card-image"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Card.description = `
4번의 클릭으로 한 사이클이 동작합니다.
1. 초기상태 일반 카드 앞면
2. 첫번 째 클릭으로 카드가 회전하면서 어떤 카드가 나올지 숨겨집니다. (무한 회전)
3. 두번 째 클릭으로 카드가 천천히 속도가 느려지다가 멈춥니다.
4. 세번 째 클릭으로 카드가 커지면서 공개됩니다.
5. 네번 째 클릭으로 초기상태로 돌아갑니다.
`;

export default Card;
