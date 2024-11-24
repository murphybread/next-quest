import { useState } from "react";
import styles from "@styles/Card.module.css";

const frontImages: Record<number, string> = {
  0: "/images/initial_front.jpg", // 앞면 이미지
  1: "/images/question_1.jpg",
  2: "/images/question_1.jpg",
  3: "/images/answer_1.jpg",
};

const backImages = "/images/card_back.jpg"; // 뒷면 이미지

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

export default Card;
