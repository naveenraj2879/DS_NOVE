import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInbox, FaBookOpen, FaLifeRing, FaBriefcase, FaServer } from 'react-icons/fa';

export const Overview = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    blogs: 0,
    tickets: 0,
    jobs: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    // Retrieve counts from local database tables
    const enquiries = JSON.parse(localStorage.getItem('dsnove_enquiries') || '[]');
    const blogs = JSON.parse(localStorage.getItem('dsnove_blogs') || '[]');
    const tickets = JSON.parse(localStorage.getItem('dsnove_tickets') || '[]');
    const careers = JSON.parse(localStorage.getItem('dsnove_careers') || '[]');

    setStats({
      enquiries: enquiries.length,
      blogs: blogs.length,
      tickets: tickets.length,
      jobs: careers.length
    });

    setRecentEnquiries(enquiries.slice(0, 3));
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Console Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Administrative Overview</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Global server stats, database sizes, and client transaction volumes.</p>
      </div>

      {/* Admin stats */}
      <div className="row g-4">
        {/* Enquiries count */}
        <div className="col-lg-3 col-sm-6">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>User Enquiries</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{stats.enquiries} Logged</h3>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3">
              <FaInbox size={20} />
            </div>
          </div>
        </div>

        {/* Tickets count */}
        <div className="col-lg-3 col-sm-6">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Portal Tickets</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{stats.tickets} Open</h3>
            </div>
            <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-3">
              <FaLifeRing size={20} />
            </div>
          </div>
        </div>

        {/* Blogs count */}
        <div className="col-lg-3 col-sm-6">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Insights Articles</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{stats.blogs} Published</h3>
            </div>
            <div className="p-3 bg-success bg-opacity-10 text-success rounded-3">
              <FaBookOpen size={20} />
            </div>
          </div>
        </div>

        {/* Jobs count */}
        <div className="col-lg-3 col-sm-6">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Open Careers</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{stats.jobs} Positions</h3>
            </div>
            <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-3">
              <FaBriefcase size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Console details */}
      <div className="row g-4">
        {/* Recent Inbound Queries */}
        <div className="col-lg-8">
          <div className="glass-panel p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
              <h5 className="fw-bold text-white mb-0" style={{ fontSize: '0.95rem' }}>Recent User Enquiries</h5>
              <Link to="/admin/enquiries" className="text-primary fw-bold text-decoration-none" style={{ fontSize: '0.8rem' }}>View All →</Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => (
                  <div key={enq.id} className="p-3 border border-secondary border-opacity-10 rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0 text-white fw-bold" style={{ fontSize: '0.85rem' }}>{enq.name} <span className="text-muted" style={{ fontWeight: 'normal', fontSize: '0.75rem' }}>({enq.email})</span></h6>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>{enq.date}</small>
                    </div>
                    <span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-2 py-0.5 mb-2" style={{ fontSize: '0.65rem' }}>{enq.subject}</span>
                    <p className="text-secondary mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>{enq.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-4 my-0">No enquiries logged yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Server Node Status */}
        <div className="col-lg-4">
          <div className="glass-panel p-4 h-100">
            <h5 className="fw-bold text-white mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
              DSNOVE Host Cluster
            </h5>
            
            <div className="d-flex flex-column gap-3" style={{ fontSize: '0.85rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-secondary">AI Node AWS-US-EAST</span>
                <span className="badge bg-success bg-opacity-15 text-success border border-success">Online</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-secondary">DB Node CLOUD-GCP</span>
                <span className="badge bg-success bg-opacity-15 text-success border border-success">Syncing</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-secondary">Frontend VERCEL-CDN</span>
                <span className="badge bg-success bg-opacity-15 text-success border border-success">Optimal</span>
              </div>
              <hr className="my-2 border-secondary" />
              <div className="d-flex align-items-center gap-2 text-secondary">
                <FaServer className="text-primary" />
                <span style={{ fontSize: '0.8rem' }}>Host CPU: 12% // Mem: 34%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
