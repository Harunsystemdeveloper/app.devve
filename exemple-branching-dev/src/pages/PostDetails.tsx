import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import { getPosts } from "../api";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>(); // fångar id från URL
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPosts().then((posts) => {
      const found = posts.find((p) => p.id === Number(id));
      setPost(found || null);
    });
  }, [id]);

  if (!post) {
    return <p>Inlägget kunde inte hittas.</p>;
  }

  return (
    <div className="container my-3">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <strong>Kategori:</strong> {post.categoryId}
      </p>
      <p>
        <strong>Användare:</strong> {post.userId}
      </p>
    </div>
  );
};

export default PostDetails;
