import {
  Activity,
  ClipboardList,
  Cpu,
  Sun,
  Wallet,
  Leaf,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    icon: Activity,
    title: "Energy Dashboard",
    description:
      "Get an overview of your energy consumption, key metrics, usage patterns and important energy information in one place.",
    benefits: [
      "Consumption overview",
      "Energy usage metrics",
      "Visual dashboard summaries",
    ],
    path: "/dashboard",
    action: "Explore Dashboard",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Appliance Management",
    description:
      "Maintain an organized list of electrical appliances and understand their contribution to household energy consumption.",
    benefits: [
      "Add and edit appliances",
      "Search and filter records",
      "Manage appliance information",
    ],
    path: "/dashboard/appliances",
    action: "Manage Appliances",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Energy Records",
    description:
      "Record and organize energy consumption information to make it easier to review and understand usage.",
    benefits: [
      "Maintain energy records",
      "Search and filter entries",
      "Review consumption history",
    ],
    path: "/dashboard/energy-records",
    action: "View Energy Records",
  },
  {
    number: "04",
    icon: Sun,
    title: "Solar Estimator",
    description:
      "Explore an estimated solar installation capacity, potential electricity generation, savings and payback period.",
    benefits: [
      "Estimate solar capacity",
      "Calculate potential generation",
      "Explore estimated savings",
    ],
    path: "/dashboard/solar-estimator",
    action: "Estimate Solar",
  },
  {
    number: "05",
    icon: Wallet,
    title: "Savings Insights",
    description:
      "Understand estimated electricity expenses and explore potential savings through better energy management.",
    benefits: [
      "Review estimated savings",
      "Understand energy expenses",
      "Explore efficiency opportunities",
    ],
    path: "/dashboard/savings-insights",
    action: "Explore Savings",
  },
  {
    number: "06",
    icon: Leaf,
    title: "Sustainability",
    description:
      "Explore environmental indicators associated with energy consumption and understand the potential impact of energy choices.",
    benefits: [
      "Environmental indicators",
      "Sustainability insights",
      "Energy awareness",
    ],
    path: "/dashboard/sustainability",
    action: "Explore Sustainability",
  },
  {
    number: "07",
    icon: Lightbulb,
    title: "Energy Recommendations",
    description:
      "Explore rule-based suggestions designed to help identify opportunities for more efficient energy usage.",
    benefits: [
      "Practical energy suggestions",
      "Usage-based recommendations",
      "Efficiency awareness",
    ],
    path: "/dashboard/recommendations",
    action: "View Recommendations",
  },
];

const highlights = [
  "Understand energy consumption",
  "Explore rooftop solar possibilities",
  "Organize appliance information",
  "Discover potential savings",
];

export default function Features() {
  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="features-hero-content">
          <span className="section-eyebrow">
            THE ENERLUMEA PLATFORM
          </span>

          <h1>
            Everything you need for
            <span> smarter energy decisions.</span>
          </h1>

          <p>
            Explore tools for energy awareness, appliance management,
            solar estimation and sustainability — brought together
            in one accessible platform.
          </p>

          <div className="features-hero-actions">
            <Link to="/dashboard" className="features-primary-button">
              Explore Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link to="/contact" className="features-secondary-button">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="features-hero-visual" aria-hidden="true">
          <div className="features-visual-icon">
            <Zap size={42} />
          </div>

          <span className="features-visual-label">
            ENERGY MANAGEMENT
          </span>

          <h2>Make energy information work for you.</h2>

          <div className="features-visual-points">
            <span><CheckCircle2 size={16} /> Energy awareness</span>
            <span><CheckCircle2 size={16} /> Solar exploration</span>
            <span><CheckCircle2 size={16} /> Smarter decisions</span>
          </div>
        </div>
      </section>

      <section className="features-overview">
        <div className="section-container">
          <div className="features-section-heading">
            <span className="section-eyebrow">
              PLATFORM CAPABILITIES
            </span>

            <h2>
              Explore what Enerlumea can do
            </h2>

            <p>
              Each module focuses on a different aspect of energy
              management, helping you understand and organize
              important energy information.
            </p>
          </div>

          <div className="features-page-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className="features-page-card"
                  key={feature.number}
                >
                  <div className="features-card-top">
                    <span className="features-card-icon">
                      <Icon size={24} aria-hidden="true" />
                    </span>

                    <span className="features-card-number">
                      {feature.number}
                    </span>
                  </div>

                  <h3>{feature.title}</h3>

                  <p className="features-card-description">
                    {feature.description}
                  </p>

                  <ul className="features-benefits">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit}>
                        <CheckCircle2
                          size={16}
                          aria-hidden="true"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={feature.path}
                    className="features-card-link"
                  >
                    {feature.action}
                    <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="features-approach">
        <div className="section-container features-approach-grid">
          <div>
            <span className="section-eyebrow">
              WHY ENERLUMEA
            </span>

            <h2>
              Bringing energy information together.
            </h2>

            <p>
              Enerlumea aims to make energy-related information
              easier to understand through organized records,
              useful calculations and clear visual summaries.
            </p>
          </div>

          <div className="features-highlight-list">
            {highlights.map((highlight) => (
              <div key={highlight}>
                <CheckCircle2 size={19} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-bottom-cta">
        <div className="section-container">
          <span className="section-eyebrow">
            START EXPLORING
          </span>

          <h2>
            Take a closer look at your energy.
          </h2>

          <p>
            Explore the Enerlumea dashboard and discover its
            energy management tools.
          </p>

          <Link to="/dashboard" className="features-primary-button">
            Open Enerlumea Dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
