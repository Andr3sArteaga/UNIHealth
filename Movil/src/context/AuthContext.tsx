import { createContext, useContext, useState, ReactNode } from "react";
import * as authService from "@services/auth";

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
    setUser({
      id: res.user.id,
      name: res.user.name,
      role: res.user.role as Role,
      token: res.token,
    });
  };

  const register = async (data: any) => {
    const res = await authService.register(data);
    setUser({
      id: res.user.id,
      name: res.user.name,
      role: res.user.role as Role,
      token: res.token,
      hasCompletedTutorial: false, // New users need to complete tutorial
    });
  };

  const completeTutorial = () => {
    if (user) {
      setUser({
        ...user,
        hasCompletedTutorial: true,
      });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, completeTutorial }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
