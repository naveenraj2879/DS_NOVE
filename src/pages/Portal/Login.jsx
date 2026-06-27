import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';
import { FaUserAlt, FaLock, FaSignInAlt, FaRobot } from 'react-icons/fa';
import { PageTransition } from '../../components/layout/PageTransition';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid business email.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password, 'client');
      navigate('/portal');
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="section-padding d-flex align-items-center justify-content-center" style={{ minHeight: '85vh', background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="glass-panel p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                    <FaRobot size={32} />
                  </div>
                  <h3 className="fw-bold text-white mb-1">Client Portal Login</h3>
                  <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Access active project deliverables and billing systems.</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3 border-0 bg-danger-subtle text-danger mb-4" style={{ fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  {/* Email */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>Business Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaUserAlt size={12} /></span>
                      <input
                        type="email"
                        className="form-control form-control-premium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>Account Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaLock size={12} /></span>
                      <input
                        type="password"
                        className="form-control form-control-premium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Info Badge */}
                  <div className="p-3 bg-dark bg-opacity-50 border border-secondary rounded mb-2 text-secondary" style={{ fontSize: '0.75rem' }}>
                    <strong>Demo Credentials:</strong><br />
                    Email: <code>client@company.com</code><br />
                    Password: <code>client123</code>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
                    {submitting ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <>
                        <FaSignInAlt /> <span>Authenticate Session</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4" style={{ fontSize: '0.85rem' }}>
                  <span className="text-secondary">First deployment cycle?</span>{' '}
                  <Link to="/portal/register" className="text-primary text-decoration-none fw-bold">Register Company Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
