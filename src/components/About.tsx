import { Heart, Users, Zap, Leaf } from "lucide-react";

export function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <h1>About Chicko Chicken</h1>
        <p>Serving delicious, authentic chicken dishes with passion since 2020</p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p className="about-text">
          At Chicko Chicken, we believe great food brings people together.
          Our mission is to deliver the highest quality chicken dishes,
          prepared with the finest ingredients and served with exceptional
          customer care.
        </p>
      </section>

      {/* Values */}
      <section className="about-section light">
        <h2>Our Values</h2>

        <div className="values-grid">
          <ValueCard
            icon={<Heart />}
            title="Quality First"
            text="We use only premium, fresh ingredients prepared with care and expertise."
          />
          <ValueCard
            icon={<Users />}
            title="Customer Focused"
            text="Our customers are at the heart of everything we do."
          />
          <ValueCard
            icon={<Zap />}
            title="Fast & Efficient"
            text="Quick service without compromising quality."
          />
          <ValueCard
            icon={<Leaf />}
            title="Sustainability"
            text="Responsible sourcing and eco-friendly practices."
          />
        </div>
      </section>

      {/* Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <div className="about-story">
          <p>
            Chicko Chicken began with a simple dream: to bring authentic,
            delicious chicken dishes to our community.
          </p>
          <p>
            Founded in 2020, our roots come from family recipes passed down
            through generations.
          </p>
          <p>
            Today, we proudly serve thousands of customers while staying true
            to our core values.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="stats-grid">
          <Stat number="5+" label="Years of Excellence" />
          <Stat number="10K+" label="Happy Customers" />
          <Stat number="50+" label="Menu Varieties" />
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2>Our Team</h2>
        <p className="about-text">
          Our passionate chefs, kitchen staff, and support team work together
          to deliver exceptional food and service every day.
        </p>
      </section>
    </div>
  );
}

/* Reusable Components */
function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="value-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="stat">
      <h3>{number}</h3>
      <p>{label}</p>
    </div>
  );
}
