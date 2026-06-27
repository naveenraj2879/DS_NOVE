import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const TeamManager = () => {
  const [team, setTeam] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedin: '',
    github: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_team') || '[]');
    setTeam(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (member, index) => {
    setEditingIndex(index);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: member.image || '',
      linkedin: member.socials?.linkedin || '',
      github: member.socials?.github || ''
    });
    setImagePreview(member.image || '');
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      linkedin: '#',
      github: '#'
    });
    setImagePreview('');
    setFormMode('add');
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      const updated = team.filter((_, i) => i !== index);
      setTeam(updated);
      localStorage.setItem('dsnove_team', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: formMode === 'add' ? `team-${Date.now()}` : team[editingIndex]?.id,
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      image: formData.image,
      socials: {
        linkedin: formData.linkedin,
        github: formData.github
      }
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...team, newMember];
    } else {
      updated = team.map((member, i) => (i === editingIndex ? newMember : member));
    }

    setTeam(updated);
    localStorage.setItem('dsnove_team', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Team Profiles CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Manage company executives and department profiles.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4 animate-fade">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Add Executive Member' : 'Edit Executive Member'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Full Name</label>
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
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Corporate Role</label>
              <input
                type="text"
                name="role"
                className="form-control form-control-premium"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>LinkedIn Profile URL</label>
              <input
                type="text"
                name="linkedin"
                className="form-control form-control-premium"
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>GitHub Profile URL</label>
              <input
                type="text"
                name="github"
                className="form-control form-control-premium"
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>

            {/* Image upload */}
            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Profile Picture Upload</label>
              <div className="d-flex align-items-center gap-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-circle border border-secondary"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
                <div className="flex-grow-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control form-control-premium"
                    id="teamImageUpload"
                  />
                  <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                    Max 2MB. Image will be serialized to Base64 and stored in local client state.
                  </small>
                </div>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Short Biography</label>
              <textarea
                name="bio"
                rows="3"
                className="form-control form-control-premium"
                value={formData.bio}
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
                  <th>Role</th>
                  <th>Bio Summary</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.length > 0 ? (
                  team.map((member, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      </td>
                      <td className="fw-bold text-white">{member.name}</td>
                      <td><span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-2.5 py-1">{member.role}</span></td>
                      <td className="text-secondary text-truncate" style={{ maxWidth: '280px' }}>{member.bio}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(member, index)}>
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
                    <td colSpan="5" className="text-center text-muted py-4">No team members registered.</td>
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
