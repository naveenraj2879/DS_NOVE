import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';
import { PageTransition } from '../components/layout/PageTransition';

export const NotFound = () => {
  return (
    <PageTransition>
      <div className="section-padding text-center d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="glass-panel p-5 d-flex flex-column align-items-center gap-4 border border-danger border-opacity-25" style={{ background: 'radial-gradient(circle at center, rgba(220, 53, 69, 0.05) 0%, rgba(0,0,0,0) 80%)' }}>
                <div className="p-4 bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center animate-bounce" style={{ width: '80px', height: '80px' }}>
                  <FaExclamationTriangle size={36} />
                </div>
                
                <div>
                  <h1 className="display-4 fw-extrabold text-white tech-font mb-2" style={{ letterSpacing: '4px' }}>404</h1>
                  <h3 className="fw-bold text-gradient mb-3">NODE_NOT_RESOLVED</h3>
                  <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    The server path you requested does not map to any active DSNOVE technology node. It may have been relocated during system synchronization.
                  </p>
                </div>

                <div className="d-flex gap-3">
                  <Link to="/" className="btn btn-premium d-flex align-items-center gap-2">
                    <FaHome /> <span>Back to Base</span>
                  </Link>
                  <Link to="/contact" className="btn btn-premium-outline d-flex align-items-center gap-2">
                    <FaQuestionCircle /> <span>Consult Support</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
