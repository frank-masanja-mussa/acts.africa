import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AfricaMap from '../components/AfricaMap'
import Icon from '@mdi/react'
import { mdiRocket, mdiMapMarker, mdiAccountGroup, mdiTarget } from '@mdi/js'
import './pages.css'

const StartChapter = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
      const startAtSeconds = 204 // 3:24
      const attemptPlay = () => {
        try {
          audioRef.current.currentTime = startAtSeconds
          audioRef.current.play().catch(() => {})
        } catch {}
      }
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
    <div className="chapter-page">
      <Navbar />
      
      <audio ref={audioRef} loop preload="auto" className="background-music" aria-label="Background music" controls={false}>
        <source src="/joel_sunny_codex.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Africa Map Background */}
      <AfricaMap />
      
      {/* Content Overlay */}
      <div className="chapter-content">
        <div className="chapter-hero">
          <h1 className="chapter-title">Start a Local Chapter</h1>
          <p className="chapter-subtitle">Launch AI education in your community</p>
        </div>

        <div className="chapter-main">
                  <div className="chapter-card primary">
                    <div className="card-header">
                      <h2>Join the Movement</h2>
                      <div className="card-icon">
                        <Icon path={mdiRocket} size={1.5} />
                      </div>
                    </div>
            <p className="card-description">
              Launch a chapter in your city and grow a local AI community. Connect with students, 
              educators, and professionals to build AI literacy from the ground up.
            </p>
            <div className="highlight-banner">
              <span className="highlight-text">We're starting in Tanzania and expanding across Africa</span>
            </div>
          </div>

          <div className="chapter-stats-grid">
            <div className="stat-card">
              <div className="stat-number">2.5B</div>
              <div className="stat-label">People to reach by 2050</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Countries planned</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1</div>
              <div className="stat-label">Active chapter</div>
            </div>
          </div>

          <div className="chapter-actions">
            <a href="/chapter-application" className="primary-button" aria-label="Start a new ACTS Africa chapter in your area">
              Start Your Chapter
            </a>
            <button className="secondary-button" aria-label="Learn more about starting a chapter">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartChapter
