import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePhone } from '../../utils/validators';
import { FaUserPlus, FaLock, FaBuilding, FaPhoneAlt, FaUserAlt, FaEnvelope } from 'react-icons/fa';
import { PageTransition } from '../../components/layout/PageTransition';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Full Name is required.');
    if (!validateEmail(formData.email)) return setError('Please enter a valid email address.');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters.');
    if (!formData.company.trim()) return setError('Company name is required.');
    if (!validatePhone(formData.phone)) return setError('Please enter a valid phone number.');

    setSubmitting(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.company, formData.phone);
      navigate('/portal');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="section-padding d-flex align-items-center justify-content-center" style={{ minHeight: '90vh', background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="glass-panel p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                    <FaUserPlus size={32} />
                  </div>
                  <h3 className="fw-bold text-white mb-1">Client Registration</h3>
                  <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Establish your secure DSNOVE portal node.</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3 border-0 bg-danger-subtle text-danger mb-4" style={{ fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaUserAlt size={12} /></span>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-premium"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Business Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaEnvelope size={12} /></span>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-premium"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="j.doe@acme.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="col-md-6">
                    <label className="form-label text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Company Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaBuilding size={12} /></span>
                      <input
                        type="text"
                        name="company"
                        className="form-control form-control-premium"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Technology Corp"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaPhoneAlt size={12} /></span>
                      <input
                        type="text"
                        name="phone"
                        className="form-control form-control-premium"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 019-2834"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="col-12">
                    <label className="form-label text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Password (min 6 characters)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaLock size={12} /></span>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-premium"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
                      {submitting ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <FaUserPlus /> <span>Initialize Account & Log In</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4" style={{ fontSize: '0.85rem' }}>
                  <span className="text-secondary">Already registered?</span>{' '}
                  <Link to="/portal/login" className="text-primary text-decoration-none fw-bold">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
