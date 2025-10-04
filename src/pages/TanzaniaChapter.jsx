import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TanzaniaMap from '../components/TanzaniaMap'
import Icon from '@mdi/react'
import { mdiSchool, mdiAccountGroup, mdiMapMarker, mdiTarget, mdiRocket, mdiClipboardText, mdiChartLine } from '@mdi/js'
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
              Our journey begins in Tanzania, with our headquarters in Dar es Salaam reaching out to Katavi region. We're educating 42 secondary schools 
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

          <div className="chapter-card">
            <div className="card-header">
              <h2>Our Operations</h2>
              <div className="card-icon">
                <Icon path={mdiMapMarker} size={1.5} />
              </div>
            </div>
            <div className="operations-grid">
              <div className="operation-item">
                <h3>US Headquarters</h3>
                <p><strong>Northridge, California, USA</strong></p>
                <p>Our main office for global operations, strategic planning, and international coordination.</p>
              </div>
              <div className="operation-item">
                <h3>Tanzania Office</h3>
                <p><strong>Dar es Salaam, Tanzania</strong></p>
                <p>Our regional office for local operations, program delivery, and community engagement.</p>
              </div>
              <div className="operation-item">
                <h3>Impact Zone</h3>
                <p><strong>Katavi Region</strong></p>
                <p>Where we travel to deliver AI education programs to 42 secondary schools and 10,000+ students.</p>
              </div>
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
            <Link to="/tanzania-survey" className="primary-button" aria-label="Take the AI Literacy Survey">
              <Icon path={mdiClipboardText} size={1} />
              Take AI Survey
            </Link>
            <Link to="/live-data" className="secondary-button" aria-label="View survey analytics">
              <Icon path={mdiChartLine} size={1} />
              View Analytics
            </Link>
            <button className="secondary-button" aria-label="Support the Tanzania chapter">
              Support Chapter
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default TanzaniaChapter
