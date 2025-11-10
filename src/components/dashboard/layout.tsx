"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface DashboardLayoutProps {
  children: ReactNode;
  mode: "hr" | "dev";
  onModeChange: (mode: "hr" | "dev") => void;
}

export default function DashboardLayout({
  children,
  mode,
  onModeChange,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header mode={mode} onModeChange={onModeChange} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
