import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { PageTransition } from '../components/layout/PageTransition';

export const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('dsnove_blogs');
    if (stored) {
      const allBlogs = JSON.parse(stored);
      const matched = allBlogs.find(b => b.id === id);
      setBlog(matched);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="section-padding text-center" style={{ background: 'var(--bg-gradient)' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="section-padding text-center" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container py-5 glass-panel">
          <h2 className="text-white mb-3">Article Not Found</h2>
          <p className="text-secondary mb-4">The requested article ID does not exist in our system database.</p>
          <Link to="/blog" className="btn btn-primary btn-sm">
            Back to Insights Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Back Navigation */}
              <Link to="/blog" className="text-primary d-flex align-items-center gap-2 mb-4 text-decoration-none fw-bold" style={{ fontSize: '0.9rem' }}>
                <FaArrowLeft /> Back to Insights Feed
              </Link>

              {/* Category Badge */}
              <span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-3 py-1 mb-3" style={{ fontSize: '0.75rem' }}>
                {blog.category}
              </span>

              {/* Title */}
              <h1 className="display-5 fw-bold text-white mb-4 lh-sm">{blog.title}</h1>

              {/* Metadata */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-top border-bottom py-3 mb-5" style={{ borderColor: 'var(--border-color)' }}>
                {/* Author */}
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={blog.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                    alt={blog.author}
                    className="rounded-circle"
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 text-white fw-bold">{blog.author.split(',')[0]}</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{blog.author.split(',')[1] || 'Technical Specialist'}</small>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="d-flex align-items-center gap-4 text-secondary" style={{ fontSize: '0.85rem' }}>
                  <span className="d-flex align-items-center gap-1">
                    <FaCalendarAlt className="text-primary" /> {blog.date}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaClock className="text-primary" /> {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Summary highlight */}
              <div className="glass-panel p-4 mb-5 border-start border-primary border-4" style={{ borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0' }}>
                <p className="mb-0 text-secondary fw-semibold" style={{ fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6' }}>
                  "{blog.summary}"
                </p>
              </div>

              {/* Main Content Body */}
              <div className="text-secondary mb-5" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                {blog.content.split('\n\n').map((para, pidx) => {
                  if (para.startsWith('### ')) {
                    return <h3 key={pidx} className="text-white fw-bold mt-5 mb-3">{para.replace('### ', '')}</h3>;
                  }
                  if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                    return <p key={pidx} className="mb-2 ms-3">{para}</p>;
                  }
                  return <p key={pidx} className="mb-4">{para}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="border-top pt-4 d-flex flex-wrap gap-2" style={{ borderColor: 'var(--border-color)' }}>
                {blog.tags && blog.tags.map((tag, tid) => (
                  <span key={tid} className="badge bg-dark border border-secondary text-secondary-emphasis py-2 px-3" style={{ fontSize: '0.8rem' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
