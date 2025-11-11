import { createContext, useContext, useState, ReactNode } from "react";
import * as authService from "@services/auth";
import { setAuthToken } from "@services/api";

type Role = "patient" | "medic" | "admin";

type UserState = {
  id: string;
  name: string;
  role: Role;
  token: string;
  hasCompletedTutorial?: boolean;
} | null;

type AuthContextType = {
  user: UserState;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  completeTutorial: () => void;
};

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(null);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    const userData = {
      id: res.user.id.toString(),
      name: res.user.email, // Use email as name for now
      role: res.user.rol === "user" ? "patient" : res.user.rol as Role,
      token: res.access_token,
    };
    setUser(userData);
    setAuthToken(res.access_token);
  };

  const register = async (data: any) => {
    const res = await authService.register(data);
    const userData = {
      id: res.user.id.toString(),
      name: res.user.email, // Use email as name for now
      role: res.user.rol === "user" ? "patient" : res.user.rol as Role,
      token: res.access_token,
      hasCompletedTutorial: false, // New users need to complete tutorial
    };
    setUser(userData);
    setAuthToken(res.access_token);
  };

  const completeTutorial = () => {
    if (user) {
      setUser({
        ...user,
        hasCompletedTutorial: true,
      });
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, completeTutorial }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
