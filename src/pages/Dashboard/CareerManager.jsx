import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const CareerManager = () => {
  const [careers, setCareers] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    benefits: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_careers') || '[]');
    setCareers(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (job) => {
    setFormData({
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements ? job.requirements.join(', ') : '',
      benefits: job.benefits ? job.benefits.join(', ') : ''
    });
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      id: `job-${Date.now()}`,
      title: '',
      department: 'Web Development',
      location: 'Remote',
      type: 'Full-time',
      description: '',
      requirements: '',
      benefits: ''
    });
    setFormMode('add');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job opening?')) {
      const updated = careers.filter(c => c.id !== id);
      setCareers(updated);
      localStorage.setItem('dsnove_careers', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRequirements = formData.requirements.split(',').map(r => r.trim()).filter(r => r);
    const finalBenefits = formData.benefits.split(',').map(b => b.trim()).filter(b => b);
    
    const newJob = {
      id: formData.id,
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      requirements: finalRequirements,
      benefits: finalBenefits
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...careers, newJob];
    } else {
      updated = careers.map(c => (c.id === formData.id ? newJob : c));
    }

    setCareers(updated);
    localStorage.setItem('dsnove_careers', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Careers CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Create, update, or delete career listings.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Add Position</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Add Position Node' : 'Edit Position Node'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Job Title</label>
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
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Job Department</label>
              <input
                type="text"
                name="department"
                className="form-control form-control-premium"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Job Location</label>
              <input
                type="text"
                name="location"
                className="form-control form-control-premium"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Commitment Type</label>
              <select
                name="type"
                className="form-select form-control-premium"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Compensation & Benefits (comma-separated)</label>
              <input
                type="text"
                name="benefits"
                className="form-control form-control-premium"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="Health cover, Annual PTO, Tech budget"
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Position Requirements (comma-separated)</label>
              <input
                type="text"
                name="requirements"
                className="form-control form-control-premium"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Requirement 1, Requirement 2, Requirement 3"
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Job Scope & Mission</label>
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
              <button type="submit" className="btn btn-primary btn-sm px-4">Save Position</button>
            </div>
          </form>
        </div>
      )}

      {/* Careers Table */}
      {!formMode && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Commitment</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers.length > 0 ? (
                  careers.map((job) => (
                    <tr key={job.id}>
                      <td className="fw-bold text-white">{job.title}</td>
                      <td>{job.department}</td>
                      <td>{job.location}</td>
                      <td>{job.type}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(job)}>
                            <FaEdit className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(job.id)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No open job positions configured.</td>
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
