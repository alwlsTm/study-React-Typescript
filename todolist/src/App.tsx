import { useState } from "react";
import Todo from "./component/Todo";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState<Task[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    const newTodo: Task = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodolist([...todolist, newTodo]);
    setText("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleUpdate = (id: number) => {
    const newTodolist = todolist.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodolist(newTodolist);
  };

  const handleDelete = (id: number) => {
    const newTodolist = todolist.filter((todo) => todo.id !== id);
    setTodolist(newTodolist);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력해 주세요"
          value={text}
          onChange={onChange}
        ></input>
        <button type="submit">추가</button>
      </form>
      <ul>
        {todolist?.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
