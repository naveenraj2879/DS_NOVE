import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validatePhone } from '../../utils/validators';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    company: user ? user.company : '',
    phone: user ? user.phone : '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name.trim()) return setError('Full Name is required.');
    if (!formData.company.trim()) return setError('Company Name is required.');
    if (!validatePhone(formData.phone)) return setError('Please enter a valid phone number.');

    if (formData.password) {
      if (formData.password.length < 6) {
        return setError('New password must be at least 6 characters.');
      }
      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match.');
      }
    }

    // Call Context Profile update
    updateProfile({
      name: formData.name,
      company: formData.company,
      phone: formData.phone
    });

    setSuccess(true);
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Edit Client Profile</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Update corporate credentials and security passwords.</p>
      </div>

      {/* Form */}
      <div className="glass-panel p-4 p-md-5">
        {error && (
          <div className="alert alert-danger py-2 px-3 border-0 bg-danger-subtle text-danger mb-4" style={{ fontSize: '0.85rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success py-2 px-3 border-0 bg-success-subtle text-success mb-4" style={{ fontSize: '0.85rem' }}>
            🎉 Portal profile coordinates updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-4">
          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Full Name</label>
            <input
              type="text"
              className="form-control form-control-premium"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Company Name */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Company Name</label>
            <input
              type="text"
              className="form-control form-control-premium"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Acme Technology Corp"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Contact Phone</label>
            <input
              type="text"
              className="form-control form-control-premium"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 019-2834"
              required
            />
          </div>

          {/* User Email (Disabled) */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Business Email (Linked ID)</label>
            <input
              type="email"
              className="form-control form-control-premium"
              value={user ? user.email : ''}
              disabled
            />
            <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>Linked ID cannot be modified after registration.</small>
          </div>

          <hr className="my-4 border-secondary opacity-25" />

          {/* New Password */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>New Password (Leave blank to keep same)</label>
            <input
              type="password"
              className="form-control form-control-premium"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Confirm New Password</label>
            <input
              type="password"
              className="form-control form-control-premium"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <div className="col-12 text-end mt-4">
            <button type="submit" className="btn btn-primary px-5">Save Profile Updates</button>
          </div>
        </form>
      </div>
    </div>
  );
};
