import { NoteData, Tag } from "../App";
import NoteForm from "../component/NoteForm";

interface OwnProps {
  onSubmit(data: NoteData): void;
  onAddTag(tag: Tag): void;
  availableTags: Tag[];
}

//새 노트
const NewNote: React.FC<OwnProps> = ({ onSubmit, onAddTag, availableTags }) => {
  return (
    <>
      <h1>New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
