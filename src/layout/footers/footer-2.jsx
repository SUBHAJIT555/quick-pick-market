import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import contactInfo, { siteInfo } from "@/data/contact-info";
import { Email, Location } from "@/svg";
import logo from "@assets/img/logo/logo.svg";
import pay from "@assets/img/footer/footer-pay.png";
import { submitToApi } from "@/lib/submit-api";
import { notifyError, notifySuccess } from "@/utils/toast";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/return-policy" },
];

const FooterTwo = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email?.trim() ?? "";
    if (!trimmed) return;
    setSubmitting(true);
    const result = await submitToApi({ formType: "newsletter", email: trimmed });
    setSubmitting(false);
    if (result.success) {
      notifySuccess("Subscribed successfully!");
      setEmail("");
    } else {
      notifyError(result.error || "Subscription failed.");
    }
  };

  return (
    <footer className="scs-footer">
      <div className="scs-footer__main">
        <div className="scs-footer__inner">
          <div className="scs-footer__top">
            <div className="scs-footer__brand">
              <Link href="/" className="scs-footer__logo">
                <Image src={logo} alt={siteInfo.companyName} width={160} height={42} />
              </Link>
              <p className="scs-footer__tagline">{siteInfo.tagline}</p>
              <p className="scs-footer__domain">{siteInfo.domain}</p>

              <div className="scs-footer__contact">
                <a href={contactInfo.telLink} className="scs-footer__phone">
                  {contactInfo.phone}
                </a>
                <ul className="scs-footer__contact-list">
                  <li>
                    <span className="scs-footer__contact-icon" aria-hidden="true">
                      <Email />
                    </span>
                    <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>
                  </li>
                  <li>
                    <span className="scs-footer__contact-icon" aria-hidden="true">
                      <Location />
                    </span>
                    <a href={contactInfo.mapLink} target="_blank" rel="noreferrer">
                      {contactInfo.addressDisplay}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="scs-footer__nav">
              <nav className="scs-footer__col" aria-label="Quick links">
                <h3 className="scs-footer__heading">Quick links</h3>
                <ul className="scs-footer__links">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav className="scs-footer__col" aria-label="Legal">
                <h3 className="scs-footer__heading">Legal</h3>
                <ul className="scs-footer__links">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="scs-footer__newsletter">
              <h3 className="scs-footer__heading">Stay updated</h3>
              <p className="scs-footer__newsletter-text">
                Deals and new arrivals from {siteInfo.companyName}.
              </p>
              <form className="scs-footer__form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="scs-footer__input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitting}
                  aria-label="Email address"
                />
                <button type="submit" className="scs-footer__submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="scs-footer__bottom">
        <div className="scs-footer__inner scs-footer__bottom-inner">
          <p className="scs-footer__copyright">
            © {new Date().getFullYear()} {siteInfo.companyName}. All rights reserved.
          </p>
          <div className="scs-footer__payments">
            <Image src={pay} alt="Accepted payment methods" width={220} height={28} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
