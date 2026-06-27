import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChartLine, FaPuzzlePiece, FaCheckDouble } from 'react-icons/fa';
import { PageTransition } from '../components/layout/PageTransition';

export const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('dsnove_portfolios');
    if (stored) {
      setPortfolios(JSON.parse(stored));
    }
  }, []);

  const filters = ['All', 'AI', 'Cloud', 'Cybersecurity', 'Mobile', 'Web'];

  const filteredPortfolios = activeFilter === 'All'
    ? portfolios
    : portfolios.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <span className="section-subtitle">Case Studies</span>
            <h1 className="display-5 fw-bold text-white mb-3">Enterprise Deployments</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
              A record of scaling architectures, neural vision networks, and cloud migrations delivered for global clients.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`btn btn-sm px-4 py-2 tech-font border ${
                  activeFilter === f
                    ? 'btn-primary border-primary text-dark fw-bold'
                    : 'btn-outline-secondary border-secondary text-secondary-emphasis'
                }`}
                style={{ borderRadius: '25px', transition: 'all 0.3s ease' }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="row g-4">
            {filteredPortfolios.map((project, idx) => (
              <div key={project.id} className="col-lg-4 col-md-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-panel overflow-hidden h-100 d-flex flex-column justify-content-between cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div>
                    {/* Project Image */}
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                      <div className="position-absolute top-3 left-3 bg-dark bg-opacity-75 text-primary border border-primary px-3 py-1 rounded-pill" style={{ fontSize: '0.75rem', left: '1rem' }}>
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-primary tech-font" style={{ fontSize: '0.8rem' }}>{project.client}</span>
                      <h4 className="fw-bold fs-5 mt-1 mb-3 text-white">{project.title}</h4>
                      <p className="text-secondary text-truncate-3" style={{ fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.challenge}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-top mt-3 d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex gap-1">
                      {project.tags && project.tags.slice(0, 2).map((t, tid) => (
                        <span key={tid} className="badge bg-dark border border-secondary text-secondary-emphasis" style={{ fontSize: '0.65rem' }}>{t}</span>
                      ))}
                    </div>
                    <span className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>Read Study →</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {selectedProject && (
              <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="modal-content glass-panel p-0 overflow-hidden border border-secondary"
                  >
                    {/* Image Header */}
                    <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 right-0 p-3" style={{ right: 0 }}>
                        <button
                          type="button"
                          className="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center text-white border-0 bg-opacity-75"
                          style={{ width: '38px', height: '38px' }}
                          onClick={() => setSelectedProject(null)}
                        >
                          <FaTimes size={16} />
                        </button>
                      </div>
                      <div className="position-absolute bottom-3 left-3 bg-dark bg-opacity-75 text-primary border border-primary px-3 py-1 rounded-pill" style={{ fontSize: '0.8rem', left: '1.5rem', bottom: '1.5rem' }}>
                        {selectedProject.category}
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-4 p-md-5">
                      <span className="text-primary tech-font fw-bold" style={{ fontSize: '0.9rem' }}>{selectedProject.client}</span>
                      <h2 className="fw-bold text-white mt-1 mb-4">{selectedProject.title}</h2>

                      <div className="row g-4">
                        {/* Challenge */}
                        <div className="col-12 d-flex gap-3">
                          <div className="p-2 bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                            <FaPuzzlePiece size={18} />
                          </div>
                          <div>
                            <h5 className="fw-bold text-white mb-2">The Challenge</h5>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedProject.challenge}</p>
                          </div>
                        </div>

                        {/* Solution */}
                        <div className="col-12 d-flex gap-3">
                          <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                            <FaCheckDouble size={18} />
                          </div>
                          <div>
                            <h5 className="fw-bold text-white mb-2">The Solution</h5>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedProject.solution}</p>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="col-12 d-flex gap-3">
                          <div className="p-2 bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                            <FaChartLine size={18} />
                          </div>
                          <div>
                            <h5 className="fw-bold text-white mb-2">Operational Result</h5>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedProject.result}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tech stack tags */}
                      <div className="border-top mt-5 pt-4 d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="d-flex flex-wrap gap-2">
                          {selectedProject.tags && selectedProject.tags.map((t, tid) => (
                            <span key={tid} className="badge bg-dark border border-secondary text-secondary-emphasis py-2 px-3" style={{ fontSize: '0.75rem' }}>{t}</span>
                          ))}
                        </div>
                        <button className="btn btn-primary" onClick={() => setSelectedProject(null)}>
                          Close case study
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};
