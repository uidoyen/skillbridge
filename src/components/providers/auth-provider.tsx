"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: "hr" | "dev") => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderContent({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const user = session?.user as User | null;
  const isLoading = status === "loading";

  const login = async (email: string, role?: "hr" | "dev") => {
    // For the custom credential provider, we assume the email determines the role
    // or we pass it as a param if the provider supports it.
    // Our logic in [...nextauth] uses email content.
    // If we want to support the "role" param explicitly, we would need to pass it to signIn credentials
    // But for now, we'll rely on the email convention or just pass it through credentials if we updated the provider.
    // Let's just use email/password flow.
    await signIn("credentials", {
      email,
      password: "password", // Dummy password for now
      callbackUrl: "/dashboard",
    });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
