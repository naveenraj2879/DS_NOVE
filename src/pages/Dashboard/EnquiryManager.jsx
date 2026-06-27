import React, { useState, useEffect } from 'react';
import { FaEnvelopeOpen, FaTrash, FaTimes } from 'react-icons/fa';

export const EnquiryManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dsnove_enquiries') || '[]');
    setEnquiries(stored);
  }, []);

  const handleOpenClick = (enq) => {
    // Mark as read in DB
    const updated = enquiries.map((item) => {
      if (item.id === enq.id) {
        return { ...item, status: 'read' };
      }
      return item;
    });
    setEnquiries(updated);
    localStorage.setItem('dsnove_enquiries', JSON.stringify(updated));
    setSelectedEnquiry({ ...enq, status: 'read' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const updated = enquiries.filter(item => item.id !== id);
      setEnquiries(updated);
      localStorage.setItem('dsnove_enquiries', JSON.stringify(updated));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Enquiry & Application Box</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Review submissions from public contact forms and job application portals.</p>
      </div>

      <div className="row g-4">
        {/* Enquiry Table */}
        <div className={selectedEnquiry ? 'col-lg-7' : 'col-12'}>
          <div className="glass-panel p-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-premium align-middle mb-0">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Subject Scope</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length > 0 ? (
                    enquiries.map((enq) => (
                      <tr key={enq.id} className={enq.status === 'unread' ? 'fw-bold' : ''}>
                        <td className="text-white">{enq.name} <br />
                          <small className="text-muted" style={{ fontWeight: 'normal', fontSize: '0.75rem' }}>{enq.email}</small>
                        </td>
                        <td>{enq.subject}</td>
                        <td style={{ fontSize: '0.8rem' }}>{enq.date}</td>
                        <td>
                          {enq.status === 'unread' ? (
                            <span className="badge bg-danger bg-opacity-15 text-danger border border-danger">Unread</span>
                          ) : (
                            <span className="badge bg-secondary bg-opacity-15 text-secondary border border-secondary">Read</span>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenClick(enq)} title="Open Message">
                              <FaEnvelopeOpen className="text-primary" />
                            </button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(enq.id)} title="Delete Message">
                              <FaTrash className="text-danger" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No submissions in system logs.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Message Viewer */}
        {selectedEnquiry && (
          <div className="col-lg-5">
            <div className="glass-panel p-4 position-relative" style={{ minHeight: '350px' }}>
              <div className="d-flex justify-content-between align-items-start mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <span className="text-primary tech-font" style={{ fontSize: '0.75rem' }}>ID: {selectedEnquiry.id}</span>
                  <h5 className="fw-bold text-white mb-1 mt-1">{selectedEnquiry.subject}</h5>
                  <small className="text-secondary">{selectedEnquiry.name} ({selectedEnquiry.email})</small>
                </div>
                <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setSelectedEnquiry(null)}>
                  <FaTimes size={18} />
                </button>
              </div>

              <div>
                <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Submission Date: {selectedEnquiry.date}</span>
                <p className="text-secondary mt-3 p-3 bg-dark bg-opacity-25 rounded border border-secondary border-opacity-10" style={{ fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="text-end mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(selectedEnquiry.id)}>
                  <FaTrash className="me-2" /> Delete Enquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
