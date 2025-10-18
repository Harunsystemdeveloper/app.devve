import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import type { Post } from "../api";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user) return;

    const newPost: Partial<Post> = {
      title, content, categoryId, userId: user.id,
    };
    await createPost(newPost);
    navigate("/");
  };

  return (
    <form className="card p-3" onSubmit={onSubmit}>
      <h4>Skapa inlägg</h4>
      <div className="mb-3">
        <label className="form-label">Titel</label>
        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Innehåll</label>
        <textarea className="form-control" rows={5} value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Kategori-ID</label>
        <input type="number" className="form-control" value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary">Spara</button>
    </form>
  );
};

export default CreatePost;
