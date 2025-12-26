import { useState } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";


export function Support() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our menu, select your desired items, add them to your cart, and proceed to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and secure digital payment methods.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Track your order in real-time from your order history page.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "We’re open Monday to Sunday from 11:00 AM to 10:00 PM.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Currently pickup-only. Delivery options are coming soon!",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((res) => setTimeout(res, 800));
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSending(false);
  };

  return (
    <div className="support-page">
      {/* Hero */}
      <section className="support-hero">
        <h1>Support Center</h1>
        <p>We’re here to help. Find answers or contact our team directly.</p>
      </section>

      {/* Contact Cards */}
      <section className="support-section">
        <h2>Get in Touch</h2>
        <div className="support-grid">
          <SupportCard icon={<Phone />} title="Phone">
            +1 (555) 123-4567
          </SupportCard>

          <SupportCard icon={<Mail />} title="Email">
            support@chickochicken.com
          </SupportCard>

          <SupportCard icon={<MapPin />} title="Visit Us">
            123 Main Street, Downtown
          </SupportCard>

          <SupportCard icon={<Clock />} title="Hours">
            Mon–Sun · 11 AM – 10 PM
          </SupportCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="support-section light">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
              >
                {faq.question}
                <ChevronDown
                  className={expandedFAQ === i ? "rotate" : ""}
                />
              </button>

              {expandedFAQ === i && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="support-section accent">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Your message..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button disabled={sending}>
            <MessageSquare size={18} />
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="support-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
