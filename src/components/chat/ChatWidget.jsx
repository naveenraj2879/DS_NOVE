import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your DSNOVE digital assistant. How can I help you accelerate your technology goals today?', time: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Trigger bot typing simulator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "Thank you for reaching out. A DSNOVE enterprise consultant will review your query. In the meantime, you can review our core expertise or register in the Client Portal!";
      
      const lower = text.toLowerCase();
      if (lower.includes('ai') || lower.includes('intelligence')) {
        botResponse = "We build state-of-the-art AI systems! Our work spans LLM finetuning, custom RAG integrations, and image classifiers. Would you like us to schedule a technical assessment?";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
        botResponse = "Our development cycles are customized. We offer dedicated sprint teams or fixed milestones. You can check our standard service tiers on the Homepage pricing section.";
      } else if (lower.includes('job') || lower.includes('career') || lower.includes('work')) {
        botResponse = "We are actively recruiting Senior AI Engineers, Frontend Leads, and DevOps experts. Check our Careers page to apply!";
      } else if (lower.includes('cyber') || lower.includes('security')) {
        botResponse = "DSNOVE secures platforms with zero-trust architectures and SOC2 certification audits. We will secure your cloud infrastructure!";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: 'Just now'
      }]);
    }, 1200);
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{
              width: '360px',
              height: '480px',
              position: 'absolute',
              bottom: '5rem',
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1100,
              overflow: 'hidden'
            }}
          >
            {/* Chat Header */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom" style={{ background: 'rgba(var(--primary-rgb), 0.1)' }}>
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 bg-primary rounded-circle text-white d-flex align-items-center justify-content-center">
                  <FaRobot size={18} />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">DSNOVE Concierge</h6>
                  <small className="text-success d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#198754', borderRadius: '50%', display: 'inline-block' }}></span>
                    AI Assistant Online
                  </small>
                </div>
              </div>
              <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow-1 p-3 overflow-y-auto" style={{ fontSize: '0.875rem' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-2 rounded-3 max-w-75 ${msg.sender === 'user' ? 'bg-primary text-white text-end' : 'bg-body-secondary text-start'}`} style={{ maxWidth: '80%' }}>
                    <p className="mb-0">{msg.text}</p>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.65rem' }}>{msg.time}</small>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="d-flex mb-3 justify-content-start">
                  <div className="p-2 bg-body-secondary rounded-3 text-muted">
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span className="ms-2" style={{ fontSize: '0.75rem' }}>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-top bg-body-tertiary">
              <div className="d-flex flex-wrap gap-1">
                <button className="btn btn-xs btn-outline-secondary py-1 px-2" style={{ fontSize: '0.75rem' }} onClick={() => handleQuickQuestion('Tell me about AI services')}>AI Services</button>
                <button className="btn btn-xs btn-outline-secondary py-1 px-2" style={{ fontSize: '0.75rem' }} onClick={() => handleQuickQuestion('Request consultation pricing')}>Consultation Pricing</button>
                <button className="btn btn-xs btn-outline-secondary py-1 px-2" style={{ fontSize: '0.75rem' }} onClick={() => handleQuickQuestion('Support ticket issue')}>Support Ticket</button>
              </div>
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-top d-flex gap-2 align-items-center bg-body-tertiary"
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="form-control form-control-sm form-control-premium"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="btn btn-sm btn-primary d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: '60px',
          height: '60px',
          boxShadow: 'var(--glow-primary-lg)',
          zIndex: 1200
        }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>
    </div>
  );
};
