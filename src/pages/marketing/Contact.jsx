import { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { submitContactMessage } from '../../api/enerlumeaApi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitContactMessage(formData);
      setStatus({
        type: 'success',
        message: 'Your message was received and saved successfully.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Your message could not be sent. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            <MessageSquare size={16} />
            GET IN TOUCH
          </span>

          <h1>
            Let's Start a Conversation
          </h1>

          <p>
            Have questions about energy management, solar
            exploration, or sustainability? We'd love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <span className="contact-section-label">
              CONTACT INFORMATION
            </span>

            <h2>We’re Here to Help</h2>

            <p>
              Send us your questions or feedback. Use the
              contact form and tell us what you would like
              to discuss.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-icon">
                  <Mail size={21} />
                </span>

                <div>
                  <h3>Email</h3>
                  <p>Contact email coming soon</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">
                  <Phone size={21} />
                </span>

                <div>
                  <h3>Phone</h3>
                  <p>Phone number coming soon</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">
                  <MapPin size={21} />
                </span>

                <div>
                  <h3>Location</h3>
                  <p>Location details coming soon</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-icon">
                  <Clock size={21} />
                </span>

                <div>
                  <h3>Availability</h3>
                  <p>Send us a message anytime</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2>Send Us a Message</h2>

            <p className="contact-form-description">
              Fill in the details below.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label htmlFor="contact-name">
                  Full Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={120}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-email">
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={160}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </div>

              <button
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <Send size={17} aria-hidden="true" />
              </button>

              {status && (
                <p
                  className={`contact-form-status ${status.type}`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
