
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Plug,
  Sun,
  Settings,
  Leaf,
  X
} from "lucide-react";

const links = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { label: "Appliances", path: "/appliances", icon: Plug },
  { label: "Solar Estimator", path: "/solar-estimator", icon: Sun },
  { label: "Settings", path: "/settings", icon: Settings }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={23} />
          </div>

          <div>
            <h2>Enerlumea</h2>
            <span>ENERGY INTELLIGENCE</span>
          </div>

          <button
            className="close-sidebar"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="navigation">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="leaf-badge">
            <Leaf size={17} />
          </div>
          <div>
            <strong>Power a greener future</strong>
            <span>Understand your energy.</span>
          </div>
        </div>
      </aside>
    </>
  );
}
