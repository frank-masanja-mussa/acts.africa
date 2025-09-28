import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Icon from '@mdi/react'
import { mdiHeart, mdiHandHeart, mdiGift, mdiAccountGroup } from '@mdi/js'
import './pages.css'

const Donate = () => {
  const audioRef = useRef(null)

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
            <button className="primary-button" aria-label="Donate to support ACTS Africa mission">
              Donate Now
            </button>
            <button className="secondary-button" aria-label="Learn more about our impact">
              View Impact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
