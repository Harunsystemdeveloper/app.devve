import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, Post as PostType } from "../api";

import PostList from "../components/PostList";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Kunde inte hämta inlägg:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container my-3">
      <h2>Digital Anslagstavla</h2>
      {loading ? <p>Laddar...</p> : <PostList posts={posts} />}
      {user && (
        <Link to="/create" className="btn btn-success mt-3">
          Skapa nytt inlägg
        </Link>
      )}
    </div>
  );
};

export default Home;
