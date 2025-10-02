import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title, content, categoryId: 1, userId: 1 }); 
    navigate("/"); // tillbaka till startsidan
  };

  return (
    <div className="container my-3">
      <h2>Skapa nytt inlägg</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titel</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Innehåll</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Skapa
        </button>
      </form>
    </div>
  );
}
