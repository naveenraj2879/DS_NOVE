import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaColumns, FaProjectDiagram, FaFileInvoiceDollar, 
  FaLifeRing, FaUserCircle, FaSignOutAlt, FaSun, FaMoon, 
  FaBars, FaTimes, FaBell 
} from 'react-icons/fa';

export const PortalLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthorized = user && user.role === 'client';

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/portal/login');
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 left-0 bg-dark bg-opacity-50 d-lg-none" 
          style={{ zIndex: 1030 }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar d-flex flex-column justify-content-between p-3 ${sidebarOpen ? 'show' : ''}`} style={{ zIndex: 1040 }}>
        <div>
          {/* Logo */}
          <div className="d-flex align-items-center justify-content-between mb-4 mt-2">
            <Link className="text-decoration-none fw-bold text-white fs-4" to="/" onClick={() => setSidebarOpen(false)}>
              <span className="text-gradient tech-font" style={{ letterSpacing: '2px', fontWeight: '800' }}>DSNOVE</span>
            </Link>
            <button className="btn btn-sm text-secondary d-lg-none p-0" onClick={() => setSidebarOpen(false)}>
              <FaTimes size={18} />
            </button>
          </div>

          <div className="mb-4 px-2 py-3 bg-dark bg-opacity-25 border border-secondary border-opacity-10 rounded d-flex align-items-center gap-2">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="rounded-circle"
              style={{ width: '38px', height: '38px', objectFit: 'cover' }}
            />
            <div className="overflow-hidden">
              <h6 className="mb-0 text-white fw-bold text-truncate" style={{ fontSize: '0.85rem' }}>{user.name}</h6>
              <small className="text-muted text-truncate d-block" style={{ fontSize: '0.7rem' }}>{user.company}</small>
            </div>
          </div>

          {/* Links */}
          <nav className="d-flex flex-column gap-2">
            <NavLink 
              to="/portal" 
              end
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaColumns size={16} /> <span>Overview</span>
            </NavLink>
            <NavLink 
              to="/portal/projects" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaProjectDiagram size={16} /> <span>Milestones</span>
            </NavLink>
            <NavLink 
              to="/portal/invoices" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaFileInvoiceDollar size={16} /> <span>Billing</span>
            </NavLink>
            <NavLink 
              to="/portal/support" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaLifeRing size={16} /> <span>Support Tickets</span>
            </NavLink>
            <NavLink 
              to="/portal/profile" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaUserCircle size={16} /> <span>Edit Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Logout Bottom */}
        <button 
          className="btn btn-sm btn-outline-danger w-100 py-2.5 d-flex align-items-center justify-content-center gap-3" 
          onClick={handleLogout}
        >
          <FaSignOutAlt /> <span>Log Out Session</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-content d-flex flex-column h-100 overflow-y-auto">
        {/* Dashboard Header Bar */}
        <header className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          {/* Mobile Sidebar Trigger */}
          <button className="btn btn-sm btn-dark border-secondary d-lg-none d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} onClick={() => setSidebarOpen(true)}>
            <FaBars size={18} />
          </button>
          
          <div className="d-none d-md-block">
            <span className="text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Welcome to DSNOVE Client Dashboard</span>
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {/* Notifications Bell */}
            <button className="btn btn-sm btn-dark border-0 p-2 text-secondary position-relative">
              <FaBell size={16} />
              <span className="position-absolute translate-middle badge rounded-circle bg-danger" style={{ width: '8px', height: '8px', padding: '0', top: '8px', right: '4px' }}></span>
            </button>

            {/* Theme switch */}
            <button className="btn btn-sm btn-dark border-0 p-2 text-secondary" onClick={toggleTheme}>
              {isDark ? <FaSun className="text-warning" size={16} /> : <FaMoon size={16} />}
            </button>
          </div>
        </header>

        {/* Route views render */}
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
