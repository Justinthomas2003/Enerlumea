import { Link } from "react-router-dom";
import { Leaf, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="marketing-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="marketing-brand">
            <span className="marketing-logo">
              <Leaf size={22} />
            </span>
            <span>Enerlumea</span>
          </div>
          <p>Energy, made visible.</p>
          <p>
            Smarter energy insights for a more sustainable future.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>
          <Link to="/dashboard">Dashboard <ArrowUpRight size={13} /></Link>
          <Link to="/dashboard/analytics">Analytics</Link>
          <Link to="/dashboard/solar-estimator">Solar Estimator</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Enerlumea. All rights reserved.</span>
        <span>Built for a greener tomorrow.</span>
      </div>
    </footer>
  );
}
