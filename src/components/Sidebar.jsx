import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSettingsStore } from "../store/settingsStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const colorPalette = useSettingsStore((s) => s.colorPalette);
  const colorPalettes = useSettingsStore((s) => s.colorPalettes);
  const sidebarWidth = useSettingsStore((s) => s.sidebarWidth);
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 md:hidden bg-gradient-to-r ${colorPalettes[colorPalette].gradient} hover:opacity-90 text-white p-4 rounded-full shadow-2xl z-50 transition-all transform hover:scale-110`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:fixed top-0 left-0  h-screen bg-gradient-to-b from-white to-white dark:from-gray-800 dark:to-gray-900 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:p-3 md:max-h-screen md:col-span-1 row-span-10 col-span-2 border-r border-transparent dark:border-gray-700 shadow-xl md:shadow-lg 
        ${
          sidebarWidth === "compact"
            ? "w-48 md:w-48"
            : sidebarWidth === "wide"
            ? "w-full md:w-80"
            : "w-64 md:w-64"
        } 
        `}
      >
        <div className="h-full flex flex-col p-4 md:p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${colorPalettes[colorPalette].gradient} rounded-lg flex items-center justify-center shadow-lg`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold dark:text-white">Admin</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dashboard
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${colorPalettes[colorPalette].gradient} text-white shadow-lg`
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 13l4-8m4 8V5m0 8H9"
                ></path>
              </svg>
              <span className="font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              to="/users"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${colorPalettes[colorPalette].gradient} text-white shadow-lg`
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 16a5 5 0 00-10 0v2h10v-2z"
                ></path>
              </svg>
              <span className="font-medium">Users</span>
            </NavLink>

            <NavLink
              to="/articles"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${colorPalettes[colorPalette].gradient} text-white shadow-lg`
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span className="font-medium">Articles</span>
            </NavLink>
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-transparent dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-200 text-center">
              v2.0.3
            </p>
            <p className=" text-[10px] md:text-xs text-gray-500 dark:text-gray-200 text-center">
              &copy; 2026 Design & Developed by Armin Safaie
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
