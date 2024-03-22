import { useState } from "react";
import Select, { SelectOption } from "./component/Select";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

const App: React.FC = () => {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]); //단일 선택 state
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]); //다중 선택 state

  return (
    <>
      <Select options={options} value={value2} onChange={(v) => setValue2(v)} />
      <br />
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(v) => setValue1(v)}
      />
    </>
  );
};

export default App;
