import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBrain, FaCode, FaCloud, FaShieldAlt, 
  FaTerminal, FaPalette, FaChartBar, FaMobileAlt,
  FaCheckCircle, FaLaptopCode
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';

// Map icon string to React Icon component
const iconMap = {
  FaBrain: FaBrain,
  FaCode: FaCode,
  FaCloud: FaCloud,
  FaShieldAlt: FaShieldAlt,
  FaTerminal: FaTerminal,
  FaPalette: FaPalette,
  FaChartBar: FaChartBar,
  FaMobileAlt: FaMobileAlt
};

export const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Read from localStorage (will be seeded by initializeDatabase)
    const stored = localStorage.getItem('dsnove_services');
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <span className="section-subtitle">Core Capabilities</span>
            <h1 className="display-5 fw-bold text-white mb-3">Technical Field Operations</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
              DSNOVE deploys dedicated software architectures designed to fit strict enterprise scaling, compliance, and velocity guidelines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
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

          {/* Services Grid */}
          <div className="row g-4">
            {filteredServices.map((service, idx) => {
              const IconComp = iconMap[service.icon] || FaLaptopCode;
              return (
                <div key={service.id} className="col-lg-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-panel p-4 h-100 d-flex flex-column justify-content-between"
                  >
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3">
                          <IconComp size={28} />
                        </div>
                        <div>
                          <span className="badge bg-secondary-subtle text-primary border border-primary-subtle px-3 py-1 mb-1" style={{ fontSize: '0.7rem' }}>
                            {service.category}
                          </span>
                          <h3 className="fw-bold fs-4 mb-0 text-white">{service.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {service.description}
                      </p>

                      {/* Feature Checklist */}
                      <div className="row g-2 mb-4">
                        {service.features && service.features.map((feat, fidx) => (
                          <div key={fidx} className="col-sm-6 d-flex align-items-center gap-2">
                            <FaCheckCircle className="text-primary flex-shrink-0" size={14} />
                            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-3" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Tier Architecture Supported</span>
                      <Link to="/contact" className="btn btn-sm btn-premium">
                        Consult Architecture
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="glass-panel p-5 text-center mt-5" style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, rgba(0,0,0,0) 80%)' }}>
            <h2 className="tech-font text-gradient mb-3 fs-3">Need a bespoke enterprise integration?</h2>
            <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '500px', fontSize: '0.9rem' }}>
              We orchestrate customized software delivery squads matching SOC2 security models and unique database requirements.
            </p>
            <Link to="/contact" className="btn btn-premium px-4">
              Connect with Solutions Architect
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
