import { Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hook/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import { useMemo } from "react";
import NoteLayout from "./component/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

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

  //노트 수정
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          //기존 ...note 데이터를 새 ...data로 덮어쓰기
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  //노트 삭제
  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  //태그 추가
  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  //태그 수정
  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  //태그 삭제
  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  //작성한 노트 리스트
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoteList
            notes={notesWithTags}
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />
        }
      ></Route>
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
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDeleteNote={onDeleteNote} />}></Route>
        <Route
          path="edit"
          element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default App;
