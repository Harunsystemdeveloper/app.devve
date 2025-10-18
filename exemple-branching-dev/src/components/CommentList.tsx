import React, { useEffect, useState } from "react";
import { getComments } from "../api";
import type { Comment } from "../api";

const CommentList: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(postId);
        setComments(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (loading) return <p>Laddar kommentarer…</p>;
  if (!comments.length) return <p>Inga kommentarer ännu.</p>;

  return (
    <ul className="list-group">
      {comments.map(c => (
        <li key={c.id} className="list-group-item">
          <strong>{c.user?.username ?? "Anonym"}:</strong> {c.content}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
