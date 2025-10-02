import { useState } from "react";
import { login, register } from "../api";
import type { User } from "../types";
import type { UserLogin } from "../types";



export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const doLogin = async (credentials: UserLogin) => {
    const u = await login(credentials);
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    return u;
  };

  const doRegister = async (credentials: UserLogin) => {
    const u = await register(credentials);
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, doLogin, doRegister, logout };
}
