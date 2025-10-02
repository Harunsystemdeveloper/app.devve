import React from "react";
import { usePosts } from "../Hooks/usePosts"; 
import PostList from "../components/PostList";

const Home: React.FC = () => {
  const { posts, loading } = usePosts();
  const user = localStorage.getItem("user");

  return (
    <div className="container my-3">
      <h2>Digital Anslagstavla</h2>
      {loading ? <p>Laddar...</p> : <PostList posts={posts} />}
      {user && (
        <a href="/create" className="btn btn-success mt-3">
          Skapa nytt inlägg
        </a>
      )}
    </div>
  );
};

export default Home;

