import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Plug,
  Sun,
  Settings,
  Leaf,
  X,
  Home,
  ClipboardList,
  TrendingDown,
  Globe,
  Lightbulb,
} from "lucide-react";

const links = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", path: "/dashboard/analytics", icon: ChartNoAxesCombined },
  { label: "Appliances", path: "/dashboard/appliances", icon: Plug },
  { label: "Energy Records", path: "/dashboard/energy-records", icon: ClipboardList },
  { label: "Solar Estimator", path: "/dashboard/solar-estimator", icon: Sun },
  { label: "Savings Insights", path: "/dashboard/savings-insights", icon: TrendingDown },
  { label: "Sustainability", path: "/dashboard/sustainability", icon: Globe },
  { label: "Recommendations", path: "/dashboard/recommendations", icon: Lightbulb },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
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

      <aside
        id="dashboard-sidebar"
        className={`sidebar ${open ? "sidebar-open" : ""}`}
        aria-label="Dashboard navigation"
      >
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
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="navigation" aria-label="Workspace">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end
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
        <NavLink
          to="/"
          className="nav-link back-home-link"
          onClick={onClose}
        >
          <Home size={19} />
          <span>Back to Home</span>
        </NavLink>
      </aside>
    </>
  );
}
