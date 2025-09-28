import React from 'react'
import './pages.css'
import Navbar from '../components/Navbar'

const PageLayout = ({ title, children, action, hasVideo = true }) => {
  return (
    <div className="page-container">
      <Navbar />
      {hasVideo && (
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
      )}

      <div className="page-overlay">
        {title && <h1 className="page-title">{title}</h1>}
        {children}
        {action}
      </div>
    </div>
  )
}

export default PageLayout
