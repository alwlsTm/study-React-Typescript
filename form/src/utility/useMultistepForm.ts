import { ReactElement, useState } from "react";

export const useMultistepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0); //현재 입력폼 인덱스 state

  //이전 단계
  const back = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) return index;
      return index - 1;
    });
  };

  //다음 단계
  const next = () => {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) return index;
      return index + 1;
    });
  };

  return {
    currentStepIndex, //현재 입력폼 인덱스
    step: steps[currentStepIndex], //현재 입력폼
    steps, //입력폼 리스트
    back, //이전 단계
    next, //다음 단계
    isFirstStep: currentStepIndex === 0, //첫 번째 입력폼
    isLastStep: currentStepIndex === steps.length - 1, //마지막 입력폼
  };
};
