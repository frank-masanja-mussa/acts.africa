import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../shared/components/Logo'
import './Navbar.css'

const links = [
    { to: '/programs', label: 'Programs' },
    { to: '/programs/apply', label: 'Apply' },
    { to: '/tanzania-chapter', label: 'Katavi Pilot' },
    { to: '/start-chapter', label: 'Start a Chapter' },
    { to: '/live-data', label: 'Live Data' }
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => setIsOpen((open) => !open)
    const closeMenu = () => setIsOpen(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isOpen)
        return () => document.body.classList.remove('no-scroll')
    }, [isOpen])

    return (
        <header className={`navbar${isScrolled ? ' scrolled' : ''}`}>
            <div className="navbar-content">
                <Link to="/" onClick={closeMenu} className="brand-link">
                    <Logo size="medium" showText={true} />
                </Link>

                <nav className="nav-links" aria-label="Primary navigation">
                    {links.map((link) => (
                        <Link key={link.to} to={link.to} className="nav-link">
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/donate" className="nav-link nav-cta">
                        Donate
                    </Link>
                </nav>

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
            </div>

            {isOpen && <div className="menu-overlay" onClick={closeMenu} />}

            <nav className={`mobile-menu${isOpen ? ' show' : ''}`} aria-label="Mobile navigation">
                {links.map((link) => (
                    <Link key={link.to} to={link.to} className="mobile-link" onClick={closeMenu}>
                        {link.label}
                    </Link>
                ))}
                <Link to="/donate" className="mobile-link mobile-cta" onClick={closeMenu}>
                    Donate
                </Link>
            </nav>
        </header>
    )
}

export default Navbar
