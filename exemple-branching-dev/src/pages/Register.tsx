import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, password });
      alert("Registrering lyckades! Du kan nu logga in.");
      navigate("/login");
    } catch {
      alert("Registrering misslyckades.");
    }
  };

  return (
    <div className="container my-3">
      <h2>Registrera</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Användarnamn</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lösenord</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Registrera
        </button>
      </form>
    </div>
  );
}

