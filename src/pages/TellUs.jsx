import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '@mdi/react'
import { mdiMessageText, mdiLightbulb, mdiHeart, mdiSend, mdiAccount } from '@mdi/js'
import './pages.css'

const TellUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'feedback'
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="tell-us-page">
      <Navbar />
      
      <div className="tell-us-content">
        <div className="tell-us-hero">
          <h1 className="tell-us-title">Share Your Voice</h1>
          <p className="tell-us-subtitle">We welcome your ideas, feedback, and stories. Let's build together.</p>
        </div>

        <div className="tell-us-main">
          <div className="tell-us-card primary">
            <div className="card-header">
              <h2>Connect With Us</h2>
              <div className="card-icon">
                <Icon path={mdiMessageText} size={1.5} />
              </div>
            </div>
            <p className="card-description">
              Your voice matters in shaping the future of AI education in Africa. 
              Share your ideas, experiences, and suggestions to help us grow and improve.
            </p>
            <div className="highlight-banner">
              <span className="highlight-text">Every idea brings us closer to our mission</span>
            </div>
          </div>

          <div className="feedback-types">
            <div className="feedback-type">
              <div className="type-icon">
                <Icon path={mdiLightbulb} size={1.2} />
              </div>
              <h3>Ideas & Suggestions</h3>
              <p>Share innovative approaches and improvements</p>
            </div>
            <div className="feedback-type">
              <div className="type-icon">
                <Icon path={mdiHeart} size={1.2} />
              </div>
              <h3>Stories & Experiences</h3>
              <p>Tell us about your AI education journey</p>
            </div>
            <div className="feedback-type">
              <div className="type-icon">
                <Icon path={mdiAccount} size={1.2} />
              </div>
              <h3>Partnership Inquiries</h3>
              <p>Explore collaboration opportunities</p>
            </div>
          </div>

          <form className="tell-us-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label">Message Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
              >
                <option value="feedback">General Feedback</option>
                <option value="idea">Idea/Suggestion</option>
                <option value="story">Share Story</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input"
                rows="5"
                placeholder="Share your thoughts, ideas, or experiences with us..."
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button" aria-label="Send your message to ACTS Africa">
                <Icon path={mdiSend} size={1} />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default TellUs
