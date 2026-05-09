import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import TanzaniaMap from '../maps/TanzaniaMap'
import Icon from '@mdi/react'
import { mdiSchool, mdiAccountGroup, mdiMapMarker, mdiTarget, mdiRocket, mdiClipboardText, mdiChartLine, mdiVolumeHigh, mdiVolumeMute } from '@mdi/js'
import '../../shared/styles/pages.css'

const TanzaniaChapter = () => {
    const audioRef = useRef(null)
    const fadeFrameRef = useRef(null)
    const playTimeoutRef = useRef(null)
    const hideNoticeTimeoutRef = useRef(null)
    const playAudioRef = useRef(() => { })
    const hasStartedRef = useRef(false)
    const hasHandledMuteEffectRef = useRef(false)
    const isMutedRef = useRef(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showAudioNotice, setShowAudioNotice] = useState(true)

    useEffect(() => {
        const audio = audioRef.current

        if (!audio) {
            return undefined
        }

        const startAtSeconds = 204 // 3:24
        const targetVolume = 0.18

        const fadeInAudio = () => {
            if (!audio || hasStartedRef.current || isMutedRef.current) {
                return
            }

            try {
                audio.currentTime = startAtSeconds
                audio.volume = 0
            } catch {
                return
            }

            audio.play()
                .then(() => {
                    hasStartedRef.current = true

                    const fadeDuration = 3200
                    const fadeStart = performance.now()

                    const step = (now) => {
                        const progress = Math.min((now - fadeStart) / fadeDuration, 1)
                        audio.volume = targetVolume * progress

                        if (progress < 1 && !isMutedRef.current) {
                            fadeFrameRef.current = window.requestAnimationFrame(step)
                        }
                    }

                    fadeFrameRef.current = window.requestAnimationFrame(step)
                    hideNoticeTimeoutRef.current = window.setTimeout(() => {
                        setShowAudioNotice(false)
                    }, 7000)
                })
                .catch(() => { })
        }

        playAudioRef.current = fadeInAudio
        playTimeoutRef.current = window.setTimeout(fadeInAudio, 4000)

        const onFirstInteract = () => {
            fadeInAudio()
            window.removeEventListener('click', onFirstInteract)
            window.removeEventListener('touchstart', onFirstInteract)
        }

        window.addEventListener('click', onFirstInteract)
        window.addEventListener('touchstart', onFirstInteract)

        return () => {
            window.removeEventListener('click', onFirstInteract)
            window.removeEventListener('touchstart', onFirstInteract)
            window.clearTimeout(playTimeoutRef.current)
            window.clearTimeout(hideNoticeTimeoutRef.current)
            window.cancelAnimationFrame(fadeFrameRef.current)
        }
    }, [])

    useEffect(() => {
        const audio = audioRef.current

        isMutedRef.current = isMuted

        if (!audio) {
            return
        }

        if (!hasHandledMuteEffectRef.current) {
            hasHandledMuteEffectRef.current = true
            return
        }

        if (isMuted) {
            window.clearTimeout(playTimeoutRef.current)
            window.cancelAnimationFrame(fadeFrameRef.current)
            audio.pause()
            audio.volume = 0
        } else if (hasStartedRef.current) {
            audio.play().catch(() => { })
            audio.volume = 0.18
        } else {
            playAudioRef.current()
        }
    }, [isMuted])

    const handleMuteToggle = () => {
        setIsMuted((current) => !current)
    }

    return (
        <div className="chapter-page">
            <Navbar />

            <audio ref={audioRef} loop preload="auto" className="background-music" aria-label="Background music" controls={false}>
                <source src="/joel_sunny_codex.mp3" type="audio/mpeg" />
            </audio>

            {/* Tanzania Map Background */}
            <TanzaniaMap />

            {showAudioNotice && (
                <div className="chapter-audio-notice" role="status" aria-live="polite">
                    <div className="chapter-audio-icon">
                        <Icon path={isMuted ? mdiVolumeMute : mdiVolumeHigh} size={1} />
                    </div>
                    <div className="chapter-audio-copy">
                        <strong>Music starts softly after 4 seconds.</strong>
                        <span>Lower your volume now if you are not comfortable.</span>
                    </div>
                    <button
                        type="button"
                        className="chapter-audio-button"
                        onClick={handleMuteToggle}
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <button
                        type="button"
                        className="chapter-audio-dismiss"
                        onClick={() => setShowAudioNotice(false)}
                        aria-label="Dismiss music notice"
                    >
                        Hide
                    </button>
                </div>
            )}

            {/* Content Overlay */}
            <div className="chapter-content">
                <div className="chapter-hero">
                    <h1 className="chapter-title">Tanzania proves the model.</h1>
                    <p className="chapter-subtitle">Katavi shows ACTS can teach useful AI in real communities, even when bandwidth is limited.</p>
                </div>

                <div className="chapter-main">
                    <div className="chapter-card primary">
                        <div className="card-header">
                            <h2>Katavi pilot</h2>
                            <div className="card-icon">
                                <Icon path={mdiSchool} size={1.5} />
                            </div>
                        </div>
                        <p className="card-description">
                            From Dar es Salaam into Katavi, we are testing a field-ready model for AI literacy,
                            teacher support, and community delivery that can be replicated across Africa.
                        </p>
                        <div className="progress-indicator">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '100%' }}></div>
                            </div>
                            <span className="progress-text">Pilot active. Scale next.</span>
                        </div>
                    </div>

                    <div className="chapter-stats-grid">
                        <div className="stat-card reached">
                            <div className="stat-number">40</div>
                            <div className="stat-label">Schools reached in Katavi</div>
                            <div className="stat-status">Active</div>
                        </div>
                        <div className="stat-card reached">
                            <div className="stat-number">7,530</div>
                            <div className="stat-label">Participants engaged</div>
                            <div className="stat-status">Reached</div>
                        </div>
                        <div className="stat-card coming-soon">
                            <div className="stat-number">1</div>
                            <div className="stat-label">Region proving the model for wider replication</div>
                            <div className="stat-status">Scaling</div>
                        </div>
                    </div>

                    <div className="chapter-card">
                        <div className="card-header">
                            <h2>How ACTS works in Tanzania</h2>
                            <div className="card-icon">
                                <Icon path={mdiMapMarker} size={1.5} />
                            </div>
                        </div>
                        <div className="operations-grid">
                            <div className="operation-item">
                                <h3>Dar es Salaam base</h3>
                                <p><strong>Tanzania operations hub</strong></p>
                                <p>Planning, coordination, local partnership building, and field preparation.</p>
                            </div>
                            <div className="operation-item">
                                <h3>Katavi field delivery</h3>
                                <p><strong>School and community implementation</strong></p>
                                <p>Sessions, workshops, surveys, and live testing of what works under real constraints.</p>
                            </div>
                            <div className="operation-item">
                                <h3>Replication model</h3>
                                <p><strong>Built to travel</strong></p>
                                <p>Every lesson, tool, and insight is shaped for expansion into new regions and chapters.</p>
                            </div>
                        </div>
                    </div>

                    <div className="impact-cards">
                        <div className="impact-card">
                            <div className="impact-icon">
                                <Icon path={mdiTarget} size={1.2} />
                            </div>
                            <h3>AI literacy sessions</h3>
                            <p>Practical workshops on how AI works, where it helps, and where caution is needed.</p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-icon">
                                <Icon path={mdiAccountGroup} size={1.2} />
                            </div>
                            <h3>Teacher support</h3>
                            <p>Helping educators carry the work forward with confidence and local relevance.</p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-icon">
                                <Icon path={mdiRocket} size={1.2} />
                            </div>
                            <h3>Low-bandwidth resilience</h3>
                            <p>Designing delivery that can still work when internet access is unstable or unavailable.</p>
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
                        <Link to="/donate" className="secondary-button" aria-label="Support the Tanzania chapter">
                            Support Chapter
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default TanzaniaChapter
