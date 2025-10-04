import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '@mdi/react'
import { mdiHeart, mdiHandHeart, mdiGift, mdiAccountGroup, mdiQrcode, mdiOpenInNew, mdiShare } from '@mdi/js'
import './pages.css'

const Donate = () => {
  const audioRef = useRef(null)
  const [showQR, setShowQR] = useState(false)
  
  const gofundmeUrl = 'https://gofund.me/e9f5257e9'
  
  const handleDonateClick = () => {
    window.open(gofundmeUrl, '_blank', 'noopener,noreferrer')
  }
  
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Support ACTS Africa - AI Education for 2.5B People',
          text: 'Help us educate 2.5 billion people about AI by 2050. Join our mission to build AI literacy across Africa.',
          url: gofundmeUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(gofundmeUrl)
      alert('Link copied to clipboard!')
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
      const startAtSeconds = 152 // 2:32
      const attemptPlay = () => {
        try {
          audioRef.current.currentTime = startAtSeconds
          audioRef.current.play().catch(() => {})
        } catch {}
      }
      // Try immediately and again on user interaction if needed
      attemptPlay()
      const onFirstInteract = () => {
        attemptPlay()
        window.removeEventListener('click', onFirstInteract)
      }
      window.addEventListener('click', onFirstInteract)
      return () => window.removeEventListener('click', onFirstInteract)
    }
  }, [])

  return (
    <div className="donate-page">
      <Navbar />
      
      <audio ref={audioRef} loop preload="auto" className="background-music" aria-label="Background music" controls={false}>
        <source src="/joel_sunny_codex.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="donate-content">
        <div className="donate-hero">
          <h1 className="donate-title">Support Our Mission</h1>
          <p className="donate-subtitle">Help us educate 2.5B people about AI by 2050</p>
        </div>

        <div className="donate-main">
          <div className="donate-card primary">
            <div className="card-header">
              <h2>Make a Difference</h2>
              <div className="card-icon">
                <Icon path={mdiHeart} size={1.5} />
              </div>
            </div>
            <p className="card-description">
              Your support accelerates AI education and empowerment across African chapters. 
              Every contribution helps us reach more students, train more teachers, and build 
              a future where everyone is prepared for the AI revolution.
            </p>
            <div className="highlight-banner">
              <span className="highlight-text">Join thousands supporting AI education in Africa</span>
            </div>
          </div>

          <div className="donate-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Icon path={mdiAccountGroup} size={1.2} />
              </div>
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students Reached</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Icon path={mdiHandHeart} size={1.2} />
              </div>
              <div className="stat-number">42</div>
              <div className="stat-label">Schools Active</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Icon path={mdiGift} size={1.2} />
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Impact Focused</div>
            </div>
          </div>

          <div className="donate-actions">
            <button className="primary-button" onClick={handleDonateClick} aria-label="Donate to support ACTS Africa mission">
              <Icon path={mdiOpenInNew} size={1} />
              Donate on GoFundMe
            </button>
            <button className="secondary-button" onClick={() => setShowQR(!showQR)} aria-label="Show QR code for easy donation">
              <Icon path={mdiQrcode} size={1} />
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            <button className="secondary-button" onClick={handleShareClick} aria-label="Share donation link">
              <Icon path={mdiShare} size={1} />
              Share
            </button>
          </div>
          
          {showQR && (
            <div className="qr-code-section">
              <h3>Scan to Donate</h3>
              <div className="qr-code-container">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gofundmeUrl)}`}
                  alt="QR Code for GoFundMe donation"
                  className="qr-code-image"
                />
              </div>
              <p className="qr-description">Scan this QR code with your phone to donate instantly</p>
              <div className="donation-link">
                <span>Direct link: </span>
                <a href={gofundmeUrl} target="_blank" rel="noopener noreferrer" className="link">
                  {gofundmeUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Donate
