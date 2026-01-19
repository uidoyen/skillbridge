"use client";

import { Switch, IconButton, Tooltip, useColorScheme } from "@mui/material";
import { Briefcase, Code, Moon, Sun, Settings, LogOut } from "lucide-react";
import { User } from "@/types";
import { useAuth } from "@/components/providers/auth-provider";

interface HeaderProps {
  mode: "hr" | "dev";
  user: User | null;
  onModeChange: (mode: "hr" | "dev") => void;
}

export default function Header({ mode, user }: HeaderProps) {
  const { mode: colorMode, setMode } = useColorScheme();
  const { logout } = useAuth();

  const toggleTheme = () => {
    setMode(colorMode === "light" ? "dark" : "light");
  };

  // Show nothing while mode is being determined
  if (!colorMode) {
    return null;
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            SkillBridge
          </h1>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-gray-600 dark:text-gray-400">
            AI-Powered Recruitment Platform
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* HR/Dev Mode Toggle - Disabled for role-based access */}
          <div
            className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 opacity-80 cursor-not-allowed"
            title="Mode is locked to your role"
          >
            <div className="flex items-center space-x-2">
              <Briefcase
                className={`w-4 h-4 ${
                  mode === "hr" ? "text-primary-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  mode === "hr" ? "text-primary-600" : "text-gray-500"
                }`}
              >
                HR Mode
              </span>
            </div>

            <Switch checked={mode === "dev"} disabled={true} color="primary" />

            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium ${
                  mode === "dev" ? "text-primary-600" : "text-gray-500"
                }`}
              >
                Dev Mode
              </span>
              <Code
                className={`w-4 h-4 ${
                  mode === "dev" ? "text-primary-500" : "text-gray-400"
                }`}
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <Tooltip
            title={
              colorMode === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >
            <IconButton
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {colorMode === "light" ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </IconButton>
          </Tooltip>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-gray-200 dark:border-gray-700">
            <Tooltip title="Log out">
              <IconButton
                onClick={logout}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </IconButton>
            </Tooltip>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role === "hr" ? "HR Professional" : "Developer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
