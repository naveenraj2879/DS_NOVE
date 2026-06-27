import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    shortDesc: '',
    description: '',
    icon: 'FaCode',
    category: '',
    features: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_services') || '[]');
    setServices(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (service) => {
    setFormData({
      id: service.id,
      title: service.title,
      shortDesc: service.shortDesc || '',
      description: service.description,
      icon: service.icon,
      category: service.category,
      features: service.features ? service.features.join(', ') : ''
    });
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      id: `srv-${Date.now()}`,
      title: '',
      shortDesc: '',
      description: '',
      icon: 'FaCode',
      category: 'Core Dev',
      features: ''
    });
    setFormMode('add');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      localStorage.setItem('dsnove_services', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFeatures = formData.features.split(',').map(f => f.trim()).filter(f => f);
    const newService = {
      id: formData.id,
      title: formData.title,
      shortDesc: formData.shortDesc,
      description: formData.description,
      icon: formData.icon,
      category: formData.category,
      features: finalFeatures
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...services, newService];
    } else {
      updated = services.map(s => (s.id === formData.id ? newService : s));
    }

    setServices(updated);
    localStorage.setItem('dsnove_services', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Services CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Add, edit, or delete public company services.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Add Service</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Add Service Node' : 'Edit Service Node'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Service Title</label>
              <input
                type="text"
                name="title"
                className="form-control form-control-premium"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Category Segment</label>
              <input
                type="text"
                name="category"
                className="form-control form-control-premium"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>React Icon Key (e.g. FaBrain, FaCode)</label>
              <input
                type="text"
                name="icon"
                className="form-control form-control-premium"
                value={formData.icon}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Features Checklist (comma-separated)</label>
              <input
                type="text"
                name="features"
                className="form-control form-control-premium"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Short Summary</label>
              <input
                type="text"
                name="shortDesc"
                className="form-control form-control-premium"
                value={formData.shortDesc}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Complete Capability Description</label>
              <textarea
                name="description"
                rows="4"
                className="form-control form-control-premium"
                value={formData.description}
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

      {/* Services Table */}
      {!formMode && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Icon Key</th>
                  <th>Features Count</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((srv) => (
                    <tr key={srv.id}>
                      <td className="fw-bold text-white">{srv.title}</td>
                      <td>{srv.category}</td>
                      <td><code>{srv.icon}</code></td>
                      <td>{srv.features ? srv.features.length : 0} tags</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(srv)}>
                            <FaEdit className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(srv.id)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No services configured.</td>
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
