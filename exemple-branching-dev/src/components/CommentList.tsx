import React, { useEffect, useState } from "react";
import type { Comment } from "../types";
import { getComments } from "../api";


interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(postId).then(data => setComments(data));
  }, [postId]);

  return (
    <div>
      <h5>Kommentarer</h5>
      {comments.map(c => (
        <div key={c.id} className="border p-2 mb-2">
          <strong>{c.user?.username}:</strong> {c.content}
        </div>
      ))}
    </div>
  );
}
