import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api";
import type { Post } from "../api";

const EditPost: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [form, setForm] = useState<Partial<Post>>({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const p = await getPost(postId);
      setForm(p);
    })();
  }, [postId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(postId, { title: form.title, content: form.content, categoryId: form.categoryId });
    navigate(`/post/${postId}`);
  };

  if (!form) return null;

  return (
    <form className="card p-3" onSubmit={onSubmit}>
      <h4>Redigera inlägg</h4>
      <div className="mb-3">
        <label className="form-label">Titel</label>
        <input className="form-control" value={form.title ?? ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label">Innehåll</label>
        <textarea className="form-control" rows={5} value={form.content ?? ""} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
      </div>
      <button className="btn btn-primary">Uppdatera</button>
    </form>
  );
};

export default EditPost;
