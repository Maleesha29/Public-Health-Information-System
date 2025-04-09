import React, { useState } from 'react';
import './Footer.css';
// You'll need to install lucide-react for these icons
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, ChevronRight } from 'lucide-react';

const Footer = () => {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  
  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="container">
        {/* Header with Logo */}
        <div className="header">
          <div className="logo-container">
            {/* Replace with your actual logo */}
            <div className="logo">
            <img src="../../natLogo.png" alt="Logo" height={50} width={40} />
            </div>
          </div>
          <h1>Ministry of Health</h1>
        </div>
        
        {/* Content Grid */}
        <div className="footer-grid">
          {/* Contact Information */}
          <div className="footer-section">
            <h2>Contact Us</h2>
            
            <div className="contact-item">
              <MapPin className="icon" />
              <a href="https://maps.app.goo.gl/E3hwTditMfC7xo2v9" 
                 className="contact-link" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha, Colombo 10, Sri Lanka
              </a>
            </div>
            
            <div className="contact-item">
              <Phone className="icon" />
              <div className="phone-links">
                <a href="tel:0112694033" className="phone-link">+94 112 694033</a>
                <a href="tel:0112675011" className="phone-link">+94 112 675011</a>
              </div>
            </div>
            
            <div className="contact-item">
              <Mail className="icon" />
              <button 
                onClick={() => copyEmail('abcd@gov.lk')} 
                className="email-button"
              >
                abcd@gov.lk
                {isEmailCopied && <span className="copied-tooltip">Copied!</span>}
              </button>
            </div>
          </div>
          
          {/* Quick Links - Column 1 */}
          <div className="footer-section">
            <h2>Quick Links</h2>
            <ul className="link-list">
              <li>
                <a href="/" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Home
                </a>
              </li>
              <li>
                <a href="/staff" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Staff Directory
                </a>
              </li>
              <li>
                <a href="/vaccines" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Vaccination Information
                </a>
              </li>
              <li>
                <a href="/clinics" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Clinic Services
                </a>
              </li>
              <li>
                <a href="/Complains" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Submit Complaints
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links - Column 2 */}
          <div className="footer-section">
            <h2 className="resource-title">Resources</h2>
            <ul className="link-list">
              <li>
                <a href="/denguecamp" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Dengue Prevention
                </a>
              </li>
              <li>
                <a href="/RaidsHome" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Inspection Reports
                </a>
              </li>
              <li>
                <a href="/mainMidwife" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Midwife Services
                </a>
              </li>
              <li>
                <a href="/Fine-And-court" className="quick-link">
                  <ChevronRight className="chevron-icon" />
                  Legal Information
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media Links & Newsletter */}
          <div className="footer-section">
            <div className="social-section">
              <h2>Connect With Us</h2>
              <div className="social-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="social-link facebook">
                  <Facebook className="social-icon" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="social-link twitter">
                  <Twitter className="social-icon" />
                </a>
                <a href="https://youtu.be/hdSMpcDsmmA" target="_blank" rel="noopener noreferrer" 
                   className="social-link youtube">
                  <Youtube className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="copyright-section">
        <div className="copyright-container">
          <p className="copyright-text">© Copyright 2024 Public Health Information System</p>
          <div className="policy-links">
            <a href="/privacy-policy" className="policy-link">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="/terms-of-use" className="policy-link">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;