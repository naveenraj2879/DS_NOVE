import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { COMPANY_SOCIALS } from '../../utils/mockData';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="border-top" style={{ backgroundColor: 'var(--bg-secondary)', borderTopColor: 'var(--border-color)', position: 'relative', zIndex: 10 }}>
      <div className="container section-padding pb-4">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <h3 className="text-gradient tech-font mb-3 fw-bold">DSNOVE</h3>
            <p className="text-secondary mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
              Pioneering futuristic enterprise systems through Artificial Intelligence, secure cloud infrastructures, and high-fidelity product designs.
            </p>
            <div className="d-flex flex-column gap-3 mb-4 text-secondary" style={{ fontSize: '0.9rem' }}>
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>DSNOVE Tech Park, Chennai, India</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-primary" />
                <span>+91 (800) 555-NOVE</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>contact@dsnove.com</span>
              </div>
            </div>
            <div className="d-flex gap-3">
              <a
                href={COMPANY_SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="DSNOVE on LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={COMPANY_SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="DSNOVE on GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <h5 className="text-white mb-4 fw-bold">Services</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">AI & Machine Learning</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">Enterprise Software</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">Cloud Solutions</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">Cybersecurity</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">DevOps Automation</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-link">UI/UX Interface</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <h5 className="text-white mb-4 fw-bold">Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-link">About Company</Link></li>
              <li><Link to="/careers" className="text-secondary text-decoration-none hover-link">Careers</Link></li>
              <li><Link to="/portfolio" className="text-secondary text-decoration-none hover-link">Case Studies</Link></li>
              <li><Link to="/blog" className="text-secondary text-decoration-none hover-link">Insights Blog</Link></li>
              <li><Link to="/portal/login" className="text-secondary text-decoration-none hover-link">Client Portal</Link></li>
              <li><Link to="/admin/login" className="text-secondary text-decoration-none hover-link">Admin Center</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4 fw-bold">Subscribe to Insights</h5>
            <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
              Get our monthly analysis on enterprise AI capabilities, security trends, and system design.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex gap-2">
              <input
                type="email"
                placeholder="enterprise@domain.com"
                className="form-control form-control-premium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center" style={{ width: '46px', flexShrink: 0 }}>
                <FaPaperPlane />
              </button>
            </form>
            {submitted && (
              <div className="alert alert-success mt-3 py-2 px-3 border-0 bg-success-subtle text-success" style={{ fontSize: '0.8rem' }}>
                Verification link successfully sent to your email.
              </div>
            )}
          </div>
        </div>

        <hr className="mt-5 mb-4" style={{ borderColor: 'var(--border-color)' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-secondary" style={{ fontSize: '0.8rem' }}>
          <div>
            © {new Date().getFullYear()} DSNOVE Systems Inc. All rights reserved.
          </div>
          <div className="d-flex gap-4">
            <Link to="/privacy" className="text-secondary text-decoration-none hover-link">Privacy Policy</Link>
            <Link to="/terms" className="text-secondary text-decoration-none hover-link">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
