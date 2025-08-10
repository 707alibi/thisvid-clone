import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-this">THIS</span>
          <span className="brand-vid">VID</span>
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              to="/videos" 
              className={`nav-link ${isActive('/videos') ? 'active' : ''}`}
            >
              VIDEOS
            </Link>
          </li>
          <li>
            <Link 
              to="/categories" 
              className={`nav-link ${isActive('/categories') ? 'active' : ''}`}
            >
              CATEGORIES
            </Link>
          </li>
          <li>
            <Link 
              to="/community" 
              className={`nav-link ${isActive('/community') ? 'active' : ''}`}
            >
              COMMUNITY
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="auth-buttons">
          <Link to="/signup" className="btn btn-secondary">
            SIGN UP
          </Link>
          <Link to="/login" className="btn btn-primary">
            LOGIN
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
