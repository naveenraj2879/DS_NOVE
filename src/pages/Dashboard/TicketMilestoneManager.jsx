import React, { useState, useEffect } from 'react';
import { FaLifeRing, FaProjectDiagram, FaReply } from 'react-icons/fa';

export const TicketMilestoneManager = () => {
  const [tickets, setTickets] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('dsnove_tickets') || '[]');
    const savedMilestones = JSON.parse(localStorage.getItem('dsnove_milestones') || '[]');
    setTickets(savedTickets);
    setMilestones(savedMilestones);
  }, []);

  const handleSelectTicket = (t) => {
    setSelectedTicket(t);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!adminReply.trim() || !selectedTicket) return;

    setSubmittingReply(true);
    setTimeout(() => {
      const newReply = {
        sender: 'admin',
        text: adminReply,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Admin)'
      };

      const updatedMessages = [...selectedTicket.messages, newReply];
      const updatedTicket = { ...selectedTicket, messages: updatedMessages, status: 'In-Progress' };
      
      const updatedTicketsList = tickets.map(t => (t.id === selectedTicket.id ? updatedTicket : t));
      
      setTickets(updatedTicketsList);
      setSelectedTicket(updatedTicket);
      localStorage.setItem('dsnove_tickets', JSON.stringify(updatedTicketsList));
      setAdminReply('');
      setSubmittingReply(false);
      alert('Support Response posted successfully.');
    }, 800);
  };

  const handleResolveTicket = (tId) => {
    const updated = tickets.map((t) => {
      if (t.id === tId) {
        return { ...t, status: 'Resolved' };
      }
      return t;
    });
    setTickets(updated);
    localStorage.setItem('dsnove_tickets', JSON.stringify(updated));
    if (selectedTicket && selectedTicket.id === tId) {
      setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
    }
    alert(`Ticket ${tId} status updated to Resolved.`);
  };

  const handleMilestoneStatusChange = (mId, newStatus) => {
    const updated = milestones.map((m) => {
      if (m.id === mId) {
        return { ...m, status: newStatus };
      }
      return m;
    });
    setMilestones(updated);
    localStorage.setItem('dsnove_milestones', JSON.stringify(updated));
    alert(`Milestone status updated successfully.`);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Ticket & Milestone Console</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Update client deployment schedules, resolve incidents, and post official developer notes.</p>
      </div>

      <div className="row g-4">
        {/* Support Tickets Section */}
        <div className="col-lg-7">
          <div className="glass-panel p-4 h-100 d-flex flex-column" style={{ minHeight: '480px' }}>
            <h5 className="fw-bold text-white mb-4 pb-2 border-bottom d-flex align-items-center gap-2" style={{ borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
              <FaLifeRing className="text-danger" /> Client Support Tickets
            </h5>

            {selectedTicket ? (
              <div className="d-flex flex-column flex-grow-1" style={{ height: '350px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-0 text-white fw-bold">{selectedTicket.subject}</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>ID: {selectedTicket.id} // Status: <span className="text-primary">{selectedTicket.status}</span></small>
                  </div>
                  <div className="d-flex gap-2">
                    {selectedTicket.status !== 'Resolved' && (
                      <button className="btn btn-xs btn-success py-1 px-2.5" style={{ fontSize: '0.75rem' }} onClick={() => handleResolveTicket(selectedTicket.id)}>
                        Mark Resolved
                      </button>
                    )}
                    <button className="btn btn-xs btn-outline-secondary py-1 px-2" style={{ fontSize: '0.75rem' }} onClick={() => setSelectedTicket(null)}>
                      Close
                    </button>
                  </div>
                </div>

                {/* Chat History */}
                <div className="flex-grow-1 overflow-y-auto mb-3 p-2 bg-dark bg-opacity-25 rounded border border-secondary border-opacity-10" style={{ fontSize: '0.8rem' }}>
                  {selectedTicket.messages.map((m, idx) => (
                    <div key={idx} className={`d-flex mb-3 ${m.sender === 'admin' ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`p-2 rounded-3 max-w-75 ${m.sender === 'admin' ? 'bg-primary text-dark text-end' : 'bg-body-secondary text-white text-start'}`} style={{ maxWidth: '80%' }}>
                        <p className="mb-0">{m.text}</p>
                        <small className="text-muted mt-1 d-block" style={{ fontSize: '0.6rem' }}>{m.date}</small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply form */}
                <form onSubmit={handleSendReply} className="d-flex gap-2 mt-auto">
                  <input
                    type="text"
                    placeholder="Type official engineer response..."
                    className="form-control form-control-premium"
                    value={adminReply}
                    onChange={(e) => setAdminReply(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center" style={{ width: '42px', flexShrink: 0 }}>
                    {submittingReply ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : <FaReply size={12} />}
                  </button>
                </form>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-premium align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.length > 0 ? (
                      tickets.map((t) => (
                        <tr key={t.id}>
                          <td className="fw-bold text-white">{t.id}</td>
                          <td>{t.subject}</td>
                          <td>
                            <span className={`badge ${t.priority === 'High' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-warning bg-opacity-10 text-warning'} px-2 py-0.5`}>
                              {t.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${t.status === 'Resolved' ? 'bg-success' : 'bg-primary'} px-2 py-0.5`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-xs btn-outline-secondary py-1 px-2.5" style={{ fontSize: '0.75rem' }} onClick={() => handleSelectTicket(t)}>
                              Reply
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">No active client tickets found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Milestone Editor Section */}
        <div className="col-lg-5">
          <div className="glass-panel p-4 h-100">
            <h5 className="fw-bold text-white mb-4 pb-2 border-bottom d-flex align-items-center gap-2" style={{ borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
              <FaProjectDiagram className="text-primary" /> Project Milestones
            </h5>

            <div className="d-flex flex-column gap-3">
              {milestones.map((m) => (
                <div key={m.id} className="p-3 border border-secondary border-opacity-10 rounded d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="text-white fw-bold">{m.title}</span>
                    <small className="text-muted">{m.date}</small>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <span className="text-secondary">Progress State:</span>
                    <div className="btn-group btn-group-sm">
                      <button
                        className={`btn btn-xs ${m.status === 'completed' ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => handleMilestoneStatusChange(m.id, 'completed')}
                        style={{ fontSize: '0.7rem' }}
                      >
                        Done
                      </button>
                      <button
                        className={`btn btn-xs ${m.status === 'active' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => handleMilestoneStatusChange(m.id, 'active')}
                        style={{ fontSize: '0.7rem' }}
                      >
                        Active
                      </button>
                      <button
                        className={`btn btn-xs ${m.status === 'pending' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => handleMilestoneStatusChange(m.id, 'pending')}
                        style={{ fontSize: '0.7rem' }}
                      >
                        Wait
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
