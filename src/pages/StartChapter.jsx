import React, { useEffect, useRef } from 'react'
import PageLayout from './PageLayout'

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
    <PageLayout title="Start a Local Chapter">
      <audio ref={audioRef} loop preload="auto" className="background-music">
        <source src="/joel_sunny_codex.mp3" type="audio/mpeg" />
      </audio>
      <div className="page-card">
        <p>
          Launch a chapter in your city and grow a local AI community.
        </p>
      </div>
      <div className="page-actions">
        <button className="page-button">Start a Chapter</button>
      </div>
    </PageLayout>
  )
}

export default StartChapter
