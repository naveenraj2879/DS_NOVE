import React, { useState, useEffect } from 'react';
import { FaDownload, FaUpload, FaFilePdf, FaFileArchive, FaSpinner } from 'react-icons/fa';

export const Projects = () => {
  const [milestones, setMilestones] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Architecture_Blueprint_DSNOVE.pdf', size: '2.4 MB', date: '2026-05-16' },
    { name: 'Wireframes_Mobile_Concept.fig', size: '12.8 MB', date: '2026-05-20' }
  ]);
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dsnove_milestones') || '[]');
    setMilestones(saved);
  }, []);

  const handleDownload = (filename) => {
    alert(`Downloading ${filename} (Simulated)...`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileToUpload) return;

    setUploading(true);
    setTimeout(() => {
      const newFile = {
        name: fileToUpload.name,
        size: `${(fileToUpload.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toISOString().split('T')[0]
      };
      const updatedFiles = [newFile, ...uploadedFiles];
      setUploadedFiles(updatedFiles);
      setFileToUpload(null);
      setUploading(false);
      alert('Requirements file successfully uploaded to DSNOVE repository.');
    }, 1500);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Milestones & Requirements</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Track development sprints and upload requirement assets.</p>
      </div>

      <div className="row g-4">
        {/* Milestones timeline */}
        <div className="col-lg-6">
          <div className="glass-panel p-4">
            <h5 className="fw-bold text-white mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
              Detailed Sprint Timeline
            </h5>

            <div className="timeline-container">
              {milestones.map((m) => (
                <div key={m.id} className="timeline-item">
                  <div className={`timeline-dot ${m.status === 'completed' ? 'completed' : m.status === 'active' ? 'active' : ''}`} />
                  <div>
                    <h6 className={`mb-1 fw-bold ${m.status === 'completed' ? 'text-decoration-line-through text-muted' : 'text-white'}`} style={{ fontSize: '0.85rem' }}>
                      {m.title}
                    </h6>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Due Date: {m.date} // Status: <span className="text-capitalize text-primary">{m.status}</span></small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements Documents and Uploads */}
        <div className="col-lg-6 d-flex flex-column gap-4">
          {/* Upload Area */}
          <div className="glass-panel p-4">
            <h5 className="fw-bold text-white mb-3" style={{ fontSize: '0.95rem' }}>Submit Requirement Files</h5>
            <form onSubmit={handleUploadSubmit}>
              <div className="border border-dashed p-4 text-center rounded bg-dark bg-opacity-25 border-secondary" style={{ borderStyle: 'dashed' }}>
                <input
                  type="file"
                  id="portalFileInput"
                  className="d-none"
                  onChange={handleFileChange}
                />
                <label htmlFor="portalFileInput" className="cursor-pointer mb-0 text-secondary w-100 py-3 d-flex flex-column align-items-center gap-2">
                  <FaUpload size={32} className="text-primary" />
                  <span style={{ fontSize: '0.85rem' }}>
                    {fileToUpload ? fileToUpload.name : 'Select file or drag requirements document here'}
                  </span>
                </label>
              </div>

              {fileToUpload && (
                <div className="text-end mt-3">
                  <button type="submit" className="btn btn-sm btn-primary px-4 d-flex align-items-center gap-2 ms-auto" disabled={uploading}>
                    {uploading ? (
                      <>
                        <FaSpinner className="spinner-border spinner-border-sm border-0" size={14} /> <span>Uploading...</span>
                      </>
                    ) : (
                      <span>Upload File</span>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Downloadable Assets */}
          <div className="glass-panel p-4">
            <h5 className="fw-bold text-white mb-3" style={{ fontSize: '0.95rem' }}>Project Repository Files</h5>
            <div className="d-flex flex-column gap-3">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="d-flex align-items-center justify-content-between p-2 border border-secondary border-opacity-10 rounded">
                  <div className="d-flex align-items-center gap-2 overflow-hidden">
                    {file.name.endsWith('.pdf') ? <FaFilePdf className="text-danger flex-shrink-0" /> : <FaFileArchive className="text-warning flex-shrink-0" />}
                    <div className="overflow-hidden">
                      <h6 className="mb-0 text-white text-truncate" style={{ fontSize: '0.8rem' }}>{file.name}</h6>
                      <small className="text-muted" style={{ fontSize: '0.65rem' }}>{file.size} // Uploaded: {file.date}</small>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(file.name)}
                    className="btn btn-sm btn-dark border-secondary p-2 d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                    title="Download File"
                  >
                    <FaDownload size={12} className="text-primary" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
