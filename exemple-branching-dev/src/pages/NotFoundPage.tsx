import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div className="text-center py-5">
    <h1>404</h1>
    <p>Sidan kunde inte hittas.</p>
    <Link className="btn btn-primary" to="/">Till startsidan</Link>
  </div>
);

export default NotFoundPage;








