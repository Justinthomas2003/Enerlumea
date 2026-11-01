import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Features", path: "/features" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="marketing-header">
      <nav className="marketing-nav">
        <Link
          to="/"
          className="marketing-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="marketing-logo">
            <Leaf size={23} />
          </span>
          <span>Enerlumea</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="marketing-links"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div
          id="marketing-links"
          className={`marketing-links ${menuOpen ? "open" : ""}`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `marketing-link ${isActive ? "selected" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/dashboard"
            className="nav-dashboard-button"
            onClick={() => setMenuOpen(false)}
          >
            Explore Dashboard
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
