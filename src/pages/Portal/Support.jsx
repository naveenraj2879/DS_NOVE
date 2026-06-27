import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

export const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicketMode, setNewTicketMode] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    department: 'Engineering',
    priority: 'Medium',
    description: ''
  });
  const [replyInput, setReplyInput] = useState('');
  const [submittingTicket, setSubmittingTicket] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dsnove_tickets') || '[]');
    setTickets(saved);
  }, []);

  const handleSelectTicket = (tId) => {
    const matched = tickets.find((t) => t.id === tId);
    setSelectedTicket(matched);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) return;

    setSubmittingTicket(true);
    setTimeout(() => {
      const newTicket = {
        id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: formData.subject,
        department: formData.department,
        priority: formData.priority,
        status: 'Open',
        createdAt: new Date().toISOString().split('T')[0],
        messages: [
          { sender: 'client', text: formData.description, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      };

      const updated = [newTicket, ...tickets];
      setTickets(updated);
      localStorage.setItem('dsnove_tickets', JSON.stringify(updated));
      setFormData({ subject: '', department: 'Engineering', priority: 'Medium', description: '' });
      setNewTicketMode(false);
      setSubmittingTicket(false);
      alert('Support Ticket opened successfully. Tech leads will reply shortly.');
    }, 1000);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedTicket) return;

    const newReply = {
      sender: 'client',
      text: replyInput,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...selectedTicket.messages, newReply];
    const updatedTicket = { ...selectedTicket, messages: updatedMessages, status: 'Open' };
    
    const updatedTicketsList = tickets.map((t) => (t.id === selectedTicket.id ? updatedTicket : t));
    
    setTickets(updatedTicketsList);
    setSelectedTicket(updatedTicket);
    localStorage.setItem('dsnove_tickets', JSON.stringify(updatedTicketsList));
    setReplyInput('');

    // Simulate automated developer support reply
    setTimeout(() => {
      const devReply = {
        sender: 'admin',
        text: 'Syncing with the local engineering branch to investigate. We will post a technical status update here shortly.',
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...updatedMessages, devReply];
      const finalTicket = { ...updatedTicket, messages: finalMessages, status: 'In-Progress' };
      const finalTicketsList = updatedTicketsList.map((t) => (t.id === selectedTicket.id ? finalTicket : t));
      
      setTickets(finalTicketsList);
      setSelectedTicket(finalTicket);
      localStorage.setItem('dsnove_tickets', JSON.stringify(finalTicketsList));
    }, 1500);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-white mb-1">Support Workspace</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Submit technical incidents and track developer answers.</p>
        </div>
        {!newTicketMode && !selectedTicket && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setNewTicketMode(true)}>
            <FaPlusCircle /> <span>Open Ticket</span>
          </button>
        )}
      </div>

      {/* Mode 1: Create Ticket */}
      {newTicketMode && (
        <div className="glass-panel p-4 p-md-5">
          <button className="btn btn-sm btn-link text-primary d-flex align-items-center gap-2 p-0 mb-4 text-decoration-none fw-bold" onClick={() => setNewTicketMode(false)}>
            <FaArrowLeft /> Back to Tickets
          </button>
          
          <h4 className="fw-bold text-white mb-4">Open Support Incident</h4>
          <form onSubmit={handleCreateTicket} className="row g-3">
            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Ticket Subject</label>
              <input
                type="text"
                className="form-control form-control-premium"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Latency spikes on scan API nodes"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Target Department</label>
              <select
                className="form-select form-control-premium"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              >
                <option value="Engineering">Engineering & Development</option>
                <option value="Billing">Billing & Finance</option>
                <option value="General">General / Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Priority Level</label>
              <select
                className="form-select form-control-premium"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="Low">Low (General queries)</option>
                <option value="Medium">Medium (Non-blocking bug)</option>
                <option value="High">High (Production blocked)</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Incident Description</label>
              <textarea
                className="form-control form-control-premium"
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe the issue, including steps to reproduce, error codes, and server conditions..."
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="submit" className="btn btn-primary px-4" disabled={submittingTicket}>
                {submittingTicket ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Log Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mode 2: Detailed Ticket Chat */}
      {selectedTicket && (
        <div className="glass-panel p-4 d-flex flex-column" style={{ height: '520px' }}>
          <button className="btn btn-sm btn-link text-primary d-flex align-items-center gap-2 p-0 mb-3 text-decoration-none fw-bold" onClick={() => setSelectedTicket(null)}>
            <FaArrowLeft /> Back to Tickets list
          </button>

          <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
            <div>
              <span className="text-secondary fw-semibold tech-font" style={{ fontSize: '0.8rem' }}>{selectedTicket.id} // {selectedTicket.department}</span>
              <h4 className="fw-bold text-white mb-0 mt-1">{selectedTicket.subject}</h4>
            </div>
            <span className={`badge ${selectedTicket.priority === 'High' ? 'bg-danger' : selectedTicket.priority === 'Medium' ? 'bg-warning' : 'bg-secondary'}`}>
              {selectedTicket.priority} Priority
            </span>
          </div>

          {/* Ticket Messages Scroll */}
          <div className="flex-grow-1 overflow-y-auto mb-3 p-3 bg-dark bg-opacity-20 border border-secondary border-opacity-10 rounded d-flex flex-column gap-3" style={{ fontSize: '0.85rem' }}>
            {selectedTicket.messages.map((m, idx) => (
              <div key={idx} className={`d-flex ${m.sender === 'client' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`p-2 rounded-3 max-w-75 ${m.sender === 'client' ? 'bg-primary text-dark text-end' : 'bg-body-secondary text-white text-start'}`} style={{ maxWidth: '80%' }}>
                  <p className="mb-0">{m.text}</p>
                  <small className="text-muted mt-1 d-block" style={{ fontSize: '0.65rem' }}>{m.date}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="d-flex gap-2">
            <input
              type="text"
              placeholder="Send message to developer leads..."
              className="form-control form-control-premium"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center" style={{ width: '42px', flexShrink: 0 }}>
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Mode 3: Ticket List */}
      {!newTicketMode && !selectedTicket && (
        <div className="glass-panel p-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-premium align-middle mb-0">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Logged Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((t) => (
                    <tr key={t.id}>
                      <td className="fw-bold tech-font text-white">{t.id}</td>
                      <td>{t.subject}</td>
                      <td>{t.department}</td>
                      <td>
                        <span className={`badge ${t.priority === 'High' ? 'bg-danger bg-opacity-15 text-danger border border-danger' : t.priority === 'Medium' ? 'bg-warning bg-opacity-15 text-warning border border-warning' : 'bg-secondary bg-opacity-15 text-secondary border border-secondary'} px-2 py-0.5`}>
                          {t.priority}
                        </span>
                      </td>
                      <td>
                        {t.status === 'Resolved' ? (
                          <span className="badge bg-success bg-opacity-15 text-success border border-success px-2 py-0.5">Resolved</span>
                        ) : (
                          <span className="badge bg-primary bg-opacity-15 text-primary border border-primary px-2 py-0.5">{t.status}</span>
                        )}
                      </td>
                      <td>{t.createdAt}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary py-1 px-3" onClick={() => handleSelectTicket(t.id)}>
                          View Thread
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">No logged support incidents found.</td>
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
