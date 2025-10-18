import React from "react";
import PostCard from "./PostCard";
import type { Post } from "../api";

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  if (!posts.length) return <p>Inga inlägg ännu.</p>;
  return (
    <div className="row g-3">
      {posts.map(p => (
        <div className="col-12 col-md-6 col-lg-4" key={p.id}>
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
};

export default PostList;

