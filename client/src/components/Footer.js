import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>About ThisVid</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Community</h3>
            <ul className="footer-links">
              <li><Link to="/guidelines">Community Guidelines</Link></li>
              <li><Link to="/creators">For Creators</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/forums">Forums</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/safety">Safety Center</Link></li>
              <li><Link to="/report">Report Content</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/dmca">DMCA</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 ThisVid. All rights reserved. | A modern video sharing platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
