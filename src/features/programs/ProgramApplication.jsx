import React, { useMemo, useState } from 'react'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import './Programs.css'

const initialForm = {
    name: '',
    email: '',
    location: '',
    organization: '',
    role: 'Teacher',
    program: 'Katavi expansion',
    contribution: ''
}

const recipientEmails = [
    'frank@koola.app',
    'voiceofcalling@gmail.com',
    'wonup2@gmail.com',
    'africa@daven.ai'
]

const ProgramApplication = () => {
    const [formData, setFormData] = useState(initialForm)
    const [submitted, setSubmitted] = useState(false)

    const mailtoHref = useMemo(() => {
        const subject = `ACTS Program Application - ${formData.program}`
        const body = [
            'ACTS program application',
            '',
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Location: ${formData.location}`,
            `Organization: ${formData.organization}`,
            `Role: ${formData.role}`,
            `Program: ${formData.program}`,
            '',
            'How I want to join:',
            formData.contribution
        ].join('\n')

        return `mailto:${recipientEmails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }, [formData])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
        window.location.href = mailtoHref
    }

    return (
        <div className="programs-page">
            <Navbar />

            <main className="programs-content">
                <section className="programs-hero programs-hero-compact">
                    <span className="programs-kicker">Apply</span>
                    <h1>Tell us how you want to join ACTS.</h1>
                    <p>Pick a track. We will take it from there.</p>
                </section>

                <section className="program-apply-shell">
                    <div className="program-apply-note">
                        <h2>What happens next</h2>
                        <p>We open an email draft with your details so your application reaches us directly.</p>
                    </div>

                    <form className="program-apply-form" onSubmit={handleSubmit}>
                        <div className="program-field-grid">
                            <label className="program-field">
                                <span>Name</span>
                                <input name="name" value={formData.name} onChange={handleChange} required />
                            </label>
                            <label className="program-field">
                                <span>Email</span>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </label>
                            <label className="program-field">
                                <span>Location</span>
                                <input name="location" value={formData.location} onChange={handleChange} placeholder="City, region, country" required />
                            </label>
                            <label className="program-field">
                                <span>Organization</span>
                                <input name="organization" value={formData.organization} onChange={handleChange} placeholder="School, group, company, or community" />
                            </label>
                            <label className="program-field">
                                <span>Your role</span>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option>Teacher</option>
                                    <option>Student leader</option>
                                    <option>Community organizer</option>
                                    <option>Worker group leader</option>
                                    <option>Government or district officer</option>
                                    <option>Partner organization</option>
                                </select>
                            </label>
                            <label className="program-field">
                                <span>Program</span>
                                <select name="program" value={formData.program} onChange={handleChange}>
                                    <option>Katavi expansion</option>
                                    <option>Train-the-Trainer academy</option>
                                    <option>Working-class AI clinics</option>
                                    <option>Chapter launch network</option>
                                </select>
                            </label>
                        </div>

                        <label className="program-field">
                            <span>How do you want to join?</span>
                            <textarea
                                name="contribution"
                                value={formData.contribution}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Tell us what part you want to host, lead, fund, or support."
                                required
                            />
                        </label>

                        <div className="program-apply-actions">
                            <button type="submit" className="program-submit">
                                Open application email
                            </button>
                            <a href={mailtoHref} className="program-mail-link">
                                Or email it manually
                            </a>
                        </div>

                        {submitted && (
                            <p className="program-success">
                                If your mail app did not open, send your application to {recipientEmails.join(', ')}.
                            </p>
                        )}
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default ProgramApplication
