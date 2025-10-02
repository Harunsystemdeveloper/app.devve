import React from "react";
import type { Post } from "../types";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content.substring(0, 100)}...</p>
        <Link to={`/posts/${post.id}`} className="btn btn-primary">
          Läs mer
        </Link>
      </div>
    </div>
  );
}
