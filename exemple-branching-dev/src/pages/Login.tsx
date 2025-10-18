import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from ?? "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({ username, password });
    navigate(from, { replace: true });
  };

  return (
    <form className="card p-3 mx-auto" style={{ maxWidth: 420 }} onSubmit={onSubmit}>
      <h4>Logga in</h4>
      <div className="mb-3">
        <label className="form-label">Användarnamn</label>
        <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Lösenord</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary w-100">Logga in</button>
    </form>
  );
};

export default Login;
