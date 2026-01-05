import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useUsersStore } from "../store/usersStore";
import { useArticleStore } from "../store/articleStore";
import { useSettingsStore } from "../store/settingsStore";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);
  const toggleDarkMode = useThemeStore((s) => s.toggleTheme);
  const users = useUsersStore((s) => s.users);
  const articles = useArticleStore((s) => s.articles);
  const colorPalette = useSettingsStore((s) => s.colorPalette);
  const colorPalettes = useSettingsStore((s) => s.colorPalettes);
  const panelName = useSettingsStore((s) => s.panelName);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleSearch = (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const query = value.toLowerCase();
    const results = [];

    // Search users
    const foundUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    foundUsers.forEach((user) => {
      results.push({
        id: `user-${user.id}`,
        type: "user",
        title: user.name,
        subtitle: user.email,
        role: user.role,
        avatar: user.avatar,
        data: user,
      });
    });

    // Search articles
    const foundArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    foundArticles.forEach((article) => {
      results.push({
        id: `article-${article.id}`,
        type: "article",
        title: article.title,
        subtitle: article.author,
        category: article.category,
        image: article.image,
        data: article,
      });
    });

    setSearchResults(results.slice(0, 6)); // Limit to 6 results
  };

  const handleResultClick = (result) => {
    if (result.type === "user") {
      navigate(`/users/${result.data.id}`);
    } else if (result.type === "article") {
      navigate(`/articles/${result.data.id}`);
    }
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-transparent dark:border-gray-700">
      <div className="flex justify-between items-center h-16 px-2 md:px-6 py-2 md:py-4 relative">
        {/* Left Section - Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${colorPalettes[colorPalette].gradient} rounded-lg flex items-center justify-center shadow-lg md:hidden`}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white"
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
          <span
            className={` md:inline text-lg font-bold bg-gradient-to-r ${colorPalettes[colorPalette].gradient} bg-clip-text text-transparent`}
          >
            {panelName}
          </span>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
            <input
              type="search"
              placeholder="Search users, articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

            {/* Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 border-b border-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-3 last:border-b-0"
                  >
                    {result.type === "user" ? (
                      <>
                        <img
                          src={result.avatar}
                          alt={result.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="text-left flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.subtitle} • {result.role}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                          User
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="text-left flex-1">
                          <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.category} • {result.subtitle}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                          Article
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}

            {isSearchOpen && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 p-4 text-center text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 transition-all duration-300"
            title="Search"
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
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2.5 hidden rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-amber-500 transition-all duration-300 transform hover:scale-110"
            title="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-1.414-1.414a2 2 0 00-2.828 2.828l1.414 1.414a2 2 0 102.828-2.828zM2.05 6.464A2 2 0 103.464 4.05l-1.414-1.414a2 2 0 00-2.828 2.828l1.414 1.414zM5.106 5.106a1 1 0 011.414 0l1.414-1.414a1 1 0 00-1.414-1.414L5.106 3.692a1 1 0 000 1.414zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM9.5.5a1 1 0 011 1v1a1 1 0 01-2 0V1.5a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Mobile User Menu Button */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 border-2 border-blue-400 dark:border-blue-500 transition-all duration-300 transform hover:scale-105"
              title="User Menu"
            >
              <img
                src="https://i.pravatar.cc/50"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700"
              />
            </button>

            {/* Mobile User Dropdown */}
            {isUserDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 overflow-hidden"
                onClick={() => setIsUserDropdownOpen(false)}
              >
                {/* User Header */}
                <div
                  className={`bg-gradient-to-r ${colorPalettes[colorPalette].gradient} px-6 py-8 text-white`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://i.pravatar.cc/80"
                      alt="user"
                      className="w-16 h-16 rounded-full object-cover border-4 border-white"
                    />
                    <div>
                      <h3 className="text-lg font-bold">Admin User</h3>
                      <p className="text-blue-100 text-sm">Administrator</p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="px-6 py-4 border-b border-transparent dark:border-gray-700 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      admin@dashboard.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Role
                    </p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                      Administrator
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Status
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-3 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/users/1");
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Settings
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-sm font-semibold"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* User Avatar - Hidden on mobile */}
          <div className="hidden sm:flex relative group">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">
                Admin
              </span>
              <svg
                className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </button>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 overflow-hidden"
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                {/* User Header */}
                <div
                  className={`bg-gradient-to-r ${colorPalettes[colorPalette].gradient} px-6 py-8 text-white`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://i.pravatar.cc/80"
                      alt="user"
                      className="w-16 h-16 rounded-full object-cover border-4 border-white"
                    />
                    <div>
                      <h3 className="text-lg font-bold">Admin User</h3>
                      <p className="text-blue-100 text-sm">Administrator</p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="px-6 py-4 border-b border-transparent dark:border-gray-700 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      admin@dashboard.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Role
                    </p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                      Administrator
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Status
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-3 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/users/1");
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Settings
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-sm font-semibold"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-transparent dark:border-gray-700 mt-3 pt-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
            <input
              type="search"
              placeholder="Search users, articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              autoFocus
            />

            {/* Mobile Search Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => {
                      handleResultClick(result);
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition flex items-center gap-3 last:border-b-0"
                  >
                    {result.type === "user" ? (
                      <>
                        <img
                          src={result.avatar}
                          alt={result.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="text-left flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.subtitle} • {result.role}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                          User
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="text-left flex-1">
                          <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.category} • {result.subtitle}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                          Article
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}

            {isSearchOpen && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-transparent dark:border-gray-700 z-50 p-4 text-center text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
