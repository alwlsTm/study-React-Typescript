import { useState } from "react";
import { useMultistepForm } from "./utility/useMultistepForm";
import UserForm from "./component/UserForm";
import AddressForm from "./component/AddressForm";
import AccountForm from "./component/AccountForm";

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  state: string;
  city: string;
  street: string;
  email: string;
  password: string;
}

//입력폼 초깃값
const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  state: "",
  city: "",
  street: "",
  email: "",
  password: "",
};

const App: React.FC = () => {
  const [data, setData] = useState(INITIAL_DATA); //입력폼 값 state

  //입력폼 업데이트
  //Partial<Type> - Type의 모든 프로퍼티를 옵셔널하게
  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { currentStepIndex, step, steps, back, next, isFirstStep, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("계정 생성 완료!");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        {!isFirstStep && ( //첫 번째 입력 폼이 아니라면
          <button type="button" onClick={back}>
            뒤로
          </button>
        )}
        <button type="submit">{isLastStep ? "완료" : "다음"}</button>
      </form>
    </div>
  );
};

export default App;
