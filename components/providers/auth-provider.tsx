"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo - in production, integrate with NextAuth
const mockUser: User = {
  id: "1",
  email: "demo@skillbridge.com",
  name: "Demo User",
  role: "hr",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const login = async (email: string) => {
    // Mock login - replace with actual NextAuth implementation
    console.log("Login attempt:", email);
  };

  const logout = () => {
    // Mock logout
    console.log("Logout");
  };

  return (
    <AuthContext.Provider value={{ user: mockUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
