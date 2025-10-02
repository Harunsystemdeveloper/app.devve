import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch {
      alert("Fel användarnamn eller lösenord");
    }
  };

  return (
    <div className="container my-3">
      <h2>Logga in</h2>
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
        <button type="submit" className="btn btn-primary">
          Logga in
        </button>
      </form>
    </div>
  );
}
