import {
  Activity,
  Sun,
  Wallet,
  ShieldCheck,
} from "lucide-react";

import Hero from "../../components/marketing/Hero";
import FeatureCard from "../../components/marketing/FeatureCard";
import CTASection from "../../components/marketing/CTASection";

const features = [
  {
    icon: Activity,
    number: "01",
    title: "Energy Analytics",
    description:
      "Understand consumption patterns through clear visual summaries and energy usage insights.",
    link: "/dashboard/analytics",
  },
  {
    icon: Sun,
    number: "02",
    title: "Solar Estimator",
    description:
      "Explore estimated rooftop solar generation and understand its potential for your property.",
    link: "/dashboard/solar-estimator",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Savings Insights",
    description:
      "Estimate electricity expenses and explore opportunities to improve energy efficiency.",
    link: "/dashboard",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Energy Management",
    description:
      "Organize appliance information and understand how individual devices contribute to usage.",
    link: "/dashboard/appliances",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="intro-section">
        <div className="section-container intro-grid">
          <div>
            <span className="section-eyebrow">THE ENERLUMEA APPROACH</span>
            <h2>
              Energy decisions should be
              <span> easier to understand.</span>
            </h2>
          </div>

          <p>
            Enerlumea brings energy insights, solar exploration and
            consumption awareness into one simple experience.
            Make informed decisions with information that is easier
            to see and understand.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-eyebrow">WHAT YOU CAN DO</span>
            <h2>One platform. Smarter energy choices.</h2>
            <p>
              Explore the tools designed to make energy management
              more accessible.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.number} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
