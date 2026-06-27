import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaServer, FaUserLock, FaGem, FaBrain } from 'react-icons/fa';
import { initialTeam } from '../utils/mockData';
import { fetchTeamFromApi } from '../utils/teamApi';
import { PageTransition } from '../components/layout/PageTransition';

export const About = () => {
  const [team, setTeam] = useState(initialTeam);

  useEffect(() => {
    const loadTeam = async () => {
      const storedTeam = localStorage.getItem('dsnove_team');
      let parsedTeam = [];

      if (storedTeam) {
        try {
          parsedTeam = JSON.parse(storedTeam);
        } catch {
          parsedTeam = [];
        }
      }

      const apiTeam = await fetchTeamFromApi();
      const combinedTeam = Array.isArray(parsedTeam) && parsedTeam.length > 0
        ? initialTeam.map((initialMember) => {
            const existing = parsedTeam.find(
              (member) => member.id === initialMember.id || member.name === initialMember.name
            );
            if (!existing) return initialMember;

            return {
              ...initialMember,
              ...existing,
              image: existing.image || initialMember.image,
              name: existing.name || initialMember.name,
              role: existing.role || initialMember.role,
              bio: existing.bio || initialMember.bio,
              socials: {
                ...initialMember.socials,
                ...existing.socials,
              },
            };
          })
        : apiTeam;

      setTeam(combinedTeam);
    };

    loadTeam();
  }, []);

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container mb-5">
          <div className="text-center mb-5">
            <span className="section-subtitle">Corporate Identity</span>
            <h1 className="display-5 fw-bold text-white mb-3">Architecting Trust & Innovation</h1>
            <p className="text-secondary mx-auto mb-5" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
              DSNOVE is a global tech engineering agency, developing complex cloud infrastructures, custom neural pipelines, and high-fidelity corporate software interfaces.
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-md-6">
              <div className="glass-panel p-4 text-center h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                  <FaBrain size={24} />
                </div>
                <h5 className="fw-bold mb-2">Cognitive-First</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  We design systems with intelligence layers embedded directly in logic paths to maximize decision automation.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="glass-panel p-4 text-center h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                  <FaServer size={24} />
                </div>
                <h5 className="fw-bold mb-2">Infinite Scaling</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  Our cloud architectures deploy using microservice schemas that scale horizontally to absorb unexpected spikes.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="glass-panel p-4 text-center h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                  <FaUserLock size={24} />
                </div>
                <h5 className="fw-bold mb-2">Zero-Trust Security</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  Threat models are embedded in our development cycle, securing data with encryption keys and isolated sandboxes.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="glass-panel p-4 text-center h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-block mb-3">
                  <FaGem size={24} />
                </div>
                <h5 className="fw-bold mb-2">Premium Design</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  Interface layouts are engineered to offer responsive, micro-animated digital spaces that delight users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container section-padding border-top" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-center mb-5">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">DSNOVE Milestones</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-dot completed"></div>
                  <h4 className="tech-font fw-bold mb-1">2023: Agency Inception</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    DSNOVE founded by Dharani D with a focus on custom backend integrations and high-availability database setups.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot completed"></div>
                  <h4 className="tech-font fw-bold mb-1">2024: Cloud Migrations Leader</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Successfully migrated 50+ clients from physical nodes to AWS/GCP, establishing our zero-downtime SLA standard.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot completed"></div>
                  <h4 className="tech-font fw-bold mb-1">2025: Neural Models Rollout</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Introduced custom cognitive pipelines and LLM finetuning, serving over 300 million predictive metrics daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container section-padding border-top" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-center mb-5">
            <span className="section-subtitle">Leadership</span>
            <h2 className="section-title">The DSNOVE Team</h2>
          </div>

          <div className="row g-4">
            {team.map((member) => (
              <div key={member.id || member.name} className="col-lg-3 col-md-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-panel overflow-hidden h-100"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-100"
                    style={{ height: '260px', objectFit: 'cover' }}
                  />
                  <div className="p-4">
                    <h5 className="fw-bold mb-1 text-white">{member.name}</h5>
                    <span className="text-primary tech-font" style={{ fontSize: '0.8rem' }}>{member.role}</span>
                    <p className="text-secondary mt-3 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                      {member.bio}
                    </p>
                    <div className="d-flex gap-2">
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <FaLinkedin size={14} />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                          aria-label={`${member.name} on GitHub`}
                        >
                          <FaGithub size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
