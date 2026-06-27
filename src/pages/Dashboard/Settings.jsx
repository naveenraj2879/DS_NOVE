import React, { useState, useEffect } from 'react';

export const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'DSNOVE',
    tagline: 'Futuristic Enterprise Technology Systems',
    email: 'contact@dsnove.com',
    phone: '+91 (800) 555-NOVE',
    address: 'DSNOVE Tech Park, Chennai, India',
    showPromoBanner: true,
    promoBannerText: '🔥 DSNOVE recognized as top digital innovator in Q2 2026!'
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dsnove_settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        /* use defaults */
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('dsnove_settings', JSON.stringify(settings));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">System Customization</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Update corporate contacts, homepage custom tags, and global banners.</p>
      </div>

      {/* Settings Form */}
      <div className="glass-panel p-4 p-md-5">
        {success && (
          <div className="alert alert-success py-2 px-3 border-0 bg-success-subtle text-success mb-4 animate-fade" style={{ fontSize: '0.85rem' }}>
            🎉 Global settings updated successfully. Refresh public website to review changes.
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-4">
          {/* General Branding */}
          <div className="col-12">
            <h5 className="fw-bold text-white mb-3 text-gradient">Brand Information</h5>
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control form-control-premium"
              value={settings.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Corporate Email</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-premium"
              value={settings.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Homepage Hero Tagline</label>
            <input
              type="text"
              name="tagline"
              className="form-control form-control-premium"
              value={settings.tagline}
              onChange={handleInputChange}
              required
            />
          </div>

          <hr className="border-secondary opacity-10 my-4" />

          {/* Banner Customize */}
          <div className="col-12">
            <h5 className="fw-bold text-white mb-3 text-gradient">Homepage Promotion Banner</h5>
          </div>

          <div className="col-12 mb-2">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPromoBanner"
                name="showPromoBanner"
                checked={settings.showPromoBanner}
                onChange={handleInputChange}
              />
              <label className="form-check-label text-secondary" htmlFor="showPromoBanner" style={{ fontSize: '0.85rem' }}>
                Toggle active promotion banner (displays above navbar)
              </label>
            </div>
          </div>

          {settings.showPromoBanner && (
            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Banner Text Content</label>
              <input
                type="text"
                name="promoBannerText"
                className="form-control form-control-premium"
                value={settings.promoBannerText}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <hr className="border-secondary opacity-10 my-4" />

          {/* Contacts */}
          <div className="col-12">
            <h5 className="fw-bold text-white mb-3 text-gradient">Contact Information</h5>
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Hotline Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control form-control-premium"
              value={settings.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Global HQ Address</label>
            <input
              type="text"
              name="address"
              className="form-control form-control-premium"
              value={settings.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Save Button */}
          <div className="col-12 text-end mt-5">
            <button type="submit" className="btn btn-primary px-5">Save Configuration</button>
          </div>
        </form>
      </div>
    </div>
  );
};
