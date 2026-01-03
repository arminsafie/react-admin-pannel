import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Articles from "../pages/Articles";
import Settings from "../pages/Settings";
import { useAuthStore } from "../store/authStore";

export default function Router() {
  const user = useAuthStore((state) => state.user);

  if (!user)
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<Articles />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
