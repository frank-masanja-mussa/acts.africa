import React, { useState, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiRefresh, mdiChartLineVariant } from '@mdi/js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SurveyAnalytics from '../components/SurveyAnalytics'
import { getSurveyResponses, isGoogleSheetsConfigured } from '../utils/googleSheets'
import './LiveData.css'

const LiveData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [surveyData, setSurveyData] = useState({
    totalResponses: 0,
    countries: [],
    lastSurveyUpdate: null
  })
  const [surveyResponses, setSurveyResponses] = useState([])

  // Fetch survey responses
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const configured = isGoogleSheetsConfigured()
        if (!configured) {
          throw new Error('Google Sheets integration not configured. Please set up environment variables.')
        }

        try {
          const responses = await getSurveyResponses()
          const tanzaniaResponses = responses.filter(r => (r.country || '').toString().trim().toLowerCase() === 'tanzania')
          setSurveyResponses(tanzaniaResponses)
          setSurveyData({
            totalResponses: tanzaniaResponses.length,
            countries: ['Tanzania'],
            lastSurveyUpdate: tanzaniaResponses.length > 0 ? 
              new Date(tanzaniaResponses[tanzaniaResponses.length - 1].timestamp).getTime() : 
              null
          })
        } catch (surveyError) {
          console.warn('Survey data not available yet:', surveyError)
          setSurveyData(prev => ({ ...prev }))
          setSurveyResponses([])
        }

        setLastUpdated(Date.now())
      } catch (err) {
        console.error('Error fetching live data:', err)
        if (err.message.includes('not configured')) {
          setError('Google Sheets integration not configured. Please contact the administrator.')
        } else if (err.message.includes('API error')) {
          setError('Unable to connect to Google Sheets. Please check your internet connection and try again.')
        } else {
          setError('Failed to fetch live data. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const responses = await getSurveyResponses()
      const tanzaniaResponses = responses.filter(r => (r.country || '').toString().trim().toLowerCase() === 'tanzania')
      setSurveyResponses(tanzaniaResponses)
      setSurveyData({
        totalResponses: tanzaniaResponses.length,
        countries: ['Tanzania'],
        lastSurveyUpdate: tanzaniaResponses.length > 0 ? 
          new Date(tanzaniaResponses[tanzaniaResponses.length - 1].timestamp).getTime() : 
          null
      })
      setLastUpdated(Date.now())
    } catch (err) {
      console.error('Error refreshing data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !surveyResponses.length) {
    return (
      <div className="live-data-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading survey analytics...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="live-data-page">
        <Navbar />
        <div className="error-container">
          <h2>Unable to Load Data</h2>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="live-data-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="analytics-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <Icon path={mdiChartLineVariant} size={3} />
          </div>
          <h1>Survey Analytics Dashboard</h1>
          <p>Real-time insights from Tanzania AI Literacy & Appropriate Technology Needs survey</p>
          
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-value">{surveyData.totalResponses}</div>
              <div className="stat-label">Total Responses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{surveyData.countries.length}</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}
              </div>
              <div className="stat-label">Last Updated</div>
            </div>
          </div>
        </div>
        
        <div className="refresh-section">
          <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
            <Icon path={mdiRefresh} size={1} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </section>

      {/* Main Analytics Section */}
      <SurveyAnalytics surveyData={surveyResponses} />

      <Footer />
    </div>
  )
}

export default LiveData
