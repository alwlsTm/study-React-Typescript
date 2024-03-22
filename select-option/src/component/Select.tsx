import "./Select.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

//단일 선택 type
type SingleSelect = {
  multiple?: false;
  value?: SelectOption;
  onChange(value: SelectOption | undefined): void;
};

//다중 선택 type
type MultipleSelect = {
  multiple: true;
  value: SelectOption[];
  onChange(value: SelectOption[]): void;
};

type OwnProps = {
  options: SelectOption[];
} & (SingleSelect | MultipleSelect);

const Select: React.FC<OwnProps> = ({ multiple, options, value, onChange }) => {
  //옵션 전체 해제
  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  //옵션 선택
  //다중 선택일 경우, 이미 추가된 옵션이라면 재선택 시 옵션 해제
  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };
  return (
    <div>
      <span>
        {multiple
          ? value.map((v) => (
              <button key={v.value} onClick={() => selectOption(v)}>
                {v.label}
                <span>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button onClick={() => clearOptions()}>&times;</button>
      <ul>
        {options.map((option) => (
          <li key={option.value} onClick={() => selectOption(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
