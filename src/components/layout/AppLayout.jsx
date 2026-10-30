
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../App.css";

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((current) => current === "light" ? "dark" : "light");
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="main-area">
        <Header
          onMenuClick={() => setMenuOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
