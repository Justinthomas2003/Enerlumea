
import { Menu, Sun, Moon } from "lucide-react";

export default function Header({ onMenuClick, theme, onThemeToggle }) {
  return (
    <header className="topbar">
      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
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
        aria-label="Toggle color theme"
      >
        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>
    </header>
  );
}
