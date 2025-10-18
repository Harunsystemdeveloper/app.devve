// src/Hooks/useAuth.ts
import React, { createContext, useContext, useMemo, useState } from "react";
import type { User, UserLogin } from "../api";
import { login } from "../api";

type AuthCtx = {
  user: User | null;
  loginUser: (credentials: UserLogin) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  });

  const loginUser = async (credentials: UserLogin) => {
    const u = await login(credentials);
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const value = useMemo(() => ({ user, loginUser, setUser }), [user]);

  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


