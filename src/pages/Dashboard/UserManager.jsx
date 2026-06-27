import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
    avatar: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_clients') || '[]');
    setUsers(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (user, index) => {
    setEditingIndex(index);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password || '',
      company: user.company || '',
      phone: user.phone || '',
      avatar: user.avatar || ''
    });
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      company: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    });
    setFormMode('add');
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this client user?')) {
      const updated = users.filter((_, i) => i !== index);
      setUsers(updated);
      localStorage.setItem('dsnove_clients', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: formMode === 'add' ? `client-${Date.now()}` : users[editingIndex].id,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      company: formData.company,
      phone: formData.phone,
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...users, newUser];
    } else {
      updated = users.map((u, i) => (i === editingIndex ? newUser : u));
    }

    setUsers(updated);
    localStorage.setItem('dsnove_clients', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">User & Client Management</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>View registered clients, reset passwords, or assign project identifiers.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Register New Client</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4 animate-fade">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Register Client' : 'Edit Client Profile'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Contact Name</label>
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
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Business Email</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-premium"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Password Credential</label>
              <input
                type="text"
                name="password"
                className="form-control form-control-premium"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Company / Client Name</label>
              <input
                type="text"
                name="company"
                className="form-control form-control-premium"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control form-control-premium"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Avatar Image URL (Optional)</label>
              <input
                type="text"
                name="avatar"
                className="form-control form-control-premium"
                value={formData.avatar}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-sm me-2" onClick={() => setFormMode(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm px-4">Save Configuration</button>
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
                  <th>Client Account</th>
                  <th>Email</th>
                  <th>Company affiliation</th>
                  <th>Phone Number</th>
                  <th>Password Key</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                            alt={u.name}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                          />
                          <span className="fw-bold text-white">{u.name}</span>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td><span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-2 py-0.5">{u.company}</span></td>
                      <td className="text-secondary">{u.phone || 'N/A'}</td>
                      <td><code>{u.password}</code></td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(u, index)}>
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
                    <td colSpan="6" className="text-center text-muted py-4">No registered clients found in Local Database.</td>
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
