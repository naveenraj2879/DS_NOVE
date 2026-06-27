import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { PageTransition } from '../components/layout/PageTransition';
import avatarClientImg from '../assets/brand/avatar-client.svg';

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const stored = localStorage.getItem('dsnove_blogs');
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  const categories = ['All', ...new Set(blogs.map(b => b.category))];

  // Filtering + Search Logic
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <span className="section-subtitle">DSNOVE Insights</span>
            <h1 className="display-5 fw-bold text-white mb-3">Technology Chronicles</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
              Deep-dives on generative AI models, zero-trust cybersecurity structures, and container scaling architectures.
            </p>
          </div>

          {/* Search and Filter Row */}
          <div className="row g-4 justify-content-between align-items-center mb-5">
            {/* Filter */}
            <div className="col-lg-7 col-md-12 d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm px-4 py-2 tech-font border ${
                    activeCategory === cat
                      ? 'btn-primary border-primary text-dark fw-bold'
                      : 'btn-outline-secondary border-secondary text-secondary-emphasis'
                  }`}
                  style={{ borderRadius: '25px', transition: 'all 0.3s ease' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="col-lg-4 col-md-6 ms-auto">
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Search articles or tags..."
                  className="form-control form-control-premium py-2 ps-4 pe-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="position-absolute text-secondary" style={{ right: '15px', top: '13px' }} />
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="row g-4">
              {filteredBlogs.map((blog, idx) => (
                <div key={blog.id} className="col-lg-4 col-md-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="glass-panel overflow-hidden h-100 d-flex flex-column justify-content-between"
                  >
                    <div className="p-4">
                      {/* Meta */}
                      <div className="d-flex align-items-center gap-3 text-secondary mb-3" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-1">
                          <FaCalendarAlt className="text-primary" /> {blog.date}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <FaClock className="text-primary" /> {blog.readTime}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-3 py-1 mb-3" style={{ fontSize: '0.7rem' }}>
                        {blog.category}
                      </span>

                      {/* Title & Summary */}
                      <h4 className="fw-bold fs-5 text-white mb-3 hover-link">
                        <Link to={`/blog/${blog.id}`} className="text-white text-decoration-none">{blog.title}</Link>
                      </h4>
                      <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                        {blog.summary}
                      </p>
                    </div>

                    {/* Footer / Author */}
                    <div className="p-4 pt-0 border-top mt-3" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={blog.avatar || avatarClientImg}
                            alt={blog.author}
                            className="rounded-circle"
                            style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                          />
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>{blog.author.split(',')[0]}</span>
                        </div>
                        <Link to={`/blog/${blog.id}`} className="text-primary fw-bold" style={{ fontSize: '0.85rem', textDecoration: 'none' }}>
                          Read Article →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 glass-panel">
              <p className="text-secondary mb-0">No matching research articles found. Try another search query.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
