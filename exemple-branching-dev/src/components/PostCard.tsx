import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../api";

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="card shadow-sm h-100">
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text text-muted">{post.content?.slice(0, 140)}{post.content && post.content.length > 140 ? "…" : ""}</p>
      <div className="d-flex justify-content-between">
        <Link className="btn btn-primary btn-sm" to={`/post/${post.id}`}>Läs mer</Link>
        <small className="text-muted">Kategori #{post.categoryId}</small>
      </div>
    </div>
  </div>
);

export default PostCard;

