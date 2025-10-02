import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      getPost(Number(id)).then((p) => {
        setTitle(p.title);
        setContent(p.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (id) {
      await updatePost(Number(id), { title, content, categoryId: 1, userId: user.id });
      window.location.href = "/";
    }
  };

  return (
    <div className="container my-3">
      <h3>Redigera inlägg</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Innehåll"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary">Uppdatera</button>
      </form>
    </div>
  );
};

export default EditPost;