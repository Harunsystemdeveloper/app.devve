import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/create" className="btn btn-success mt-3">
          Skapa nytt inlägg
        </Link>
      )}
    </div>
  );
};

export default Home;

