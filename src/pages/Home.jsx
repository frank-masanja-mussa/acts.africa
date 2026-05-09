
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import {
    mdiArrowRight,
    mdiBullhorn,
    mdiChartTimelineVariant,
    mdiSchoolOutline,
    mdiAccountGroupOutline,
    mdiMapMarkerRadiusOutline,
    mdiScaleBalance,
    mdiRocketLaunchOutline
} from '@mdi/js'
import './Home.css'
import Navbar from '../core/components/Navbar'
import Footer from '../core/components/Footer'

const shortcuts = [
    {
        title: 'Join a program',
        description: 'Step into the next rollout.',
        to: '/programs/apply',
        icon: mdiRocketLaunchOutline
    },
    {
        title: 'See what opens next',
        description: 'Follow the next tracks.',
        to: '/programs',
        icon: mdiBullhorn
    },
    {
        title: 'Bring ACTS here',
        description: 'Start local delivery.',
        to: '/start-chapter',
        icon: mdiMapMarkerRadiusOutline
    },
    {
        title: 'Follow the signal',
        description: 'See the live field data.',
        to: '/live-data',
        icon: mdiChartTimelineVariant
    }
]

const programs = [
    {
        title: 'Katavi expansion',
        description: 'We take the pilot deeper.',
        audience: 'Schools, districts, local hosts'
    },
    {
        title: 'Train-the-Trainer academy',
        description: 'We prepare local facilitators.',
        audience: 'Teachers, facilitators, youth leaders'
    },
    {
        title: 'Working-class AI clinics',
        description: 'We make AI useful for daily work.',
        audience: 'Worker groups, associations, cooperatives'
    },
    {
        title: 'Chapter launch network',
        description: 'We open new ACTS nodes.',
        audience: 'Campuses, cities, community organizations'
    }
]

const campaignPhotos = [
    {
        src: '/campaign/campaign-group.jpeg',
        alt: 'ACTS Africa campaign team and students standing together during the Katavi campaign.'
    },
    {
        src: '/campaign/campaign-portrait.jpeg',
        alt: 'ACTS Africa team member wearing a campaign shirt during the Katavi campaign.'
    },
    {
        src: '/campaign/img-3542-web.png',
        alt: 'ACTS Africa campaign participants and students gathered together during the campaign.'
    },
    {
        src: '/campaign/img-2055-web.png',
        alt: 'ACTS Africa team members walking together in campaign shirts.'
    }
]

const partners = [
    {
        name: 'Daven.ai',
        image: '/partners/daven.png',
        href: 'https://daven.ai/'
    },
    {
        name: 'University of Dar es Salaam',
        image: '/partners/udsm.png',
        href: 'https://www.udsm.ac.tz/'
    },
    {
        name: 'Voice of Calling',
        image: '/partners/voice-of-calling.png',
        href: 'https://voiceofcalling.weebly.com/'
    },
    {
        name: 'Brocken Technologies',
        image: '/partners/brocken.svg',
        href: 'https://brockentechnologies.org/'
    },
    {
        name: 'KITL',
        subtitle: 'Koola International Technologies Limited',
        image: '/partners/koola.svg',
        href: 'https://koola.app/'
    },
    {
        name: 'Stempia Computers',
        href: 'https://stempia.weebly.com/'
    },
    {
        name: 'Adducate.net',
        image: '/partners/adducate.svg',
        href: 'https://www.adducate.net/'
    }
]

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />

            <main className="home-main">
                <section className="hero-section">
                    <img
                        className="hero-photo"
                        src={campaignPhotos[0].src}
                        alt={campaignPhotos[0].alt}
                    />
                    <div className="hero-scrim" />
                    <div className="hero-content">
                        <span className="hero-eyebrow">ACTS AFRICA</span>
                        <h1 className="hero-title">We prepare working-class Africans for the AI economy.</h1>
                        <p className="hero-copy">
                            We teach. We organize. We influence.
                        </p>
                        <div className="hero-actions">
                            <Link to="/programs/apply" className="hero-primary">
                                Join ACTS
                            </Link>
                            <Link to="/tanzania-chapter" className="hero-secondary">
                                See the Katavi pilot
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="presence-section" aria-labelledby="presence-heading">
                    <div className="presence-copy">
                        <span className="section-kicker">Katavi</span>
                        <h2 id="presence-heading">We begin where people are.</h2>
                        <p>Schools. Teachers. Workers. Communities.</p>
                        <div className="proof-grid">
                            <article className="proof-card">
                                <strong>40</strong>
                                <span>schools reached</span>
                            </article>
                            <article className="proof-card">
                                <strong>7,530</strong>
                                <span>people engaged</span>
                            </article>
                            <article className="proof-card">
                                <strong>1</strong>
                                <span>pilot built to scale</span>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="campaign-moment" aria-label="ACTS campaign moments">
                    <div className="campaign-mosaic">
                        <div className="campaign-mosaic-main">
                            <img
                                src={campaignPhotos[3].src}
                                alt={campaignPhotos[3].alt}
                                className="campaign-moment-image landscape"
                            />
                        </div>
                        <div className="campaign-mosaic-stack">
                            <div className="campaign-moment-frame">
                                <img
                                    src={campaignPhotos[1].src}
                                    alt={campaignPhotos[1].alt}
                                    className="campaign-moment-image portrait"
                                />
                            </div>
                            <div className="campaign-moment-frame">
                                <img
                                    src={campaignPhotos[2].src}
                                    alt={campaignPhotos[2].alt}
                                    className="campaign-moment-image portrait"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="shortcut-section" aria-labelledby="shortcut-heading">
                    <div className="section-heading">
                        <span className="section-kicker">Start here</span>
                        <h2 id="shortcut-heading">Choose your way in.</h2>
                    </div>
                    <div className="shortcut-grid">
                        {shortcuts.map((item) => (
                            <Link key={item.title} to={item.to} className="shortcut-card">
                                <div className="shortcut-icon">
                                    <Icon path={item.icon} size={1.1} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <span className="shortcut-link">
                                    Open <Icon path={mdiArrowRight} size={0.8} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mandate-section" aria-labelledby="mandate-heading">
                    <div className="section-heading">
                        <span className="section-kicker">How we move</span>
                        <h2 id="mandate-heading">We teach. We organize. We influence.</h2>
                    </div>
                    <div className="mandate-grid">
                        <article className="mandate-card">
                            <div className="mandate-icon">
                                <Icon path={mdiSchoolOutline} size={1.1} />
                            </div>
                            <h3>We implement.</h3>
                            <p>We run the work on the ground.</p>
                        </article>
                        <article className="mandate-card">
                            <div className="mandate-icon">
                                <Icon path={mdiScaleBalance} size={1.1} />
                            </div>
                            <h3>We influence.</h3>
                            <p>We push for ethical, local, resilient AI.</p>
                        </article>
                        <article className="mandate-card">
                            <div className="mandate-icon">
                                <Icon path={mdiAccountGroupOutline} size={1.1} />
                            </div>
                            <h3>We stay community-led.</h3>
                            <p>We build for real conditions, not ideal ones.</p>
                        </article>
                    </div>
                </section>

                <section className="partners-section" aria-labelledby="partners-heading">
                    <div className="section-heading">
                        <span className="section-kicker">Trusted by</span>
                        <h2 id="partners-heading">Trusted by</h2>
                    </div>
                    <div className="partner-grid">
                        {partners.map((partner) => (
                            <a
                                key={partner.name}
                                href={partner.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`partner-card${partner.image ? '' : ' text-only'}`}
                                aria-label={partner.name}
                            >
                                {partner.image ? (
                                    <div className="partner-logo-wrap">
                                        <img src={partner.image} alt={`${partner.name} logo`} className="partner-logo" />
                                    </div>
                                ) : (
                                    <div className="partner-text-mark">SC</div>
                                )}
                                <div className="partner-meta">
                                    <strong>{partner.name}</strong>
                                    {partner.subtitle ? <span>{partner.subtitle}</span> : null}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="programs-section" aria-labelledby="programs-heading">
                    <div className="section-heading section-heading-split">
                        <div>
                            <span className="section-kicker">Upcoming programs</span>
                            <h2 id="programs-heading">Join what opens next.</h2>
                        </div>
                        <Link to="/programs" className="section-action">
                            View all programs
                        </Link>
                    </div>
                    <div className="program-grid">
                        {programs.map((program) => (
                            <article key={program.title} className="program-card">
                                <h3>{program.title}</h3>
                                <p>{program.description}</p>
                                <span>{program.audience}</span>
                                <Link to="/programs/apply" className="program-apply">
                                    Apply
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Home
