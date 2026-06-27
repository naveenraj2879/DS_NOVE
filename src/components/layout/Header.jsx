import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FaSun, FaMoon, FaUser, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-premium sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-4" to="/" onClick={() => setIsExpanded(false)}>
          <span className="text-gradient tech-font" style={{ letterSpacing: '2px', fontWeight: '800' }}>DSNOVA</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/" onClick={() => setIsExpanded(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/services" onClick={() => setIsExpanded(false)}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/portfolio" onClick={() => setIsExpanded(false)}>Portfolio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/about" onClick={() => setIsExpanded(false)}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/careers" onClick={() => setIsExpanded(false)}>Careers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/blog" onClick={() => setIsExpanded(false)}>Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'text-primary' : 'text-secondary-emphasis'}`} to="/contact" onClick={() => setIsExpanded(false)}>Contact</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 justify-content-between justify-content-lg-end">
            {/* Theme Toggle */}
            <button 
              className="btn btn-link text-white p-2 d-flex align-items-center justify-content-center" 
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              style={{ textDecoration: 'none' }}
            >
              {isDark ? <FaSun size={18} className="text-warning" /> : <FaMoon size={18} className="text-secondary" />}
            </button>

            {/* User Session Interface */}
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-2 dropdown-toggle" 
                  type="button" 
                  id="navbarUserDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="rounded-circle" 
                    style={{ width: '22px', height: '22px', objectFit: 'cover' }}
                  />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark glass-panel p-2 mt-2" aria-labelledby="navbarUserDropdown">
                  <li>
                    <Link 
                      className="dropdown-item d-flex align-items-center gap-2 py-2" 
                      to={user.role === 'admin' ? '/admin' : '/portal'}
                      onClick={() => setIsExpanded(false)}
                    >
                      {user.role === 'admin' ? <FaShieldAlt className="text-primary" /> : <FaUser className="text-primary" />}
                      <span>{user.role === 'admin' ? 'Admin Panel' : 'Client Portal'}</span>
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider border-secondary" /></li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" 
                      onClick={() => { handleLogout(); setIsExpanded(false); }}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/portal/login" className="btn btn-sm btn-premium-outline px-3" onClick={() => setIsExpanded(false)}>
                  Portal
                </Link>
                <Link to="/admin/login" className="btn btn-sm btn-premium px-3 text-dark" onClick={() => setIsExpanded(false)}>
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
