import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import AfricaMap from '../maps/AfricaMap'
import Icon from '@mdi/react'
import { mdiRocket } from '@mdi/js'
import '../../shared/styles/pages.css'

const StartChapter = () => {
    const audioRef = useRef(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.35
            const startAtSeconds = 204 // 3:24
            const attemptPlay = () => {
                try {
                    audioRef.current.currentTime = startAtSeconds
                    audioRef.current.play().catch(() => { })
                } catch { }
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
                    <h1 className="chapter-title">Start ACTS where you are.</h1>
                    <p className="chapter-subtitle">Open a local node for practical AI learning in your school, city, workplace, or community.</p>
                </div>

                <div className="chapter-main">
                    <div className="chapter-card primary">
                        <div className="card-header">
                            <h2>Open a local chapter</h2>
                            <div className="card-icon">
                                <Icon path={mdiRocket} size={1.5} />
                            </div>
                        </div>
                        <p className="card-description">
                            We help local organizers start with a real need, a real audience, and a practical way to deliver.
                            ACTS does not need a perfect setup to begin.
                        </p>
                        <div className="highlight-banner">
                            <span className="highlight-text">Proof in Tanzania. Chapters across Africa next.</span>
                        </div>
                    </div>

                    <div className="chapter-stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">2.5B</div>
                            <div className="stat-label">People to reach by 2050</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">1</div>
                            <div className="stat-label">Pilot model already running</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">Next</div>
                            <div className="stat-label">Your city, campus, school, or worker community</div>
                        </div>
                    </div>

                    <div className="chapter-actions">
                        <Link to="/chapter-application" className="primary-button" aria-label="Start a new ACTS Africa chapter in your area">
                            Start Your Chapter
                        </Link>
                        <Link to="/programs" className="secondary-button" aria-label="See open ACTS programs">
                            See open programs
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default StartChapter
