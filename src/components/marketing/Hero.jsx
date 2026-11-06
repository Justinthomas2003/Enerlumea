import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  TrendingDown,
  Sun,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            SMARTER ENERGY STARTS HERE
          </div>

          <h1>
            Take control of your energy.
            <span> Make every unit count.</span>
          </h1>

          <p className="hero-description">
            Understand your energy consumption, explore solar potential,
            and discover smarter ways to reduce electricity costs
            with Enerlumea.
          </p>

          <div className="hero-actions">
            <Link to="/features" className="primary-button">
              Explore the Platform <ArrowRight size={18} />
            </Link>

            <Link to="/dashboard" className="secondary-button">
              View Dashboard <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="hero-trust">
            <span><Zap size={16} /> Energy insights</span>
            <span><Sun size={16} /> Solar estimates</span>
            <span><TrendingDown size={16} /> Savings awareness</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow" />

          <div className="energy-preview">
            <div className="preview-header">
              <div>
                <span className="preview-label">ENERGY OVERVIEW</span>
                <h2>Your energy snapshot</h2>
              </div>
              <span className="preview-icon"><Zap size={20} /></span>
            </div>

            <div className="preview-main-stat">
              <div>
                <span className="preview-label">MONTHLY CONSUMPTION</span>
                <h2>284 <small>kWh</small></h2>
              </div>
              <span className="preview-change">Sample data</span>
            </div>

            <div className="preview-chart">
              {[38, 55, 43, 72, 58, 88, 66, 48, 76, 60, 92, 70].map(
                (height, index) => (
                  <div className="chart-column" key={index}>
                    <span style={{ height: `${height}%` }} />
                  </div>
                )
              )}
            </div>

            <div className="preview-footer">
              <div>
                <span className="preview-label">ESTIMATED COST</span>
                <strong>₹1,704</strong>
              </div>
              <div>
                <span className="preview-label">SOLAR POTENTIAL</span>
                <strong>Explore estimate</strong>
              </div>
            </div>
          </div>

          <div className="floating-energy-card">
            <span className="floating-icon"><Sun size={20} /></span>
            <div>
              <strong>Solar potential</strong>
              <span>Discover your rooftop options</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom-line" />
    </section>
  );
}
