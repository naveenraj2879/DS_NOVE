import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';
import { FaShieldAlt, FaLock, FaSignInAlt, FaEnvelope } from 'react-icons/fa';
import { PageTransition } from '../../components/layout/PageTransition';

export const AdminLogin = () => {
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
      setError('Please enter a valid administrative email.');
      return;
    }
    if (!password) {
      setError('Administrative password is required.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password, 'admin');
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Administrative authentication failed.');
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
              <div className="glass-panel p-4 p-md-5 border border-danger border-opacity-10" style={{ background: 'radial-gradient(circle at center, rgba(220, 53, 69, 0.03) 0%, rgba(0,0,0,0) 80%)' }}>
                <div className="text-center mb-4">
                  <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle d-inline-block mb-3">
                    <FaShieldAlt size={32} />
                  </div>
                  <h3 className="fw-bold text-white mb-1">Administrative Center</h3>
                  <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Secure system nodes and manage public content.</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3 border-0 bg-danger-subtle text-danger mb-4" style={{ fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  {/* Email */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>Admin Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary"><FaEnvelope size={12} /></span>
                      <input
                        type="email"
                        className="form-control form-control-premium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@dsnove.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="form-label text-secondary" style={{ fontSize: '0.8rem' }}>Security Password</label>
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

                  {/* Info Box */}
                  <div className="p-3 bg-dark bg-opacity-50 border border-secondary rounded mb-2 text-secondary" style={{ fontSize: '0.75rem' }}>
                    <strong>Admin Credentials:</strong><br />
                    Email: <code>admin@dsnove.com</code><br />
                    Password: <code>admin123</code>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
                    {submitting ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <>
                        <FaSignInAlt /> <span>Authenticate Admin Node</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
