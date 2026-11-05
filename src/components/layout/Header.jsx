
import { Menu, Sun, Moon } from "lucide-react";

export default function Header({
  onMenuClick,
  menuOpen,
  menuButtonRef,
  theme,
  onThemeToggle,
}) {
  return (
    <header className="topbar">
      <button
        ref={menuButtonRef}
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        aria-controls="dashboard-sidebar"
      >
        <Menu size={22} />
      </button>

      <div className="topbar-title">
        <span>ENERGY MANAGEMENT</span>
        <h1>Welcome to Enerlumea</h1>
      </div>

      <button
        className="theme-button"
        onClick={onThemeToggle}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        aria-pressed={theme === "dark"}
      >
        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>
    </header>
  );
}
