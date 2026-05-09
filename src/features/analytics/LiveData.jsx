import { useState, useEffect } from 'react'
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
                    <div className="live-data-hero-content">
                        <div className="live-data-hero-icon">
                            <Icon path={mdiChartTimelineVariant} size={4} />
                        </div>
                        <h1>Watch the signal.</h1>
                        <p>This is how ACTS listens before it scales. We read field responses, patterns, barriers, and demand in real time.</p>

                        <div className="live-data-stats-overview">
                            <div className="live-data-stat-card">
                                <div className="live-data-stat-value">{data.length}</div>
                                <div className="live-data-stat-label">Responses</div>
                            </div>
                            <div className="live-data-stat-card">
                                <div className="live-data-stat-value">Tanzania</div>
                                <div className="live-data-stat-label">Current focus</div>
                            </div>
                            <div className="live-data-stat-card">
                                <div className="live-data-stat-value">{isConfigured ? 'Live' : 'Setup'}</div>
                                <div className="live-data-stat-label">Signal</div>
                            </div>
                        </div>

                        <div className="live-data-refresh-section">
                            <button
                                className="live-data-refresh-btn"
                                onClick={fetchData}
                                disabled={loading}
                            >
                                <Icon path={mdiRefresh} size={1} />
                                {loading ? 'Refreshing...' : 'Refresh Signal'}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="analytics-content">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Pulling the latest field data from Google Sheets...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <Icon path={mdiAlertCircle} size={3} />
                            <h2>The live signal is unavailable.</h2>
                            <p>{error}</p>
                            <button className="primary-btn" onClick={fetchData}>Try Again</button>
                        </div>
                    ) : !isConfigured ? (
                        <div className="error-container">
                            <Icon path={mdiDatabase} size={3} />
                            <h2>Connect the data source.</h2>
                            <p>This dashboard needs Google Sheets configuration before it can show the Tanzania survey signal.</p>
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
