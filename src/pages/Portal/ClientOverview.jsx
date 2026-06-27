import React, { useState, useEffect, useRef } from 'react';
import { FaProjectDiagram, FaFileInvoiceDollar, FaLifeRing, FaPaperPlane, FaUserTie } from 'react-icons/fa';

export const ClientOverview = () => {
  const [invoices, setInvoices] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [pmTyping, setPmTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Read databases from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem('dsnove_invoices') || '[]');
    const savedMilestones = JSON.parse(localStorage.getItem('dsnove_milestones') || '[]');
    const savedTickets = JSON.parse(localStorage.getItem('dsnove_tickets') || '[]');
    const savedMessages = JSON.parse(localStorage.getItem('dsnove_messages') || '[]');

    setInvoices(savedInvoices);
    setMilestones(savedMilestones);
    setTickets(savedTickets);
    setChatMessages(savedMessages);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, pmTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      sender: 'client',
      text: chatInput,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    localStorage.setItem('dsnove_messages', JSON.stringify(updatedMessages));
    setChatInput('');

    // Simulate Project Manager automatic replies
    setPmTyping(true);
    setTimeout(() => {
      setPmTyping(false);
      const pmReply = {
        sender: 'pm',
        text: 'Received your message. I am syncing with our developer squad now and will follow up shortly.',
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...updatedMessages, pmReply];
      setChatMessages(finalMessages);
      localStorage.setItem('dsnove_messages', JSON.stringify(finalMessages));
    }, 1500);
  };

  const pendingInvoicesCount = invoices.filter(inv => inv.status === 'Pending').length;
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const openTicketsCount = tickets.filter(t => t.status !== 'Resolved').length;

  return (
    <div className="d-flex flex-column gap-4">
      {/* Page Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Portal Overview</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Overview metrics of your current development cycle.</p>
      </div>

      {/* Summary Cards Row */}
      <div className="row g-4">
        {/* Milestones Card */}
        <div className="col-md-4">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Milestones Met</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{completedMilestones} / {milestones.length}</h3>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3">
              <FaProjectDiagram size={24} />
            </div>
          </div>
        </div>

        {/* Billing Card */}
        <div className="col-md-4">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Open Invoices</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{pendingInvoicesCount} Pending</h3>
            </div>
            <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-3">
              <FaFileInvoiceDollar size={24} />
            </div>
          </div>
        </div>

        {/* Tickets Card */}
        <div className="col-md-4">
          <div className="glass-panel p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Support Tickets</span>
              <h3 className="fw-bold text-white mt-1 mb-0">{openTicketsCount} Active</h3>
            </div>
            <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-3">
              <FaLifeRing size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Project Manager Chat & Activity Timeline */}
      <div className="row g-4">
        {/* Chat Widget */}
        <div className="col-lg-7">
          <div className="glass-panel p-4 d-flex flex-column" style={{ height: '420px' }}>
            <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
              <div className="p-2 bg-primary bg-opacity-15 text-primary rounded-circle">
                <FaUserTie size={16} />
              </div>
              <div>
                <h5 className="fw-bold text-white mb-0" style={{ fontSize: '0.95rem' }}>Contact Project Manager</h5>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Direct synchronization channel</small>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow-1 overflow-y-auto mb-3 p-2 border border-secondary border-opacity-10 rounded bg-dark bg-opacity-20 d-flex flex-column gap-3" style={{ fontSize: '0.85rem' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`d-flex ${msg.sender === 'client' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-2 rounded-3 max-w-75 ${msg.sender === 'client' ? 'bg-primary text-dark text-end' : 'bg-body-secondary text-white text-start'}`} style={{ maxWidth: '80%' }}>
                    <p className="mb-0">{msg.text}</p>
                    <small className="text-muted mt-1 d-block" style={{ fontSize: '0.65rem' }}>{msg.date}</small>
                  </div>
                </div>
              ))}
              {pmTyping && (
                <div className="d-flex justify-content-start">
                  <div className="p-2 bg-body-secondary rounded-3 text-secondary">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="ms-2" style={{ fontSize: '0.75rem' }}>PM typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="d-flex gap-2">
              <input
                type="text"
                placeholder="Ask about project milestones..."
                className="form-control form-control-premium"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center" style={{ width: '42px', flexShrink: 0 }}>
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Milestone Quick-View */}
        <div className="col-lg-5">
          <div className="glass-panel p-4" style={{ height: '420px', overflowY: 'auto' }}>
            <h5 className="fw-bold text-white mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
              Next Development Milestones
            </h5>
            
            <div className="d-flex flex-column gap-3">
              {milestones.map((m) => (
                <div key={m.id} className="d-flex gap-3 align-items-start">
                  <div className="mt-1">
                    {m.status === 'completed' && <span className="badge bg-success" style={{ width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block' }}> </span>}
                    {m.status === 'active' && <span className="badge bg-primary animate-pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block' }}> </span>}
                    {m.status === 'pending' && <span className="badge bg-secondary" style={{ width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block' }}> </span>}
                  </div>
                  <div className="overflow-hidden">
                    <h6 className={`mb-1 fw-semibold ${m.status === 'completed' ? 'text-decoration-line-through text-muted' : 'text-white'}`} style={{ fontSize: '0.85rem' }}>{m.title}</h6>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Due Date: {m.date}</small>
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
