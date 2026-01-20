"use client";

import { ReactNode } from "react";
// import Sidebar from "./sidebar";
import Header from "./header";
import { User } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  mode: "hr" | "dev";
  user: User | null;
}

export default function DashboardLayout({
  children,
  mode,
  user,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header mode={mode} user={user} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
