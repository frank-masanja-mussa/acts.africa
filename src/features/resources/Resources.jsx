import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import Icon from '@mdi/react'
import { mdiBookOpen, mdiVideo, mdiFileDocument, mdiCodeBraces, mdiLightbulb, mdiShare } from '@mdi/js'
import '../../shared/styles/pages.css'

const contactHref = 'mailto:frank@koola.app,voiceofcalling@gmail.com,wonup2@gmail.com,africa@daven.ai?subject=ACTS%20Resource%20Contribution'

const Resources = () => {
    return (
        <div className="resources-page">
            <Navbar />

            <div className="resources-content">
                <div className="resources-hero">
                    <h1 className="resources-title">Use what we teach.</h1>
                    <p className="resources-subtitle">Take the lesson plan. Share tools that help your community move.</p>
                </div>

                <div className="resources-main">
                    <div className="resources-card primary">
                        <div className="card-header">
                            <h2>Build the ACTS resource commons</h2>
                            <div className="card-icon">
                                <Icon path={mdiShare} size={1.5} />
                            </div>
                        </div>
                        <p className="card-description">
                            We collect practical materials that make AI education easier to run in real places:
                            schools, worker groups, churches, campuses, and low-bandwidth communities.
                        </p>
                        <div className="highlight-banner">
                            <span className="highlight-text">Low-bandwidth. Practical. Local-first.</span>
                        </div>
                    </div>

                    <div className="resources-categories">
                        <div className="resource-category">
                            <div className="category-icon">
                                <Icon path={mdiBookOpen} size={1.2} />
                            </div>
                            <h3>Lesson plans</h3>
                            <p>Ready-to-run teaching guides for classrooms and workshops.</p>
                        </div>
                        <div className="resource-category">
                            <div className="category-icon">
                                <Icon path={mdiVideo} size={1.2} />
                            </div>
                            <h3>Video explainers</h3>
                            <p>Short demos, walkthroughs, and clips that travel well on mobile.</p>
                        </div>
                        <div className="resource-category">
                            <div className="category-icon">
                                <Icon path={mdiFileDocument} size={1.2} />
                            </div>
                            <h3>Field guides</h3>
                            <p>Case studies, facilitation notes, and templates from the ground.</p>
                        </div>
                        <div className="resource-category">
                            <div className="category-icon">
                                <Icon path={mdiCodeBraces} size={1.2} />
                            </div>
                            <h3>Tools</h3>
                            <p>Software, workflows, and teaching aids that reduce friction.</p>
                        </div>
                        <div className="resource-category">
                            <div className="category-icon">
                                <Icon path={mdiLightbulb} size={1.2} />
                            </div>
                            <h3>Local insight</h3>
                            <p>Ideas that make ACTS more useful in your language and context.</p>
                        </div>
                    </div>

                    <div className="resources-actions">
                        <a href={contactHref} className="primary-button" aria-label="Share resources with ACTS Africa by email">
                            Share a resource
                        </a>
                        <Link to="/lesson-plan" className="secondary-button" aria-label="Open the ACTS lesson plan">
                            Open lesson plan
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Resources
