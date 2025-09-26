import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('no-scroll')
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('no-scroll')
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand" onClick={closeMenu}>ACTS.Africa</Link>

        <button 
          className={`nav-toggle${isOpen ? ' open' : ''}`} 
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className="nav-links">
          <Link to="/donate" className="nav-link">Donate</Link>
          <Link to="/start-chapter" className="nav-link">Start a Chapter</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/tell-us" className="nav-link">Tell Us</Link>
        </nav>
      </div>

      {/* Glass overlay that blurs the entire background when menu is open */}
      {isOpen && <div className="menu-overlay" onClick={closeMenu} />}

      <nav className={`mobile-menu${isOpen ? ' show' : ''}`}>
        <Link to="/donate" className="mobile-link" onClick={closeMenu}>Donate</Link>
        <Link to="/start-chapter" className="mobile-link" onClick={closeMenu}>Start a Chapter</Link>
        <Link to="/resources" className="mobile-link" onClick={closeMenu}>Resources</Link>
        <Link to="/tell-us" className="mobile-link" onClick={closeMenu}>Tell Us</Link>
      </nav>
    </header>
  )
}

export default Navbar
