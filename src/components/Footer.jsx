import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { 
  mdiEmail, 
  mdiPhone, 
  mdiMapMarker, 
  mdiLinkedin, 
  mdiTwitter, 
  mdiFacebook, 
  mdiInstagram,
  mdiGithub,
  mdiHeart
} from '@mdi/js'
import Logo from './Logo'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <Logo size="large" showText={true} className="footer-logo" />
            <p className="footer-description">
              Empowering 2.5 billion working-class people with AI literacy to prevent unemployment and poverty through education and awareness.
            </p>
            <div className="footer-social">
              <a href="https://linkedin.com/company/acts-africa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon path={mdiLinkedin} size={1.2} />
              </a>
              <a href="https://twitter.com/actsafrica" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Icon path={mdiTwitter} size={1.2} />
              </a>
              <a href="https://facebook.com/actsafrica" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon path={mdiFacebook} size={1.2} />
              </a>
              <a href="https://instagram.com/actsafrica" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon path={mdiInstagram} size={1.2} />
              </a>
              <a href="https://github.com/acts-africa" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Icon path={mdiGithub} size={1.2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/live-data">Live Analytics</Link></li>
              <li><Link to="/tanzania-chapter">Tanzania Chapter</Link></li>
              <li><Link to="/start-chapter">Start a Chapter</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/tell-us">Tell Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-links">
            <h4 className="footer-section-title">Programs</h4>
            <ul className="footer-link-list">
              <li><Link to="/chapter-application">Chapter Application</Link></li>
              <li><Link to="/ai-literacy">AI Literacy Program</Link></li>
              <li><Link to="/teacher-training">Teacher Training</Link></li>
              <li><Link to="/community-showcases">Community Showcases</Link></li>
              <li><Link to="/workforce-readiness">Workforce Readiness</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-section-title">Contact Us</h4>
            <div className="contact-item">
              <Icon path={mdiEmail} size={1} />
              <a href="mailto:info@acts.africa">info@acts.africa</a>
            </div>
            <div className="contact-item">
              <Icon path={mdiPhone} size={1} />
              <a href="tel:+255123456789">+255 123 456 789</a>
            </div>
            <div className="contact-item">
              <Icon path={mdiMapMarker} size={1} />
              <span>Dar es Salaam, Tanzania</span>
            </div>
            <div className="contact-item">
              <Icon path={mdiMapMarker} size={1} />
              <span>Northridge, California, USA</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} ACTS.Africa. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/sitemap.xml">Sitemap</Link>
            </div>
          </div>
          <div className="footer-mission">
            <p>
              Made with <Icon path={mdiHeart} size={0.8} className="heart-icon" /> for Africa's future
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
