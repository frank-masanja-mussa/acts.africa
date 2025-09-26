import React, { useEffect, useRef } from 'react'
import PageLayout from './PageLayout'

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
    <PageLayout title="Donate for the Cause">
      <audio ref={audioRef} loop preload="auto" className="background-music" aria-label="Background music" controls={false}>
        <source src="/joel_sunny_codex.mp3" type="audio/mpeg" />
      </audio>
      <div className="page-card">
        <p>
          Your support accelerates AI education and empowerment across African chapters.
        </p>
      </div>
      <div className="page-actions">
        <button className="page-button" aria-label="Donate to support ACTS Africa mission">Donate Now</button>
      </div>
    </PageLayout>
  )
}

export default Donate
