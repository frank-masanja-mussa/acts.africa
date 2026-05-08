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
import Logo from '../../shared/components/Logo'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const contactEmails = [
    'frank@koola.app',
    'voiceofcalling@gmail.com',
    'wonup2@gmail.com',
    'africa@daven.ai'
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Logo size="large" showText={true} className="footer-logo" />
            <p className="footer-description">
              We equip working-class Africans with AI literacy, local capacity, and a voice in the future.
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

          <div className="footer-links">
            <h4 className="footer-section-title">Explore</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/programs/apply">Apply</Link></li>
              <li><Link to="/tanzania-chapter">Katavi Pilot</Link></li>
              <li><Link to="/live-data">Live Data</Link></li>
              <li><Link to="/donate">Donate</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-section-title">Join ACTS</h4>
            <ul className="footer-link-list">
              <li><Link to="/start-chapter">Start a Chapter</Link></li>
              <li><Link to="/chapter-application">Chapter Application</Link></li>
              <li><Link to="/tanzania-survey">Take the Survey</Link></li>
              <li><Link to="/lesson-plan">Lesson Plan</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/tell-us">Tell Us</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-section-title">Contact</h4>
            <div className="contact-item contact-item-start">
              <Icon path={mdiEmail} size={1} />
              <div className="contact-stack">
                {contactEmails.map((email) => (
                  <a key={email} href={`mailto:${email}`}>{email}</a>
                ))}
              </div>
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

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} ACTS.Africa. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/programs">Programs</Link>
              <Link to="/programs/apply">Apply</Link>
              <Link to="/donate">Donate</Link>
            </div>
          </div>
          <div className="footer-mission">
            <p>
              Made with <Icon path={mdiHeart} size={0.8} className="heart-icon" /> for Africa&apos;s future
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
