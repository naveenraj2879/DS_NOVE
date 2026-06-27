import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaBroadcastTower } from 'react-icons/fa';
import { validateContactForm } from '../utils/validators';
import { PageTransition } from '../components/layout/PageTransition';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData.name, formData.email, formData.subject, formData.message);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Save inquiry to localStorage
    const enquiries = JSON.parse(localStorage.getItem('dsnove_enquiries') || '[]');
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };

    enquiries.push(newEnquiry);
    localStorage.setItem('dsnove_enquiries', JSON.stringify(enquiries));

    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          {/* Title Header */}
          <div className="text-center mb-5">
            <span className="section-subtitle">Get In Touch</span>
            <h1 className="display-5 fw-bold text-white mb-3">Enterprise Technical Consultations</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
              Connect with our solution architects to map architectures, request product estimates, or arrange pentests.
            </p>
          </div>

          <div className="row g-5">
            {/* Info and Mock Map */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4 mb-5">
                {/* Location */}
                <div className="glass-panel p-4 d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle">
                    <FaMapMarkerAlt size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">Global Headquarters</h5>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>Suite 400, 100 Futuristic Way, Cyber City</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="glass-panel p-4 d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle">
                    <FaPhoneAlt size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">Hotline Contact</h5>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>+1 (800) 555-NOVE</p>
                  </div>
                </div>

                {/* Email */}
                <div className="glass-panel p-4 d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle">
                    <FaEnvelope size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">Inquiries Email</h5>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>contact@dsnove.com</p>
                  </div>
                </div>
              </div>

              {/* Premium Interactive Mock Map */}
              <div className="glass-panel p-4 position-relative overflow-hidden text-center d-flex flex-column justify-content-center" style={{ height: '320px', background: 'radial-gradient(circle at center, rgba(var(--primary-rgb), 0.15) 0%, rgba(0,0,0,0.6) 80%)' }}>
                {/* Tech scan grid lines */}
                <div className="position-absolute w-100 h-100 top-0 left-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.8, zIndex: 0 }} />
                
                {/* Radar target animation */}
                <div className="position-relative d-inline-block mx-auto mb-3" style={{ zIndex: 1 }}>
                  <div className="position-absolute bg-primary rounded-circle animate-ping" style={{ width: '46px', height: '46px', opacity: 0.35, animation: 'pulse 2.5s infinite', left: '-13px', top: '-13px' }} />
                  <div className="bg-primary text-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px', boxShadow: 'var(--glow-primary-lg)' }}>
                    <FaBroadcastTower size={12} />
                  </div>
                </div>
                
                <h5 className="fw-bold text-white relative mb-2" style={{ zIndex: 1 }}>DSNOVE Coordinates Pin</h5>
                <p className="text-secondary relative mb-3" style={{ zIndex: 1, fontSize: '0.8rem' }}>
                  LAT: 37.7749° N // LNG: 122.4194° W
                </p>
                <div className="relative" style={{ zIndex: 1 }}>
                  <span className="badge bg-success-subtle text-success border border-success px-3 py-2" style={{ fontSize: '0.75rem' }}>
                    🟢 Network Node: Active & Syncing
                  </span>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="col-lg-7">
              <div className="glass-panel p-4 p-md-5 h-100">
                <h3 className="fw-bold text-white mb-4">Send Consultation Request</h3>

                {success && (
                  <div className="alert alert-success border-0 bg-success-subtle text-success py-3 px-4 mb-4">
                    <h5>🎉 Request Logged Successfully!</h5>
                    <p className="mb-0 mt-2" style={{ fontSize: '0.85rem' }}>
                      A DSNOVE Solutions Architect will verify your email and trigger an invitation link in 1 business day.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                  {/* Name */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-premium"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <small className="text-danger mt-1 d-block">{errors.name}</small>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Business Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-premium"
                      placeholder="s.jenkins@enterprise.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <small className="text-danger mt-1 d-block">{errors.email}</small>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Request Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control form-control-premium"
                      placeholder="AI Diagnostic Pipeline Scope Assessment"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                    {errors.subject && <small className="text-danger mt-1 d-block">{errors.subject}</small>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Inquiry Message (min 10 chars)</label>
                    <textarea
                      name="message"
                      rows="5"
                      className="form-control form-control-premium"
                      placeholder="Please outline the architecture details, timelines, and security guidelines for this project..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    {errors.message && <small className="text-danger mt-1 d-block">{errors.message}</small>}
                  </div>

                  {/* Submit Button */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-premium d-inline-flex align-items-center gap-2 px-5">
                      <FaPaperPlane /> <span>Send Request</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
