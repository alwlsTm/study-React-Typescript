interface AccountData {
  email: string;
  password: string;
}

interface OwnProps extends AccountData {
  updateFields(fields: Partial<AccountData>): void;
}

//3. 계정 생성 입력폼
const AccountForm: React.FC<OwnProps> = ({ email, password, updateFields }) => {
  return (
    <div>
      <h2>계정 생성</h2>
      <label>이메일: </label>
      <input
        autoFocus
        required
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      ></input>
      <label>비밀번호: </label>
      <input
        required
        type="password"
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      ></input>
    </div>
  );
};

export default AccountForm;
