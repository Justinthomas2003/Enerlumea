
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem("enerlumea-theme") === "dark" ? "dark" : "light",
  );
  const menuButtonRef = useRef(null);

  useEffect(() => {
    window.localStorage.setItem("enerlumea-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.querySelector(".close-sidebar")?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <main className="page-content">
          <Outlet context={{ theme, setTheme }} />
        </main>
      </div>
    </div>
  );
}
