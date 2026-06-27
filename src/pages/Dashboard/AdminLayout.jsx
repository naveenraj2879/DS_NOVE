import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaShieldAlt, FaBriefcase, FaListAlt, 
  FaBookOpen, FaInbox, FaCog, FaSignOutAlt, 
  FaSun, FaMoon, FaBars, FaTimes, FaBell,
  FaLifeRing, FaUsers, FaUserFriends, FaQuoteLeft
} from 'react-icons/fa';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthorized = user && user.role === 'admin';

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/admin/login');
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
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 left-0 bg-dark bg-opacity-50 d-lg-none" 
          style={{ zIndex: 1030 }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`dashboard-sidebar d-flex flex-column justify-content-between p-3 ${sidebarOpen ? 'show' : ''}`} style={{ zIndex: 1040 }}>
        <div>
          {/* Brand */}
          <div className="d-flex align-items-center justify-content-between mb-4 mt-2">
            <Link className="text-decoration-none fw-bold text-white fs-4" to="/" onClick={() => setSidebarOpen(false)}>
              <span className="text-gradient tech-font" style={{ letterSpacing: '2px', fontWeight: '800' }}>DSNOVE</span>
            </Link>
            <button className="btn btn-sm text-secondary d-lg-none p-0" onClick={() => setSidebarOpen(false)}>
              <FaTimes size={18} />
            </button>
          </div>

          {/* Admin Avatar */}
          <div className="mb-4 px-2 py-3 bg-dark bg-opacity-25 border border-secondary border-opacity-10 rounded d-flex align-items-center gap-2">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="rounded-circle"
              style={{ width: '38px', height: '38px', objectFit: 'cover' }}
            />
            <div className="overflow-hidden">
              <h6 className="mb-0 text-white fw-bold text-truncate" style={{ fontSize: '0.85rem' }}>{user.name}</h6>
              <small className="text-danger fw-bold d-block" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>SYS_ADMIN</small>
            </div>
          </div>

          {/* CMS Nav Links */}
          <nav className="d-flex flex-column gap-2">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaShieldAlt size={16} /> <span>Overview</span>
            </NavLink>
            
            <NavLink 
              to="/admin/services" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaListAlt size={16} /> <span>Services CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/portfolio" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaBriefcase size={16} /> <span>Portfolio CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/blogs" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaBookOpen size={16} /> <span>Blogs CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/careers" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaBriefcase size={16} /> <span>Careers CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/team" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaUserFriends size={16} /> <span>Team CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/testimonials" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaQuoteLeft size={16} /> <span>Testimonials CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaUsers size={16} /> <span>Clients CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/enquiries" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaInbox size={16} /> <span>Enquiry Box</span>
            </NavLink>

            <NavLink 
              to="/admin/tickets" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaLifeRing size={16} /> <span>Tickets CMS</span>
            </NavLink>

            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => `btn btn-sm border-0 w-100 text-start py-2.5 px-3 d-flex align-items-center gap-3 ${isActive ? 'btn-primary text-dark fw-bold' : 'btn-dark bg-opacity-25 text-secondary hover-link'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaCog size={16} /> <span>System Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <button 
          className="btn btn-sm btn-outline-danger w-100 py-2.5 d-flex align-items-center justify-content-center gap-3" 
          onClick={handleLogout}
        >
          <FaSignOutAlt /> <span>Exit Admin Core</span>
        </button>
      </aside>

      {/* Main Console Content */}
      <div className="dashboard-content d-flex flex-column h-100 overflow-y-auto">
        {/* Header Bar */}
        <header className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          {/* Mobile toggle */}
          <button className="btn btn-sm btn-dark border-secondary d-lg-none d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} onClick={() => setSidebarOpen(true)}>
            <FaBars size={18} />
          </button>
          
          <div className="d-none d-md-block">
            <span className="text-danger fw-bold tech-font" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>⚙️ ADMIN SECURITY PANEL</span>
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {/* Alarm notifications */}
            <button className="btn btn-sm btn-dark border-0 p-2 text-danger position-relative">
              <FaBell size={16} />
              <span className="position-absolute translate-middle badge rounded-circle bg-danger" style={{ width: '6px', height: '6px', padding: '0', top: '8px', right: '4px' }}></span>
            </button>

            {/* Theme Toggle */}
            <button className="btn btn-sm btn-dark border-0 p-2 text-secondary" onClick={toggleTheme}>
              {isDark ? <FaSun className="text-warning" size={16} /> : <FaMoon size={16} />}
            </button>
          </div>
        </header>

        {/* Render child components */}
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
