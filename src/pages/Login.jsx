import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/authStore";
import { useSettingsStore } from "../store/settingsStore";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorPalette = useSettingsStore((s) => s.colorPalette);
  const colorPalettes = useSettingsStore((s) => s.colorPalettes);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    login(username, password);

    // Check if login was successful by checking if user was set
    const currentUser = useAuthStore.getState().user;
    if (currentUser) {
      toast.success("Login successful! Welcome back!");
      setUsername("");
      setPassword("");
    } else {
      toast.error("Invalid username or password");
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4"
      style={{ background: undefined }}
    >
      {/* subtle light-mode background using palette */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorPalettes[colorPalette].light} via-white ${colorPalettes[colorPalette].light} hidden md:block`}
      />
      {/* Floating bg elements */}
      <div
        className={`absolute top-20 left-10 w-72 h-72 ${colorPalettes[
          colorPalette
        ].light.replace("bg-", "bg-200 ")} dark:${colorPalettes[
          colorPalette
        ].dark.replace(
          "dark:",
          ""
        )} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
      />
      <div
        className={`absolute bottom-20 right-10 w-72 h-72 ${colorPalettes[
          colorPalette
        ].light.replace("bg-", "bg-200 ")} dark:${colorPalettes[
          colorPalette
        ].dark.replace(
          "dark:",
          ""
        )} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg bg-gradient-to-br ${colorPalettes[colorPalette].gradient}`}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">
              Welcome
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
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
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-transparent dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-transparent dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !username || !password}
              className={`w-full bg-gradient-to-r ${colorPalettes[colorPalette].gradient} hover:opacity-95 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
                    ></path>
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo credentials: admin / 1234
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeButton
        theme="light"
      />
    </div>
  );
}
