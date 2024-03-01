interface OwnProp {
  id: number;
  text: string;
  completed: boolean;
  onUpdate(id: number): void;
  onDelete(id: number): void;
}

const Todo: React.FC<OwnProp> = ({
  id,
  text,
  completed,
  onUpdate,
  onDelete,
}) => {
  const onChange = () => onUpdate(id);
  const onClick = () => onDelete(id);

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={onChange}></input>
      <p style={completed ? { textDecoration: "line-through" } : undefined}>
        {text}
      </p>
      <button onClick={onClick}>삭제</button>
    </li>
  );
};

export default Todo;
