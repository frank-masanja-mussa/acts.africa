import React, { useMemo, useState } from 'react'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import Icon from '@mdi/react'
import { mdiMessageText, mdiLightbulb, mdiHeart, mdiSend, mdiAccount } from '@mdi/js'
import '../../shared/styles/pages.css'

const recipientEmails = [
    'frank@koola.app',
    'voiceofcalling@gmail.com',
    'wonup2@gmail.com',
    'africa@daven.ai'
]

const TellUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        type: 'feedback'
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const mailtoHref = useMemo(() => {
        const subject = `ACTS message - ${formData.type}`
        const body = [
            'ACTS message',
            '',
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Type: ${formData.type}`,
            '',
            formData.message
        ].join('\n')

        return `mailto:${recipientEmails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }, [formData])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        window.location.href = mailtoHref
    }

    return (
        <div className="tell-us-page">
            <Navbar />

            <div className="tell-us-content">
                <div className="tell-us-hero">
                    <h1 className="tell-us-title">Talk to ACTS.</h1>
                    <p className="tell-us-subtitle">Ideas, stories, corrections, partnerships. Send them.</p>
                </div>

                <div className="tell-us-main">
                    <div className="tell-us-card primary">
                        <div className="card-header">
                            <h2>We listen before we scale</h2>
                            <div className="card-icon">
                                <Icon path={mdiMessageText} size={1.5} />
                            </div>
                        </div>
                        <p className="card-description">
                            Tell us what is working, what is missing, and where ACTS should move next.
                            Short notes are enough.
                        </p>
                        <div className="highlight-banner">
                            <span className="highlight-text">Real feedback makes the work stronger.</span>
                        </div>
                    </div>

                    <div className="feedback-types">
                        <div className="feedback-type">
                            <div className="type-icon">
                                <Icon path={mdiLightbulb} size={1.2} />
                            </div>
                            <h3>Ideas</h3>
                            <p>Better ways to teach, organize, or reach more people.</p>
                        </div>
                        <div className="feedback-type">
                            <div className="type-icon">
                                <Icon path={mdiHeart} size={1.2} />
                            </div>
                            <h3>Stories from the ground</h3>
                            <p>What learners, teachers, and communities are experiencing.</p>
                        </div>
                        <div className="feedback-type">
                            <div className="type-icon">
                                <Icon path={mdiAccount} size={1.2} />
                            </div>
                            <h3>Partnerships</h3>
                            <p>Offer a school, venue, sponsor, tool, or delivery partnership.</p>
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
                            <a href={mailtoHref} className="secondary-button" aria-label="Open your email app to contact ACTS Africa">
                                Use email app
                            </a>
                        </div>
                        <p className="tell-us-note">
                            Direct emails: {recipientEmails.join(', ')}
                        </p>
                        {submitted && (
                            <div className="form-success">
                                <h3>Your message is ready to send.</h3>
                                <p>If your mail app did not open, use the email button or send it directly to the addresses above.</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default TellUs
