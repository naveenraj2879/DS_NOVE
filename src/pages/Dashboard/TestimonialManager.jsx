import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes, FaUser } from 'react-icons/fa';

export const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    avatar: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_testimonials') || '[]');
    setTestimonials(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (test, index) => {
    setEditingIndex(index);
    setFormData({
      name: test.name,
      role: test.role,
      company: test.company,
      quote: test.quote,
      avatar: test.avatar || ''
    });
    setAvatarPreview(test.avatar || '');
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      quote: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    });
    setAvatarPreview('');
    setFormMode('add');
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const updated = testimonials.filter((_, i) => i !== index);
      setTestimonials(updated);
      localStorage.setItem('dsnove_testimonials', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      id: `test-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      company: formData.company,
      quote: formData.quote,
      avatar: formData.avatar
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...testimonials, newTestimonial];
    } else {
      updated = testimonials.map((t, i) => (i === editingIndex ? newTestimonial : t));
    }

    setTestimonials(updated);
    localStorage.setItem('dsnove_testimonials', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Testimonials CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Review and showcase customer success highlights.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4 animate-fade">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Client Representative Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-premium"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Representative Role</label>
              <input
                type="text"
                name="role"
                className="form-control form-control-premium"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. Chief Technical Officer"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Company / Organization Name</label>
              <input
                type="text"
                name="company"
                className="form-control form-control-premium"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Avatar upload */}
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Representative Avatar</label>
              <div className="d-flex align-items-center gap-3">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="rounded-circle border border-secondary"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px' }}>
                    <FaUser size={18} />
                  </div>
                )}
                <div className="flex-grow-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="form-control form-control-premium"
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Detailed Client Quote</label>
              <textarea
                name="quote"
                rows="4"
                className="form-control form-control-premium"
                value={formData.quote}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-sm me-2" onClick={() => setFormMode(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm px-4">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {!formMode && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Company & Role</th>
                  <th>Client Quote</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length > 0 ? (
                  testimonials.map((test, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={test.avatar}
                          alt={test.name}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      </td>
                      <td className="fw-bold text-white">{test.name}</td>
                      <td>
                        <div className="fw-semibold text-primary">{test.company}</div>
                        <small className="text-secondary" style={{ fontSize: '0.75rem' }}>{test.role}</small>
                      </td>
                      <td className="text-secondary text-truncate" style={{ maxWidth: '350px' }}>"{test.quote}"</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(test, index)}>
                            <FaEdit className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(index)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No testimonials uploaded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
