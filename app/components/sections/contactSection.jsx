"use client";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Code2, ArrowUp } from "lucide-react";

export default function ContactSection() {
  const [prepared, setPrepared] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      "Project enquiry from " + data.get("name"),
    );
    const body = encodeURIComponent(
      [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Company: " + (data.get("company") || "Not provided"),
        "Phone: " + (data.get("phone") || "Not provided"),
        "Interested in: " + data.get("service"),
        "",
        data.get("message"),
      ].join("\n"),
    );
    window.location.href =
      "mailto:adnan.pls2003@gmail.com?subject=" + subject + "&body=" + body;
    setPrepared(true);
  }
  return (
    <section id="contact" className="contact-section">
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>
            Let’s work
            <br />
            together.
          </h2>
          <p className="contact-lead">
            I’m Adnan Makahhal, a Computer Science student and full-stack
            developer focused on building thoughtful web experiences. Have a
            project in mind or an opportunity to share? Let’s connect.
          </p>
          <div className="contact-details">
            <a href="mailto:adnan.pls2003@gmail.com">
              <span className="contact-detail-icon">
                <Mail size={19} />
              </span>
              <span>
                <small>EMAIL</small>adnan.pls2003@gmail.com
              </span>
            </a>
            <div>
              <span className="contact-detail-icon">
                <MapPin size={19} />
              </span>
              <span>
                <small>LOCATION</small>Amman, Jordan · Dubai, UAE
              </span>
            </div>
            <div>
              <span className="contact-detail-icon">
                <Code2 size={19} />
              </span>
              <span>
                <small>MY FOCUS</small>React, Next.js & Networking (CCNA)
              </span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send me a message</h3>
          <div className="contact-fields">
            <div>
              <label htmlFor="contact-name">Full name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-company">
                Company <span>(optional)</span>
              </label>
              <input
                id="contact-company"
                name="company"
                autoComplete="organization"
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="contact-phone">
                Phone <span>(optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+962 …"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-service">I’m interested in</label>
            <select
              id="contact-service"
              name="service"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>
              <option>Web development</option>
              <option>-</option>
              <option>-</option>
              <option>Collaboration / other</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Tell me about your project, timeline, and what you need."
              required
            />
          </div>
          <button className="contact-submit" type="submit">
            Compose message <ArrowUpRight size={17} />
          </button>
          <p className="contact-form-note" role="status">
            {prepared
              ? "Your email app should open with your message. If it doesn’t, email me directly using the address alongside."
              : "Opens your email app with your message ready to send."}
          </p>
        </form>
      </div>
      <footer className="signature-footer">
        <div className="footer-meta">
          <a href="mailto:adnan.pls2003@gmail.com">
            Let’s get in touch <ArrowUpRight size={14} />
          </a>
          <p>
            © {new Date().getFullYear()} Adnan Makahhal. All rights reserved.
          </p>
          <a className="back-to-top" href="#home">
            <ArrowUp size={16} /> Back to top
          </a>
        </div>
      </footer>
    </section>
  );
}
