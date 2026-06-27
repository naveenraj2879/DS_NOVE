import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaBriefcase, FaMapMarkerAlt, FaClock, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import { validateCareerForm } from '../utils/validators';
import { PageTransition } from '../components/layout/PageTransition';

export const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dsnove_careers');
    if (stored) {
      setJobs(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: null }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleTitle = selectedJob ? selectedJob.title : '';
    const validation = validateCareerForm(formData.name, formData.email, formData.phone, roleTitle, formData.resume);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Save as job application enquiry in localStorage
    const enquiries = JSON.parse(localStorage.getItem('dsnove_enquiries') || '[]');
    const newApplication = {
      id: `app-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: `Job Application: ${roleTitle}`,
      message: `Applicant Phone: ${formData.phone}\nCover Letter: ${formData.coverLetter || 'None provided.'}\nUploaded Resume: ${formData.resume.name} (mocked)`,
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };

    enquiries.push(newApplication);
    localStorage.setItem('dsnove_enquiries', JSON.stringify(enquiries));

    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });

    setTimeout(() => {
      setSuccess(false);
      setSelectedJob(null);
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        {/* Intro */}
        <div className="container mb-5">
          <div className="text-center mb-5">
            <span className="section-subtitle">Join DSNOVE</span>
            <h1 className="display-5 fw-bold text-white mb-3">Shape the Future of Technology</h1>
            <p className="text-secondary mx-auto mb-5" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
              We are looking for builders, engineers, and creators. We prioritize deep technical capabilities, engineering excellence, and workspace flexibility.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="row g-4 mb-5 text-center">
            <div className="col-md-4">
              <div className="glass-panel p-4">
                <FaCheckCircle className="text-primary mb-3" size={28} />
                <h5 className="fw-bold mb-2">Remote-First Workspace</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  Choose your hours and coordinate with teams using custom dashboard sprints.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-panel p-4">
                <FaCheckCircle className="text-primary mb-3" size={28} />
                <h5 className="fw-bold mb-2">Learning & Growth</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  An annual tech and learning allowance to cover certifications, courses, and resources.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-panel p-4">
                <FaCheckCircle className="text-primary mb-3" size={28} />
                <h5 className="fw-bold mb-2">Premium Support</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  Comprehensive healthcare coverage, mental wellness plans, and home office set-up stipend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container section-padding border-top" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-center mb-5">
            <span className="section-subtitle">Opportunities</span>
            <h2 className="section-title">Open Engineering Positions</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="d-flex flex-column gap-4">
                {jobs.map((job) => (
                  <div key={job.id} className="glass-panel p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                      <h4 className="fw-bold text-white mb-2">{job.title}</h4>
                      <div className="d-flex flex-wrap gap-3 text-secondary" style={{ fontSize: '0.85rem' }}>
                        <span className="d-flex align-items-center gap-1">
                          <FaBriefcase size={12} className="text-primary" /> {job.department}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <FaMapMarkerAlt size={12} className="text-primary" /> {job.location}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <FaClock size={12} className="text-primary" /> {job.type}
                        </span>
                      </div>
                      <p className="text-secondary mt-3 mb-0" style={{ fontSize: '0.9rem', maxWidth: '700px' }}>
                        {job.description}
                      </p>
                    </div>
                    <button
                      className="btn btn-premium flex-shrink-0 mt-3 mt-md-0"
                      onClick={() => setSelectedJob(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050 }}>
              <div className="modal-dialog modal-dialog-centered">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="modal-content glass-panel border border-secondary"
                >
                  <div className="modal-header border-bottom border-secondary d-flex justify-content-between align-items-center p-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div>
                      <h5 className="modal-title fw-bold text-white">Apply for Position</h5>
                      <span className="text-primary tech-font" style={{ fontSize: '0.8rem' }}>{selectedJob.title}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-secondary p-0"
                      onClick={() => { setSelectedJob(null); setErrors({}); }}
                    >
                      <FaTimes size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="modal-body p-4">
                      {success ? (
                        <div className="alert alert-success text-center py-4 border-0 bg-success-subtle text-success">
                          <h5>🎉 Submission Successful!</h5>
                          <p className="mb-0 mt-2" style={{ fontSize: '0.85rem' }}>Our HR lead will reach out to you shortly.</p>
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-3">
                          {/* Name */}
                          <div>
                            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Full Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-premium"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                            />
                            {errors.name && <small className="text-danger mt-1 d-block">{errors.name}</small>}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-premium"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@company.com"
                            />
                            {errors.email && <small className="text-danger mt-1 d-block">{errors.email}</small>}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Phone Number</label>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-premium"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 019-2834"
                            />
                            {errors.phone && <small className="text-danger mt-1 d-block">{errors.phone}</small>}
                          </div>

                          {/* Cover Letter */}
                          <div>
                            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Cover Letter (Optional)</label>
                            <textarea
                              name="coverLetter"
                              className="form-control form-control-premium"
                              rows="3"
                              value={formData.coverLetter}
                              onChange={handleInputChange}
                              placeholder="Tell us why you are a great fit for DSNOVE..."
                            />
                          </div>

                          {/* Resume File */}
                          <div>
                            <label className="form-label text-secondary" style={{ fontSize: '0.85rem' }}>Upload Resume (PDF/DOCX)</label>
                            <div className="border border-dashed p-3 text-center rounded bg-dark bg-opacity-25 border-secondary" style={{ borderStyle: 'dashed' }}>
                              <input
                                type="file"
                                id="resumeUpload"
                                accept=".pdf,.doc,.docx"
                                className="d-none"
                                onChange={handleFileChange}
                              />
                              <label htmlFor="resumeUpload" className="cursor-pointer mb-0 text-secondary w-100 py-2 d-flex flex-column align-items-center gap-2">
                                <FaCloudUploadAlt size={28} className="text-primary" />
                                <span style={{ fontSize: '0.8rem' }}>
                                  {formData.resume ? formData.resume.name : 'Select file from device'}
                                </span>
                              </label>
                            </div>
                            {errors.resume && <small className="text-danger mt-1 d-block">{errors.resume}</small>}
                          </div>
                        </div>
                      )}
                    </div>

                    {!success && (
                      <div className="modal-footer border-top border-secondary p-3" style={{ borderColor: 'var(--border-color)' }}>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { setSelectedJob(null); setErrors({}); }}>Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm px-4">Submit Application</button>
                      </div>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
