import { Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NewNote from "./NewNote";

export interface RawNote extends RawNoteData {
  id: string;
}

export interface RawNoteData {
  title: string;
  body: string;
  tagIds: string[];
}

export interface Note extends NoteData {
  id: string;
}

export interface NoteData {
  title: string;
  body: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  label: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  //노트 생성
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { id: uuidV4(), ...data, tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  //태그 추가
  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route
        path="/new"
        element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default App;
