import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../api";
import type { Post } from "../api";
import CommentList from "../components/CommentList";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => setPost(await getPost(postId)))();
  }, [postId]);

  const onDelete = async () => {
    if (!confirm("Ta bort inlägget?")) return;
    await deletePost(postId);
    navigate("/");
  };

  if (!post) return <p>Laddar…</p>;

  return (
    <div className="card p-3">
      <h3>{post.title}</h3>
      <p className="text-muted mb-4">{post.content}</p>
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-primary btn-sm" to={`/edit/${post.id}`}>Redigera</Link>
        <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>Ta bort</button>
      </div>

      <hr className="my-4" />
      <h5>Kommentarer</h5>
      <CommentList postId={post.id} />
    </div>
  );
};

export default PostDetails;

