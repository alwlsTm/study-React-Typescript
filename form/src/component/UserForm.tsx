interface UserData {
  firstName: string;
  lastName: string;
  age: string;
}

interface OwnProps extends UserData {
  updateFields(fields: Partial<UserData>): void;
}

//1. 사용자 정보 입력폼
const UserForm: React.FC<OwnProps> = ({
  firstName,
  lastName,
  age,
  updateFields,
}) => {
  return (
    <div>
      <h2>사용자 정보</h2>
      <label>성: </label>
      <input
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      ></input>
      <label>이름: </label>
      <input
        required
        type="text"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      ></input>
      <label>나이: </label>
      <input
        required
        type="number"
        min={1}
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      ></input>
    </div>
  );
};

export default UserForm;
