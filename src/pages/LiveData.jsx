import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { 
  mdiChartLine, 
  mdiTrendingUp, 
  mdiAccountGroup, 
  mdiPulse, 
  mdiRefresh,
  mdiDatabase,
  mdiTable,
  mdiDownload,
  mdiEye,
  mdiAlertCircle,
  mdiCheckCircle
} from '@mdi/js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CountriesAnalytics from '../components/CountriesAnalytics'
import { getImpactMetrics, getMockData, exportToCSV, getGoogleSheetsURL } from '../utils/googleSheets'
import './LiveData.css'

const LiveData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [data, setData] = useState({
    studentsReached: 0,
    schoolsParticipating: 0,
    teachersTrained: 0,
    communityShowcases: 0,
    communityShowcases: 0,
    workforcePlacements: 0,
    fundingRaised: 0,
    chaptersActive: 0
  })
  const [surveyData, setSurveyData] = useState({
    totalResponses: 0,
    countries: [],
    lastSurveyUpdate: null
  })

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')
        
        // For now, show that we're waiting for Google Sheets integration
        // This will be replaced with actual survey data once Google Sheets is configured
        setData({
          studentsReached: 0,
          schoolsParticipating: 0,
          teachersTrained: 0,
          communityShowcases: 0,
          communityShowcases: 0,
          workforcePlacements: 0,
          fundingRaised: 0,
          chaptersActive: 0
        })
        
        setSurveyData({
          totalResponses: 0,
          countries: [],
          lastSurveyUpdate: null
        })
        
        setLastUpdated(Date.now())
      } catch (err) {
        setError('Failed to fetch live data. Please try again later.')
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

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  const handleExportCSV = () => {
    const exportData = [{
      'Students Reached': data.studentsReached,
      'Schools Participating': data.schoolsParticipating,
      'Teachers Trained': data.teachersTrained,
      'AI Clubs Formed': data.communityShowcases,
      'Community Showcases': data.communityShowcases,
      'Workforce Placements': data.workforcePlacements,
      'Funding Raised': data.fundingRaised,
      'Active Chapters': data.chaptersActive,
      'Last Updated': lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'
    }]
    
    exportToCSV(exportData, 'acts-africa-impact-metrics.csv')
  }

  const handleViewInSheets = () => {
    window.open(getGoogleSheetsURL(), '_blank')
  }

  if (loading) {
    return (
      <div className="live-data-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner">
            <Icon path={mdiRefresh} size={2} className="spinning" />
          </div>
          <p>Loading live data from Google Sheets...</p>
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
          <Icon path={mdiAlertCircle} size={3} />
          <h2>Data Unavailable</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            <Icon path={mdiRefresh} size={1} />
            Retry
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="live-data-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="live-data-hero">
        <div className="hero-content">
          <h1 className="hero-title">Survey Data Analytics</h1>
          <p className="hero-subtitle">
            Real-time insights from our AI Literacy & Appropriate Technology Needs survey
          </p>
          <div className="hero-status">
            <div className="status-indicator">
              <Icon path={mdiAlertCircle} size={1} />
              <span>Google Sheets Integration Pending</span>
            </div>
            {lastUpdated && (
              <div className="last-updated">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Data Ticker */}
      <section className="live-ticker-section">
        <div className="live-ticker-container">
          <div className="live-indicator">
            <div className="live-dot"></div>
            <Icon path={mdiPulse} size={0.8} />
            <span>Live Data</span>
          </div>
          <div className="ticker-content">
            <span>Survey responses: {surveyData.totalResponses}</span>
            <span>• Countries: {surveyData.countries.length}</span>
            <span>• Last update: {surveyData.lastSurveyUpdate ? new Date(surveyData.lastSurveyUpdate).toLocaleString() : 'Pending'}</span>
            <span>• Data refreshes every 5 minutes</span>
          </div>
        </div>
      </section>

      {/* Main Analytics Dashboard */}
      <section className="analytics-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>AI Literacy Survey Analytics</h2>
            <p>Real-time data from our Tanzania AI Literacy & Appropriate Technology Needs survey</p>
            <div className="data-source">
              <Icon path={mdiTable} size={1} />
              <span>Survey data from Google Sheets</span>
            </div>
          </div>

          {/* Survey Data Status */}
          <div className="survey-status-card">
            <div className="status-content">
              <Icon path={mdiAlertCircle} size={2} />
              <h3>Survey Data Integration Pending</h3>
              <p>We're currently setting up Google Sheets integration to display real survey responses from our Tanzania AI Literacy & Appropriate Technology Needs survey.</p>
              <p>Once configured, you'll see live data including:</p>
              <ul>
                <li>Total survey responses by country</li>
                <li>AI understanding levels across demographics</li>
                <li>Internet access patterns</li>
                <li>Learning barriers and preferences</li>
                <li>Willingness to join AI education programs</li>
              </ul>
            </div>
          </div>

          {/* Key Metrics Grid - Hidden for now */}
          <div className="metrics-grid" style={{display: 'none'}}>
            <div className="metric-card primary">
              <div className="metric-icon">
                <Icon path={mdiAccountGroup} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Students Reached</h3>
                <div className="metric-value">{formatNumber(data.studentsReached)}</div>
                <p className="metric-description">Total students educated in AI literacy</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiDatabase} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Schools Participating</h3>
                <div className="metric-value">{data.schoolsParticipating}</div>
                <p className="metric-description">Secondary schools in our program</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiTrendingUp} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Teachers Trained</h3>
                <div className="metric-value">{formatNumber(data.teachersTrained)}</div>
                <p className="metric-description">Educators equipped with AI knowledge</p>
              </div>
            </div>

            <div className="metric-card highlight">
              <div className="metric-icon">
                <Icon path={mdiChartLine} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Community Showcases</h3>
                <div className="metric-value">{data.communityShowcases}</div>
                <p className="metric-description">Community showcases of AI projects</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiEye} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Community Showcases</h3>
                <div className="metric-value">{data.communityShowcases}</div>
                <p className="metric-description">Public demonstrations held</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiPulse} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Workforce Placements</h3>
                <div className="metric-value">{data.workforcePlacements}</div>
                <p className="metric-description">Students placed in AI-related roles</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiRefresh} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Funding Raised</h3>
                <div className="metric-value">{formatCurrency(data.fundingRaised)}</div>
                <p className="metric-description">Total funding secured</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Icon path={mdiDatabase} size={1.5} />
              </div>
              <div className="metric-content">
                <h3>Active Chapters</h3>
                <div className="metric-value">{data.chaptersActive}</div>
                <p className="metric-description">Chapters currently operating</p>
              </div>
            </div>
          </div>

          {/* Data Export Section */}
          <div className="export-section">
            <h3>Export Data</h3>
            <p>Download our live data for your own analysis</p>
            <div className="export-buttons">
              <button className="export-btn" onClick={handleExportCSV}>
                <Icon path={mdiDownload} size={1} />
                Download CSV
              </button>
              <button className="export-btn" onClick={handleViewInSheets}>
                <Icon path={mdiTable} size={1} />
                View in Google Sheets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Analytics Section */}
      <section className="countries-section">
        <div className="dashboard-container">
          <CountriesAnalytics />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LiveData
