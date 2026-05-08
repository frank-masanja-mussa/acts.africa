import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import {
    mdiAccountGroupOutline,
    mdiBullhorn,
    mdiMapMarkerRadiusOutline,
    mdiSchoolOutline,
    mdiBriefcaseOutline
} from '@mdi/js'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import './Programs.css'

const programs = [
    {
        title: 'Katavi expansion',
        summary: 'We scale the pilot from proof into repeatable delivery.',
        details: 'School sessions, worker outreach, local coordination, field logistics.',
        audience: 'Schools, districts, hosts',
        icon: mdiMapMarkerRadiusOutline
    },
    {
        title: 'Train-the-Trainer academy',
        summary: 'We build local facilitators who can run ACTS with confidence.',
        details: 'Teaching tools, delivery practice, ethical AI, local adaptation.',
        audience: 'Teachers, facilitators, youth leaders',
        icon: mdiSchoolOutline
    },
    {
        title: 'Working-class AI clinics',
        summary: 'We make AI practical for daily work and income.',
        details: 'Use cases for mining, agriculture, trade, and informal work.',
        audience: 'Worker groups, associations, cooperatives',
        icon: mdiBriefcaseOutline
    },
    {
        title: 'Chapter launch network',
        summary: 'We open local ACTS nodes that can keep teaching and organizing.',
        details: 'Community structure, outreach strategy, local ownership, growth support.',
        audience: 'Campuses, cities, community organizations',
        icon: mdiAccountGroupOutline
    }
]

const Programs = () => {
    return (
        <div className="programs-page">
            <Navbar />

            <main className="programs-content">
                <section className="programs-hero">
                    <span className="programs-kicker">Upcoming programs</span>
                    <h1>Choose the ACTS work you want to join.</h1>
                    <p>
                        We are opening practical entry points for schools, workers, teachers, and local organizers.
                    </p>
                    <Link to="/programs/apply" className="programs-hero-cta">
                        Apply now
                    </Link>
                </section>

                <section className="programs-list" aria-labelledby="program-list-heading">
                    <div className="programs-section-head">
                        <span className="programs-section-label">Open tracks</span>
                        <h2 id="program-list-heading">Pick one track. We will build with you.</h2>
                    </div>
                    <div className="programs-grid">
                        {programs.map((program) => (
                            <article key={program.title} className="programs-card">
                                <div className="programs-icon">
                                    <Icon path={program.icon} size={1.1} />
                                </div>
                                <h3>{program.title}</h3>
                                <p>{program.summary}</p>
                                <p className="programs-detail">{program.details}</p>
                                <span>{program.audience}</span>
                                <Link to="/programs/apply" className="programs-card-link">
                                    Apply for this
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="programs-process">
                    <div className="programs-section-head">
                        <span className="programs-section-label">How we move</span>
                        <h2>We act fast, locally, and with proof.</h2>
                    </div>
                    <div className="programs-steps">
                        <article className="programs-step">
                            <div className="programs-step-icon">
                                <Icon path={mdiBullhorn} size={1} />
                            </div>
                            <h3>1. You tell us where you fit.</h3>
                            <p>Pick a track, role, and location.</p>
                        </article>
                        <article className="programs-step">
                            <div className="programs-step-icon">
                                <Icon path={mdiSchoolOutline} size={1} />
                            </div>
                            <h3>2. We match you to the right program.</h3>
                            <p>We align your interest with delivery, training, or chapter work.</p>
                        </article>
                        <article className="programs-step">
                            <div className="programs-step-icon">
                                <Icon path={mdiAccountGroupOutline} size={1} />
                            </div>
                            <h3>3. We start local execution.</h3>
                            <p>We move with schools, workers, and communities on the ground.</p>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Programs
