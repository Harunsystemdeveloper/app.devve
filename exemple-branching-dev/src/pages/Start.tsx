import React from "react";
import { Link } from "react-router-dom";

const Start: React.FC = () => {
  return (
    <div className="container my-3">
      <h2>Välkommen till Digital Anslagstavla!</h2>
      <p>Här kan du se alla inlägg och skapa nya.</p>
      <Link to="/" className="btn btn-primary mt-2">
        Gå till startsidan
      </Link>
    </div>
  );
};

export default Start;

