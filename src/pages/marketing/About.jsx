import {
  Target,
  Leaf,
  Sun,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

const objectives = [
  {
    icon: Activity,
    title: "Energy Awareness",
    description:
      "Make energy consumption information easier to understand through organized records and visual summaries.",
  },
  {
    icon: Sun,
    title: "Solar Exploration",
    description:
      "Help users explore estimated solar capacity, electricity generation, installation costs and potential savings.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Encourage awareness of the environmental impact of energy consumption and more responsible energy choices.",
  },
  {
    icon: Lightbulb,
    title: "Smarter Decisions",
    description:
      "Present useful insights and practical recommendations that support informed energy-management decisions.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-eyebrow">
            ABOUT ENERLUMEA
          </span>

          <h1>
            Making energy insights
            <span> easier to understand.</span>
          </h1>

          <p>
            Enerlumea is an energy-management platform designed
            to bring energy records, appliance information,
            solar estimation and sustainability insights
            together in one place.
          </p>

          <Link to="/features" className="features-primary-button">
            Explore Our Features
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="about-hero-visual" aria-hidden="true">
          <div className="about-visual-icon">
            <Leaf size={43} />
          </div>

          <span>OUR PURPOSE</span>

          <h2>
            Understand energy.
            Explore possibilities.
            Make informed choices.
          </h2>

          <div className="about-visual-decoration">
            <div />
            <div />
            <div />
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="about-introduction">
        <div className="about-container">
          <span className="section-eyebrow">
            WHO WE ARE
          </span>

          <h2>
            Bringing energy information into one experience.
          </h2>

          <p>
            Understanding electricity usage, managing appliances
            and exploring renewable energy options can involve
            different types of information. Enerlumea brings
            these areas together through a unified interface.
          </p>

          <p>
            The platform combines interactive dashboards,
            energy records, calculation tools and
            recommendations to make energy-related information
            more accessible and understandable.
          </p>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="about-purpose">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="section-eyebrow">
              OUR DIRECTION
            </span>

            <h2>
              Our vision and mission
            </h2>
          </div>

          <div className="about-purpose-grid">
            <article className="about-purpose-card">
              <div className="about-purpose-icon">
                <Target size={25} />
              </div>

              <h3>Our Vision</h3>

              <p>
                To make energy information more accessible
                and understandable, supporting greater
                awareness of energy consumption and
                sustainable possibilities.
              </p>
            </article>

            <article className="about-purpose-card">
              <div className="about-purpose-icon">
                <Lightbulb size={25} />
              </div>

              <h3>Our Mission</h3>

              <p>
                To provide practical digital tools for
                organizing energy information, estimating
                solar opportunities and identifying
                potential energy savings.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="about-objectives">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="section-eyebrow">
              WHAT WE FOCUS ON
            </span>

            <h2>
              Built around better energy understanding.
            </h2>

            <p>
              Four key objectives shape the Enerlumea platform.
            </p>
          </div>

          <div className="about-objectives-grid">
            {objectives.map((objective) => {
              const Icon = objective.icon;

              return (
                <article
                  className="about-objective-card"
                  key={objective.title}
                >
                  <div className="about-objective-icon">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <h3>{objective.title}</h3>

                  <p>{objective.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM APPROACH */}
      <section className="about-approach">
        <div className="about-container about-approach-grid">
          <div>
            <span className="section-eyebrow">
              OUR APPROACH
            </span>

            <h2>
              Information that supports informed decisions.
            </h2>

            <p>
              Enerlumea focuses on presenting energy-related
              information in a structured and accessible way.
              Its tools help users explore consumption,
              calculations and potential improvements.
            </p>

            <Link to="/dashboard" className="features-card-link">
              Explore the Dashboard
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="about-approach-list">
            {[
              "Organized energy information",
              "Interactive calculation tools",
              "Visual summaries and insights",
              "Practical energy recommendations",
            ].map((item) => (
              <div key={item}>
                <CheckCircle2 size={19} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <span className="section-eyebrow">
            DISCOVER ENERLUMEA
          </span>

          <h2>
            Explore a more informed approach to energy.
          </h2>

          <p>
            Discover the tools and features available
            across the Enerlumea platform.
          </p>

          <Link to="/features" className="features-primary-button">
            Discover Our Features
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
