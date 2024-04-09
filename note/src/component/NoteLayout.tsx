import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

interface OwnProps {
  notes: Note[];
}

const NoteLayout: React.FC<OwnProps> = ({ notes }) => {
  const { id } = useParams(); //노트 id
  const note = notes.find((n) => n.id === id);

  if (note === null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export default NoteLayout;

export const useNote = () => {
  //Outlet으로 렌더된 컴포넌트에 데이터 전달
  return useOutletContext<Note>();
};
