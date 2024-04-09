import { NoteData, Tag } from "../App";
import NoteForm from "../component/NoteForm";
import { useNote } from "../component/NoteLayout";

interface OwnProps {
  onSubmit(id: string, data: NoteData): void;
  onAddTag(tag: Tag): void;
  availableTags: Tag[];
}

//노트 수정
const EditNote: React.FC<OwnProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  const note = useNote();

  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
