import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-icon">
          <Leaf size={28} />
        </div>

        <span className="section-eyebrow">A SMARTER ENERGY FUTURE</span>

        <h2>
          Ready to see your energy
          <span> differently?</span>
        </h2>

        <p>
          Explore your energy usage, discover solar possibilities
          and take the next step towards informed energy decisions.
        </p>

        <Link to="/dashboard" className="cta-button">
          Explore Enerlumea <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
