import React from "react";
import type { Post } from "../types";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <div className="row">
      {posts.map(post => (
        <div key={post.id} className="col-md-4 mb-3">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
