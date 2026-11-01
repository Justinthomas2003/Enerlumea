import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  number,
  title,
  description,
  link,
}) {
  return (
    <article className="feature-card">
      <div className="feature-card-top">
        <span className="feature-icon">
          <Icon size={23} />
        </span>
        <span className="feature-number">{number}</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <a href={link} className="feature-link">
        Discover more <ArrowUpRight size={17} />
      </a>
    </article>
  );
}
