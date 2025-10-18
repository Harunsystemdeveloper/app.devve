import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ username, password });
    navigate("/login");
  };

  return (
    <form className="card p-3 mx-auto" style={{ maxWidth: 420 }} onSubmit={onSubmit}>
      <h4>Registrera</h4>
      <div className="mb-3">
        <label className="form-label">Användarnamn</label>
        <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Lösenord</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-success w-100">Skapa konto</button>
    </form>
  );
};

export default Register;


