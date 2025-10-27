"use client";

import { Switch, IconButton, Tooltip, useColorScheme } from "@mui/material";
import { Briefcase, Code, Moon, Sun, User, Settings } from "lucide-react";

interface HeaderProps {
  mode: "hr" | "dev";
  onModeChange: (mode: "hr" | "dev") => void;
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  const { mode: colorMode, setMode } = useColorScheme();

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
          {/* HR/Dev Mode Toggle */}
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
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

            <Switch
              checked={mode === "dev"}
              onChange={(e) => onModeChange(e.target.checked ? "dev" : "hr")}
              color="primary"
            />

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
                <span className="text-white text-sm font-medium">D</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Demo User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {mode === "hr" ? "HR Professional" : "Developer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
