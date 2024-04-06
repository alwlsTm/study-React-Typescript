import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import Select from "react-select";

interface SimplifiedNote {
  id: string;
  title: string;
  tags: Tag[];
}

interface OwnProps {
  notes: SimplifiedNote[];
  availableTags: Tag[];
}

//노트 리스트
const NoteList: React.FC<OwnProps> = ({ notes, availableTags }) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  //노트 검색
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <h1>Notes</h1>
      <Link to="/new">
        <button>create</button>
      </Link>
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <Select
          isMulti
          value={selectedTags.map((tag) => {
            return { label: tag.label, value: tag.id }; //선택된 태그
          })}
          options={availableTags.map((tag) => {
            return { label: tag.label, value: tag.id }; //선택 가능한 태그들
          })}
          onChange={(tags) =>
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            )
          }
        />
      </form>
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NoteList;

//노트 카드
export const NoteCard: React.FC<SimplifiedNote> = ({ id, title, tags }) => {
  return (
    <Link to={`/${id}`}>
      <span>{title + ` / `}</span>
      {tags.length > 0 &&
        tags.map((tag) => <span key={tag.id}>{tag.label}</span>)}
    </Link>
  );
};
