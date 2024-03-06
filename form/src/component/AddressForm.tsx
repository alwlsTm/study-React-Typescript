interface AddressData {
  state: string;
  city: string;
  street: string;
}

interface OwnProps extends AddressData {
  updateFields(fields: Partial<AddressData>): void;
}

//2. 주소 입력폼
const AddressForm: React.FC<OwnProps> = ({
  state,
  city,
  street,
  updateFields,
}) => {
  return (
    <div>
      <h2>주소</h2>
      <label>도: </label>
      <input
        autoFocus
        required
        type="text"
        value={state}
        onChange={(e) => updateFields({ state: e.target.value })}
      ></input>
      <label>시: </label>
      <input
        required
        type="text"
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      ></input>
      <label>구: </label>
      <input
        required
        type="text"
        value={street}
        onChange={(e) => updateFields({ street: e.target.value })}
      ></input>
    </div>
  );
};

export default AddressForm;
