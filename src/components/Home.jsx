import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import Analytics from './Analytics'

const Home = () => {
  const audioRef = useRef(null)
  const stepRefs = useRef([])
  const connRefs = useRef([])
  const [paths, setPaths] = useState(["", "", "", ""]) // 4 connectors

  useEffect(() => {
    // Play background music when component mounts; fall back to first user interaction
    if (!audioRef.current) return
    audioRef.current.volume = 0.3
    const startPlayback = () => {
      audioRef.current?.play().catch(() => {})
    }
    // Try immediately
    startPlayback()
    // Retry on first user interaction if autoplay is blocked
    const onFirstInteract = () => {
      startPlayback()
      window.removeEventListener('click', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
      window.removeEventListener('touchstart', onFirstInteract)
    }
    window.addEventListener('click', onFirstInteract)
    window.addEventListener('keydown', onFirstInteract)
    window.addEventListener('touchstart', onFirstInteract)
    return () => {
      window.removeEventListener('click', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
      window.removeEventListener('touchstart', onFirstInteract)
    }
  }, [])

  const handleWatchClick = () => {
    // Video interaction logic will be implemented here
    console.log('Watch button clicked')
  }

  // Compute connector paths to precisely join card edge midpoints
  useEffect(() => {
    const compute = () => {
      const newPaths = []
      for (let i = 0; i < 4; i++) {
        const a = stepRefs.current[i]
        const b = stepRefs.current[i + 1]
        const svg = connRefs.current[i]
        if (!a || !b || !svg) { newPaths[i] = ""; continue }
        // Ensure SVG viewBox matches rendered size
        const svgRect = svg.getBoundingClientRect()
        svg.setAttribute('viewBox', `0 0 ${Math.round(svgRect.width)} ${Math.round(svgRect.height)}`)
        const aRect = a.getBoundingClientRect()
        const bRect = b.getBoundingClientRect()
        // Start at middle-right of left-aligned card, or middle-left of right-aligned card
        const aIsLeft = a.classList.contains('left')
        const startX = (aIsLeft ? aRect.right : aRect.left) - svgRect.left
        const startY = aRect.top + aRect.height / 2 - svgRect.top
        const bIsRight = b.classList.contains('right')
        const endX = (bIsRight ? bRect.left : bRect.right) - svgRect.left
        const endY = bRect.top + bRect.height / 2 - svgRect.top
        // Adjust SVG height to comfortably include vertical delta
        const requiredH = Math.max(160, Math.abs(endY - startY) + 120)
        svg.style.height = `${requiredH}px`
        const adjSvgRect = svg.getBoundingClientRect()
        const sy = startY + (svgRect.top - adjSvgRect.top)
        const ey = endY + (svgRect.top - adjSvgRect.top)
        const dx = Math.abs(endX - startX)
        const c1x = startX + (aIsLeft ? dx * 0.35 : -dx * 0.35)
        const c2x = endX - (bIsRight ? dx * 0.35 : -dx * 0.35)
        const c1y = sy + (ey - sy) * 0.25
        const c2y = ey - (ey - sy) * 0.25
        newPaths[i] = `M ${startX} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${ey}`
      }
      setPaths(newPaths)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero: video background limited to top section */}
      <section className="hero">
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/daven_video_1a8e6e15-3_092525_.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        <div className="content-overlay">
          <h1 className="main-text">
            <span className="line">The future is AI and </span>
            <span className="line">what about the uninformed</span>
            <span className="line highlight">2.5B?</span>
          </h1>
          <button className="watch-button" onClick={handleWatchClick}>
            Watch
          </button>
        </div>
      </section>

      {/* Smooth fade from hero to analytics */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="background-music"
      >
        <source src="/summertime_sadness_violin.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="bg-fade" />

      {/* Neutral background analytics section */}
      <section className="analytics-section">
        <Analytics />
      </section>

      {/* Fade between analytics and mission sections */}
      <div className="section-fade" />

      {/* Mission statement */}
      <section className="mission-section">
        <div className="mission-container">
          <p className="mission-text">
            We are making sure the 2.5B working class people of 2030 through 2050 are informed about AI so we save them from unemployment and poverty due to missinformation.
          </p>
          <h2 className="mission-heading">How we do it?</h2>

          <div className="steps">
            <div className="step-card left" ref={el => stepRefs.current[0] = el}>
              <div className="step-badge">Step 1</div>
              <h3 className="step-title">Start in Katavi, Tanzania</h3>
              <p className="step-body">Educate 42 secondary schools — nearly 10,000 students and teachers — with AI literacy and hands‑on workshops. Collect outcomes and refine the model.</p>
            </div>

            <svg className="step-connector conn-1" ref={el => connRefs.current[0] = el} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
              <path d={paths[0]} />
            </svg>

            <div className="step-card right" ref={el => stepRefs.current[1] = el}>
              <div className="step-badge">Step 2</div>
              <h3 className="step-title">Scale across Tanzania</h3>
              <p className="step-body">Open a Tanzania chapter; bring AI clubs, teacher training, and community showcases to regions nationwide guided by Katavi results.</p>
            </div>

            <svg className="step-connector conn-2" ref={el => connRefs.current[1] = el} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
              <path d={paths[1]} />
            </svg>

            <div className="step-card left" ref={el => stepRefs.current[2] = el}>
              <div className="step-badge">Step 3</div>
              <h3 className="step-title">Data‑driven curriculum & partners</h3>
              <p className="step-body">Use outcomes data to iterate a localized AI literacy curriculum. Partner with ministries, telcos, and universities to expand reach and credibility.</p>
            </div>

            <svg className="step-connector conn-3" ref={el => connRefs.current[2] = el} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
              <path d={paths[2]} />
            </svg>

            <div className="step-card right" ref={el => stepRefs.current[3] = el}>
              <div className="step-badge">Step 4</div>
              <h3 className="step-title">Pan‑African chapters</h3>
              <p className="step-body">Launch chapters across Sub‑Saharan Africa. Train local leaders, seed AI clubs, and deploy scalable content platforms with offline support.</p>
            </div>

            <svg className="step-connector conn-4" ref={el => connRefs.current[3] = el} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
              <path d={paths[3]} />
            </svg>

            <div className="step-card left" ref={el => stepRefs.current[4] = el}>
              <div className="step-badge">Step 5</div>
              <h3 className="step-title">Workforce readiness at scale</h3>
              <p className="step-body">Connect youth to AI‑augmented livelihoods via projects, apprenticeships, and micro‑credentials. Inform policy so Africa powers the world’s workforce by 2050.</p>
            </div>
          </div>
      </div>
      </section>
    </div>
  )
}

export default Home
