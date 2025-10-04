import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import Analytics from './Analytics'
import Footer from './Footer'

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

  // Smooth transition effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const heroHeight = windowHeight * 0.85 // Hero section height
      
      // Calculate transition progress
      const transitionStart = heroHeight * 0.8 // Start transition at 80% of hero height
      const transitionEnd = heroHeight * 1.1 // End transition at 110% of hero height
      
      if (scrollY >= transitionStart) {
        const progress = Math.min((scrollY - transitionStart) / (transitionEnd - transitionStart), 1)
        const blurValue = progress * 8 // Max blur of 8px
        
        // Apply blur to bg-fade
        const bgFade = document.querySelector('.bg-fade')
        if (bgFade) {
          bgFade.style.setProperty('--blur-value', `${blurValue}px`)
        }
        
        // Apply blur to analytics section
        const analyticsSection = document.querySelector('.analytics-section')
        if (analyticsSection) {
          analyticsSection.style.setProperty('--blur-value', `${blurValue}px`)
        }
      } else {
        // Reset blur when not in transition zone
        const bgFade = document.querySelector('.bg-fade')
        const analyticsSection = document.querySelector('.analytics-section')
        if (bgFade) bgFade.style.setProperty('--blur-value', '0px')
        if (analyticsSection) analyticsSection.style.setProperty('--blur-value', '0px')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        const startXRaw = (aIsLeft ? aRect.right : aRect.left) - svgRect.left
        const startYRaw = aRect.top + aRect.height / 2 - svgRect.top
        const bIsRight = b.classList.contains('right')
        const endXRaw = (bIsRight ? bRect.left : bRect.right) - svgRect.left
        const endYRaw = bRect.top + bRect.height / 2 - svgRect.top
        
        // Tighten connector height so curve hugs endpoints
        const requiredH = Math.max(60, Math.abs(endYRaw - startYRaw) + 24)
        svg.style.height = `${requiredH}px`
        const adjSvgRect = svg.getBoundingClientRect()
        
        // Convert page coords to current SVG coords after height change
        const sy = startYRaw + (svgRect.top - adjSvgRect.top)
        const ey = endYRaw + (svgRect.top - adjSvgRect.top)
        
        // Start/End at the dot centers outside card edges so lines bend from the side
        const dotOffsetPx = 8
        const startX = startXRaw + (aIsLeft ? dotOffsetPx : -dotOffsetPx)
        const endX = endXRaw + (bIsRight ? -dotOffsetPx : dotOffsetPx)
        
        const dx = Math.abs(endX - startX)
        const c1x = startX + (aIsLeft ? dx * 0.24 : -dx * 0.24)
        const c2x = endX - (bIsRight ? dx * 0.24 : -dx * 0.24)
        // Pull control points outward slightly to ensure the curve exits/enters from the side
        const sidePull = 10
        const c1y = sy + (aIsLeft ? 0 : 0) + (sy < ey ? sidePull : -sidePull) * 0
        const c2y = ey + (aIsLeft ? 0 : 0) + (sy < ey ? -sidePull : sidePull) * 0
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
        aria-label="Background video showing ACTS Africa mission"
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
          <div className="hero-actions">
            <button className="watch-button" onClick={handleWatchClick} aria-label="Watch our mission video">
              Watch
            </button>
            <a 
              href="https://gofund.me/e9f5257e9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="donate-button"
              aria-label="Donate to support our mission"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>

      {/* Smooth fade from hero to analytics */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="background-music"
        aria-label="Background music"
        controls={false}
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
      <section className="mission-section" aria-labelledby="mission-heading">
        <div className="mission-container">
          <p className="mission-text">
            We are making sure the 2.5B working class people of 2030 through 2050 are informed about AI so we save them from unemployment and poverty due to misinformation.
          </p>
          <h2 id="mission-heading" className="mission-heading">How we do it?</h2>

          <div className="journey-container">
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d2691e" />
                  <stop offset="50%" stopColor="#cd853f" />
                  <stop offset="100%" stopColor="#daa520" />
                </linearGradient>
              </defs>
            </svg>
            <div className="journey-timeline">
              <div className="timeline-item" ref={el => stepRefs.current[0] = el}>
                <div className="timeline-marker">
                  <div className="marker-number">01</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Start from US & Tanzania, Reach Katavi</h3>
                  <p className="timeline-description">From our dual headquarters in California and Dar es Salaam, we reach out to educate 42 secondary schools in Katavi region — nearly 10,000 students and teachers — with AI literacy and hands‑on workshops. Collect outcomes and refine the model.</p>
                </div>
              </div>

              <div className="timeline-connector" ref={el => connRefs.current[0] = el}>
                <svg viewBox="0 0 100 200" preserveAspectRatio="none">
                  <path d="M50 0 L50 200" stroke="url(#connectorGradient)" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="timeline-item" ref={el => stepRefs.current[1] = el}>
                <div className="timeline-marker">
                  <div className="marker-number">02</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Scale across Tanzania</h3>
                  <p className="timeline-description">Open a Tanzania chapter; bring teacher training and community showcases to regions nationwide guided by our Katavi impact results.</p>
                </div>
              </div>

              <div className="timeline-connector" ref={el => connRefs.current[1] = el}>
                <svg viewBox="0 0 100 200" preserveAspectRatio="none">
                  <path d="M50 0 L50 200" stroke="url(#connectorGradient)" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="timeline-item" ref={el => stepRefs.current[2] = el}>
                <div className="timeline-marker">
                  <div className="marker-number">03</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Data‑driven curriculum & partners</h3>
                  <p className="timeline-description">Use outcomes data to iterate a localized AI literacy curriculum. Partner with ministries, telcos, and universities to expand reach and credibility.</p>
                </div>
              </div>

              <div className="timeline-connector" ref={el => connRefs.current[2] = el}>
                <svg viewBox="0 0 100 200" preserveAspectRatio="none">
                  <path d="M50 0 L50 200" stroke="url(#connectorGradient)" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="timeline-item" ref={el => stepRefs.current[3] = el}>
                <div className="timeline-marker">
                  <div className="marker-number">04</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Pan‑African chapters</h3>
                  <p className="timeline-description">Launch chapters across Sub‑Saharan Africa. Train local leaders and deploy scalable content platforms with offline support.</p>
                </div>
              </div>

              <div className="timeline-connector" ref={el => connRefs.current[3] = el}>
                <svg viewBox="0 0 100 200" preserveAspectRatio="none">
                  <path d="M50 0 L50 200" stroke="url(#connectorGradient)" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="timeline-item" ref={el => stepRefs.current[4] = el}>
                <div className="timeline-marker">
                  <div className="marker-number">05</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Workforce readiness at scale</h3>
                  <p className="timeline-description">Connect youth to AI‑augmented livelihoods via projects, apprenticeships, and micro‑credentials. Inform policy so Africa powers the world's workforce by 2050.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Home
