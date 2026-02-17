import React, { useState, useEffect } from 'react'
import Navbar from '../../core/components/Navbar'
import Footer from '../../core/components/Footer'
import SurveyAnalytics from './SurveyAnalytics'
import { getSurveyResponses, isGoogleSheetsConfigured } from '../../services/googleSheets'
import './LiveData.css'
import Icon from '@mdi/react'
import { mdiChartTimelineVariant, mdiAlertCircle, mdiRefresh, mdiDatabase } from '@mdi/js'

const LiveData = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isConfigured, setIsConfigured] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError('')

            // Check if Google Sheets is configured
            if (!isGoogleSheetsConfigured()) {
                setIsConfigured(false)
                setLoading(false)
                return
            }

            setIsConfigured(true)
            const responses = await getSurveyResponses()
            setData(responses)
        } catch (err) {
            console.error('Error fetching survey data:', err)
            setError('Failed to fetch live survey data. Please check your connection or try again later.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="live-data-page">
            <Navbar />

            <main>
                <section className="analytics-hero">
                    <div className="hero-content">
                        <div className="hero-icon">
                            <Icon path={mdiChartTimelineVariant} size={4} />
                        </div>
                        <h1>Live Insights</h1>
                        <p>Real-time analysis of our AI Literacy & Appropriate Technology Needs survey. Your responses help us shape the future of African tech education.</p>

                        <div className="stats-overview">
                            <div className="stat-card">
                                <div className="stat-value">{data.length}</div>
                                <div className="stat-label">Total Responses</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">Tanzania</div>
                                <div className="stat-label">Current Region</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">Live</div>
                                <div className="stat-label">Data Status</div>
                            </div>
                        </div>

                        <div className="refresh-section">
                            <button
                                className="refresh-btn"
                                onClick={fetchData}
                                disabled={loading}
                            >
                                <Icon path={mdiRefresh} size={1} />
                                {loading ? 'Refreshing...' : 'Refresh Data'}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="analytics-content">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Fetching real-time data from Google Sheets...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <Icon path={mdiAlertCircle} size={3} />
                            <h2>Oops! Something went wrong</h2>
                            <p>{error}</p>
                            <button className="primary-btn" onClick={fetchData}>Try Again</button>
                        </div>
                    ) : !isConfigured ? (
                        <div className="error-container">
                            <Icon path={mdiDatabase} size={3} />
                            <h2>Connectivity Required</h2>
                            <p>Live data dashboard requires Google Sheets API configuration. If you're a developer, please check your environment variables.</p>
                            <div className="setup-guide">
                                <h3>Required Environment Variables:</h3>
                                <code>VITE_GOOGLE_SHEETS_ID</code><br />
                                <code>VITE_GOOGLE_API_KEY</code>
                            </div>
                        </div>
                    ) : (
                        <SurveyAnalytics surveyData={data} />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default LiveData
