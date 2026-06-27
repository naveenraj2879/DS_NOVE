import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const PortfolioManager = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'AI',
    client: '',
    image: '',
    tags: '',
    challenge: '',
    solution: '',
    result: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_portfolios') || '[]');
    setPortfolios(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (project) => {
    setFormData({
      id: project.id,
      title: project.title,
      category: project.category,
      client: project.client,
      image: project.image,
      tags: project.tags ? project.tags.join(', ') : '',
      challenge: project.challenge,
      solution: project.solution,
      result: project.result
    });
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      id: `port-${Date.now()}`,
      title: '',
      category: 'AI',
      client: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      tags: '',
      challenge: '',
      solution: '',
      result: ''
    });
    setFormMode('add');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      const updated = portfolios.filter(p => p.id !== id);
      setPortfolios(updated);
      localStorage.setItem('dsnove_portfolios', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const newProject = {
      id: formData.id,
      title: formData.title,
      category: formData.category,
      client: formData.client,
      image: formData.image,
      tags: finalTags,
      challenge: formData.challenge,
      solution: formData.solution,
      result: formData.result
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [...portfolios, newProject];
    } else {
      updated = portfolios.map(p => (p.id === formData.id ? newProject : p));
    }

    setPortfolios(updated);
    localStorage.setItem('dsnove_portfolios', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Portfolio CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Add, edit, or delete public company case studies.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Add Case Study' : 'Edit Case Study'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Project Title</label>
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
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Client Name</label>
              <input
                type="text"
                name="client"
                className="form-control form-control-premium"
                value={formData.client}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Category Segment</label>
              <select
                name="category"
                className="form-select form-control-premium"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="AI">AI & Machine Learning</option>
                <option value="Cloud">Cloud Infrastructure</option>
                <option value="Cybersecurity">Cybersecurity Core</option>
                <option value="Mobile">Mobile App Development</option>
                <option value="Web">Web Systems</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Featured Image URL</label>
              <input
                type="text"
                name="image"
                className="form-control form-control-premium"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Tech Stack Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                className="form-control form-control-premium"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="React, Next, AWS"
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Operational Challenge</label>
              <textarea
                name="challenge"
                rows="3"
                className="form-control form-control-premium"
                value={formData.challenge}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Delivered Solution</label>
              <textarea
                name="solution"
                rows="3"
                className="form-control form-control-premium"
                value={formData.solution}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Measurable Result</label>
              <textarea
                name="result"
                rows="3"
                className="form-control form-control-premium"
                value={formData.result}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-sm me-2" onClick={() => setFormMode(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm px-4">Save Case Study</button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolios Table */}
      {!formMode && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Project Title</th>
                  <th>Category</th>
                  <th>Tags Count</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.length > 0 ? (
                  portfolios.map((proj) => (
                    <tr key={proj.id}>
                      <td className="fw-bold text-primary">{proj.client}</td>
                      <td className="text-white">{proj.title}</td>
                      <td>{proj.category}</td>
                      <td>{proj.tags ? proj.tags.length : 0} tags</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(proj)}>
                            <FaEdit className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(proj.id)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No portfolio case studies logged.</td>
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
