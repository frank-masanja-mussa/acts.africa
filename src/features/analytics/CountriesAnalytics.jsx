import { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import Icon from '@mdi/react'
import {
    mdiAccountGroup,
    mdiTrendingUp
} from '@mdi/js'
import './CountriesAnalytics.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const CountriesAnalytics = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [surveyData, setSurveyData] = useState({
        tanzania: {
            totalResponses: 0,
            internetAccess: { daily: 0, sometimes: 0, rarely: 0, never: 0 },
            aiUnderstanding: { 'very-well': 0, 'somewhat': 0, 'very-little': 0, 'not-at-all': 0 },
            ageGroups: { 'under-15': 0, '15-20': 0, '21-30': 0, 'over-30': 0 },
            barriers: { 'lack-devices': 0, 'language-barriers': 0, 'lack-teachers': 0, 'internet-cost': 0, 'other': 0 },
            topics: { 'internet-safety': 0, 'basic-coding': 0, 'ai-daily-life': 0, 'entrepreneurship-ai': 0 },
            joinClub: { yes: 0, no: 0 },
            learningPreference: { online: 0, 'in-person': 0, both: 0 }
        }
    })

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setLoading(true)
                setError('')

                // TODO: Implement actual Google Sheets integration for survey data
                // This will be populated from actual Google Sheets survey responses
                setSurveyData({
                    tanzania: {
                        totalResponses: 0,
                        internetAccess: { daily: 0, sometimes: 0, rarely: 0, never: 0 },
                        aiUnderstanding: { 'very-well': 0, 'somewhat': 0, 'very-little': 0, 'not-at-all': 0 },
                        ageGroups: { 'under-15': 0, '15-20': 0, '21-30': 0, 'over-30': 0 },
                        barriers: { 'lack-devices': 0, 'language-barriers': 0, 'lack-teachers': 0, 'internet-cost': 0, 'other': 0 },
                        topics: { 'internet-safety': 0, 'basic-coding': 0, 'ai-daily-life': 0, 'entrepreneurship-ai': 0 },
                        joinClub: { yes: 0, no: 0 },
                        learningPreference: { online: 0, 'in-person': 0, both: 0 }
                    }
                })
            } catch (err) {
                setError('Failed to load survey data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchSurveyData()
    }, [])

    if (loading) {
        return (
            <div className="countries-analytics loading">
                <div className="loading-spinner">
                    <Icon path={mdiTrendingUp} size={2} className="spinning" />
                </div>
                <p>Loading survey analytics...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="countries-analytics error">
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="countries-analytics">
            <div className="countries-header">
                <h2>Tanzania Survey Analytics</h2>
                <p>AI Literacy & Appropriate Technology Needs survey data</p>
            </div>

            <div className="survey-status-card">
                <div className="status-content">
                    <Icon path={mdiAccountGroup} size={2} />
                    <h3>Survey Data Integration Pending</h3>
                    <p>We&apos;re currently setting up Google Sheets integration to display real survey responses from our Tanzania AI Literacy & Appropriate Technology Needs survey.</p>
                    <p>Once configured, you&apos;ll see live data including:</p>
                    <ul>
                        <li>Total survey responses from Tanzania</li>
                        <li>AI understanding levels across age groups</li>
                        <li>Internet access patterns</li>
                        <li>Learning barriers and preferences</li>
                        <li>Willingness to join AI education programs</li>
                        <li>Learning preferences (online vs in-person)</li>
                    </ul>
                </div>
            </div>

            {/* This section will show real data once Google Sheets is integrated */}
            <div className="data-placeholder" style={{ display: 'none' }}>
                <div className="country-dashboard">
                    <div className="country-header">
                        <span className="country-flag">🇹🇿</span>
                        <h3 className="country-name">Tanzania</h3>
                        <span className="total-responses">{surveyData.tanzania.totalResponses.toLocaleString()} Responses</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountriesAnalytics
