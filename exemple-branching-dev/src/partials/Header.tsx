import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Anslagstavla</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Hem</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/create">Skapa inlägg</Link></li>}
          </ul>

          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Logga in</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registrera</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">Hej, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={logout}>Logga ut</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
