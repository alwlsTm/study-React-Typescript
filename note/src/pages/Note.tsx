import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../NoteLayout";
import Markdown from "react-markdown";

interface OwnProps {
  onDeleteNote(id: string): void;
}

//노트
const Note: React.FC<OwnProps> = ({ onDeleteNote }) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Link to={`/${note.id}/edit`}>
        <button>Edit</button>
      </Link>
      <button
        onClick={() => {
          onDeleteNote(note.id);
          navigate("/");
        }}
      >
        Delete
      </button>
      <Link to="/">
        <button>Back</button>
      </Link>
      <h1>{note.title}</h1>
      {note.tags.length > 0 &&
        note.tags.map((tag) => <span key={tag.id}>{tag.label}</span>)}
      <Markdown>{note.body}</Markdown>
    </>
  );
};

export default Note;
