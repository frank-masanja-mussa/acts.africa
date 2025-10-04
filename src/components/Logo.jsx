import React from 'react'
import './Logo.css'

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large'
  }

  return (
    <div className={`logo-container ${sizeClasses[size]} ${className}`}>
      <div className="logo-icon">
        <img 
          src="/ACTS-logo-BG.webp" 
          alt="ACTS Africa Logo" 
          width="100%" 
          height="100%"
          style={{ objectFit: 'contain' }}
        />
      </div>
      {showText && (
        <div className="logo-text">
          <div className="logo-title">ACTS.Africa</div>
          <div className="logo-tagline">AI awareness for Technology and Society</div>
        </div>
      )}
    </div>
  )
}

export default Logo
