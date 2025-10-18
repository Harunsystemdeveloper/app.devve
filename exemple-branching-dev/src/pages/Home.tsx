import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api";
import type { Post } from "../api";
import PostList from "../components/PostList";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");

  useEffect(() => {
    (async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container my-3">
      <h2>Digital Anslagstavla</h2>
      {loading ? <p>Laddar…</p> : <PostList posts={posts} />}
      {user && (
        <Link to="/create" className="btn btn-success mt-3">
          Skapa nytt inlägg
        </Link>
      )}
    </div>
  );
};

export default Home;

