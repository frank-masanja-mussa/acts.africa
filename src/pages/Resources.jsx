import React from 'react'
import Navbar from '../components/Navbar'
import Icon from '@mdi/react'
import { mdiBookOpen, mdiVideo, mdiFileDocument, mdiCodeBraces, mdiLightbulb, mdiShare } from '@mdi/js'
import './pages.css'

const Resources = () => {
  return (
    <div className="resources-page">
      <Navbar />
      
      <div className="resources-content">
        <div className="resources-hero">
          <h1 className="resources-title">Learning Resources</h1>
          <p className="resources-subtitle">Tools, content, and expertise to strengthen AI education</p>
        </div>

        <div className="resources-main">
          <div className="resources-card primary">
            <div className="card-header">
              <h2>Share Your Knowledge</h2>
              <div className="card-icon">
                <Icon path={mdiShare} size={1.5} />
              </div>
            </div>
            <p className="card-description">
              Contribute tools, content, or expertise to strengthen ACTS Africa's mission. 
              Your resources help us reach more students and build a comprehensive AI education ecosystem.
            </p>
            <div className="highlight-banner">
              <span className="highlight-text">Join our community of AI education contributors</span>
            </div>
          </div>

          <div className="resources-categories">
            <div className="resource-category">
              <div className="category-icon">
                <Icon path={mdiBookOpen} size={1.2} />
              </div>
              <h3>Educational Materials</h3>
              <p>Lesson plans, tutorials, and learning guides</p>
            </div>
            <div className="resource-category">
              <div className="category-icon">
                <Icon path={mdiVideo} size={1.2} />
              </div>
              <h3>Video Content</h3>
              <p>Recorded lectures, demonstrations, and workshops</p>
            </div>
            <div className="resource-category">
              <div className="category-icon">
                <Icon path={mdiFileDocument} size={1.2} />
              </div>
              <h3>Documentation</h3>
              <p>Technical guides, best practices, and case studies</p>
            </div>
            <div className="resource-category">
              <div className="category-icon">
                <Icon path={mdiCodeBraces} size={1.2} />
              </div>
              <h3>Code & Tools</h3>
              <p>Software, frameworks, and development resources</p>
            </div>
            <div className="resource-category">
              <div className="category-icon">
                <Icon path={mdiLightbulb} size={1.2} />
              </div>
              <h3>Ideas & Insights</h3>
              <p>Innovative approaches and strategic thinking</p>
            </div>
          </div>

          <div className="resources-actions">
            <button className="primary-button" aria-label="Contribute resources to ACTS Africa">
              Contribute Resources
            </button>
            <button className="secondary-button" aria-label="Browse available resources">
              Browse Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources
