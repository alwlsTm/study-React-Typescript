import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import Select from "react-select/creatable";

interface OwnProps {
  onSubmit(data: NoteData): void;
  onAddTag(tag: Tag): void;
  availableTags: Tag[];
}

const NoteForm: React.FC<OwnProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  //노트 폼 submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input required id="title" type="text" ref={titleRef}></input>
      <label>Tags</label>
      <Select
        required
        isMulti
        onCreateOption={(label) => {
          const newTag = { id: uuidV4(), label }; //새 태그 추가
          onAddTag(newTag);
          setSelectedTags((prev) => [...prev, newTag]);
        }}
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
      <label htmlFor="body">Body</label>
      <textarea required id="body" rows={5} ref={bodyRef}></textarea>
      <button type="submit">저장</button>
      <Link to="..">
        <button type="button">취소</button>
      </Link>
    </form>
  );
};

export default NoteForm;
