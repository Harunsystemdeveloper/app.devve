import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <h2>Not Found: 404</h2>
      <p>
        We are sorry, but there doesn't seem to be any page on this
        site that matches the URL:
      </p>
      <p><strong>{location.pathname}</strong></p>
      <p>Please <Link to="/">visit the start page</Link> instead.</p>
    </>
  );
};

export default NotFoundPage;
