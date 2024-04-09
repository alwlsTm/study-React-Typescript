import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import Select from "react-select";

interface SimplifiedNote {
  id: string;
  title: string;
  tags: Tag[];
}

interface NoteListProps {
  notes: SimplifiedNote[];
  availableTags: Tag[];
  onUpdateTag(id: string, label: string): void;
  onDeleteTag(id: string): void;
}

interface EditTagsProps {
  availableTags: Tag[];
  onUpdateTag(id: string, label: string): void;
  onDeleteTag(id: string): void;
}

//노트 리스트
const NoteList: React.FC<NoteListProps> = ({
  notes,
  availableTags,
  onUpdateTag,
  onDeleteTag,
}) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
        <button>Create</button>
      </Link>
      <button onClick={() => setIsOpen((prev) => !prev)}>EditTags</button>
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
      {isOpen && (
        <EditTags
          availableTags={availableTags}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
        />
      )}
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

//태그 편집
export const EditTags: React.FC<EditTagsProps> = ({
  availableTags,
  onUpdateTag,
  onDeleteTag,
}) => {
  return (
    <form>
      {availableTags.map((tag) => (
        <div key={tag.id}>
          <input
            type="text"
            value={tag.label}
            onChange={(e) => onUpdateTag(tag.id, e.target.value)}
          ></input>
          <button type="button" onClick={() => onDeleteTag(tag.id)}>
            &times;
          </button>
        </div>
      ))}
    </form>
  );
};
