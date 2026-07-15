"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const refreshData = await apiFetch<{ accessToken: string }>(
          "/auth/refresh",
          {
            method: "POST",
          },
        );
        const meData = await apiFetch<{ user: User }>("/auth/me", {
          token: refreshData.accessToken,
        });
        setAccessToken(refreshData.accessToken);
        setUser(meData.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ accessToken: string; user: User }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiFetch<{ accessToken: string; user: User }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      },
    );
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const loginWithGoogle = async (credential: string) => {
    const data = await apiFetch<{ accessToken: string; user: User }>(
      "/auth/google",
      {
        method: "POST",
        body: JSON.stringify({ credential }),
      },
    );
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
