import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import TanzaniaMap from '../components/TanzaniaMap'
import Icon from '@mdi/react'
import { mdiSchool, mdiAccountGroup, mdiMapMarker, mdiTarget, mdiRocket } from '@mdi/js'
import './pages.css'

const TanzaniaChapter = () => {
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
      
      {/* Tanzania Map Background */}
      <TanzaniaMap />
      
      {/* Content Overlay */}
      <div className="chapter-content">
        <div className="chapter-hero">
          <h1 className="chapter-title">Tanzania Chapter</h1>
          <p className="chapter-subtitle">Where our journey begins</p>
        </div>

        <div className="chapter-main">
                  <div className="chapter-card primary">
                    <div className="card-header">
                      <h2>Katavi Pioneer Program</h2>
                      <div className="card-icon">
                        <Icon path={mdiSchool} size={1.5} />
                      </div>
                    </div>
            <p className="card-description">
              Our journey begins in Tanzania, starting with Katavi region. We're educating 42 secondary schools 
              — nearly 10,000 students and teachers — with AI literacy and hands-on workshops.
            </p>
            <div className="progress-indicator">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '35%' }}></div>
              </div>
              <span className="progress-text">35% Complete</span>
            </div>
          </div>

          <div className="chapter-stats-grid">
            <div className="stat-card reached">
              <div className="stat-number">42</div>
              <div className="stat-label">Secondary Schools</div>
              <div className="stat-status">Active</div>
            </div>
            <div className="stat-card reached">
              <div className="stat-number">10K</div>
              <div className="stat-label">Students & Teachers</div>
              <div className="stat-status">Reached</div>
            </div>
            <div className="stat-card coming-soon">
              <div className="stat-number">25</div>
              <div className="stat-label">Regions Planned</div>
              <div className="stat-status">Coming Soon</div>
            </div>
          </div>

                  <div className="impact-cards">
                    <div className="impact-card">
                      <div className="impact-icon">
                        <Icon path={mdiTarget} size={1.2} />
                      </div>
                      <h3>AI Literacy Workshops</h3>
                      <p>Hands-on training sessions covering AI fundamentals, ethics, and practical applications</p>
                    </div>
                    <div className="impact-card">
                      <div className="impact-icon">
                        <Icon path={mdiAccountGroup} size={1.2} />
                      </div>
                      <h3>Teacher Training</h3>
                      <p>Empowering educators with tools and knowledge to integrate AI concepts into their curriculum</p>
                    </div>
                    <div className="impact-card">
                      <div className="impact-icon">
                        <Icon path={mdiRocket} size={1.2} />
                      </div>
                      <h3>Community Showcases</h3>
                      <p>Student-led presentations demonstrating AI projects and real-world applications</p>
                    </div>
                  </div>

          <div className="chapter-actions">
            <button className="primary-button" aria-label="Learn more about the Tanzania chapter">
              View Progress
            </button>
            <button className="secondary-button" aria-label="Support the Tanzania chapter">
              Support Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TanzaniaChapter
