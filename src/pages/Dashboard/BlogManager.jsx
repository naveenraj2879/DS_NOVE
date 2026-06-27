import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes } from 'react-icons/fa';

export const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    summary: '',
    content: '',
    author: '',
    date: '',
    readTime: '5 min read',
    category: '',
    tags: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_blogs') || '[]');
    setBlogs(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setFormMode('edit');
  };

  const handleAddClick = () => {
    setFormData({
      id: `blog-${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      author: 'Dharani D, Founder & Full Stack Developer',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: 'Artificial Intelligence',
      tags: ''
    });
    setFormMode('add');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('dsnove_blogs', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const newBlog = {
      id: formData.id,
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      author: formData.author,
      date: formData.date,
      readTime: formData.readTime,
      category: formData.category,
      tags: finalTags
    };

    let updated = [];
    if (formMode === 'add') {
      updated = [newBlog, ...blogs];
    } else {
      updated = blogs.map(b => (b.id === formData.id ? newBlog : b));
    }

    setBlogs(updated);
    localStorage.setItem('dsnove_blogs', JSON.stringify(updated));
    setFormMode(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Blogs CMS</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Write, edit, or delete public company research articles.</p>
        </div>
        {!formMode && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddClick}>
            <FaPlusCircle /> <span>Write Article</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      {formMode && (
        <div className="glass-panel p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-white mb-0">{formMode === 'add' ? 'Write Article' : 'Edit Article'}</h4>
            <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setFormMode(null)}>
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Article Title</label>
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
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Author (Name, Credentials)</label>
              <input
                type="text"
                name="author"
                className="form-control form-control-premium"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-3">
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

            <div className="col-md-3">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Read Time estimate</label>
              <input
                type="text"
                name="readTime"
                className="form-control form-control-premium"
                value={formData.readTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Date Published</label>
              <input
                type="date"
                name="date"
                className="form-control form-control-premium"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Search Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                className="form-control form-control-premium"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="AI, Security, Cloud"
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Article Executive Summary</label>
              <input
                type="text"
                name="summary"
                className="form-control form-control-premium"
                value={formData.summary}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Full Article Markdown Content (separate headers with ###)</label>
              <textarea
                name="content"
                rows="8"
                className="form-control form-control-premium"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-sm me-2" onClick={() => setFormMode(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm px-4">Publish Article</button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs Table */}
      {!formMode && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="fw-bold text-white">{blog.title}</td>
                      <td>{blog.author.split(',')[0]}</td>
                      <td>{blog.category}</td>
                      <td>{blog.date}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(blog)}>
                            <FaEdit className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(blog.id)}>
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No articles written.</td>
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
