import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  getImpactMetrics, 
  updateImpactMetrics,
  isGoogleSheetsConfigured,
  getGoogleSheetsURL 
} from '../utils/googleSheets'

const TestConnection = () => {
  const [testResults, setTestResults] = useState([])
  const [loading, setLoading] = useState(false)

  const addResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toISOString() }])
  }

  const runTests = async () => {
    setTestResults([])
    setLoading(true)

    // Test 1: Check environment variables
    addResult('Environment Variables', 'info', 'Checking configuration...')
    const isConfigured = isGoogleSheetsConfigured()
    
    const webAppUrl = import.meta.env.VITE_SHEETS_WEBAPP_URL
    const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID
    const writeToken = import.meta.env.VITE_SHEETS_WRITE_TOKEN

    addResult(
      'Environment Variables',
      isConfigured ? 'success' : 'error',
      isConfigured ? 'All required variables are set' : 'Missing required variables',
      {
        VITE_SHEETS_WEBAPP_URL: webAppUrl ? '✅ Set' : '❌ Missing',
        VITE_GOOGLE_SHEETS_ID: spreadsheetId ? '✅ Set' : '❌ Missing',
        VITE_SHEETS_WRITE_TOKEN: writeToken ? '✅ Set' : '❌ Missing'
      }
    )

    if (!isConfigured) {
      setLoading(false)
      return
    }

    // Test 2: Direct API call
    addResult('Direct API Call', 'info', 'Testing direct connection to Apps Script...')
    try {
      const testUrl = `${webAppUrl}?range=Impact%20Metrics!A1:B2`
      const response = await fetch(testUrl)
      const data = await response.json()
      
      if (response.ok && data.values) {
        addResult(
          'Direct API Call',
          'success',
          `Successfully fetched data. Got ${data.values.length} rows`,
          data
        )
      } else {
        addResult('Direct API Call', 'error', 'API returned unexpected format', data)
      }
    } catch (error) {
      addResult('Direct API Call', 'error', error.message)
    }

    // Test 3: getImpactMetrics function
    addResult('getImpactMetrics()', 'info', 'Testing impact metrics function...')
    try {
      const metrics = await getImpactMetrics()
      addResult(
        'getImpactMetrics()',
        'success',
        'Successfully parsed impact metrics',
        metrics
      )
    } catch (error) {
      addResult('getImpactMetrics()', 'error', error.message)
    }

    // Test 4: Write test (optional)
    addResult('Write Test', 'info', 'Testing write functionality...')
    try {
      const testMetrics = {
        studentsReached: 9999,
        schoolsParticipating: 99,
        teachersTrained: 999,
        communityShowcases: 99,
        workforcePlacements: 999,
        fundingRaised: 999999,
        chaptersActive: 9
      }
      
      const writeResult = await updateImpactMetrics(testMetrics)
      addResult(
        'Write Test',
        'success',
        `Successfully wrote test data. Inserted ${writeResult.inserted} row(s)`,
        writeResult
      )
    } catch (error) {
      addResult('Write Test', 'error', error.message)
    }

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ 
        flex: 1, 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '20px' }}>Google Sheets Connection Test</h1>
        
        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={runTests}
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#d2691e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {loading ? 'Running Tests...' : 'Run Connection Tests'}
          </button>
          
          <a
            href={getGoogleSheetsURL()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4a5568',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Open Spreadsheet
          </a>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Environment Variables Status:</h3>
          <pre style={{ 
            background: '#1a1a1a', 
            color: '#f5f5dc', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify({
              VITE_SHEETS_WEBAPP_URL: import.meta.env.VITE_SHEETS_WEBAPP_URL || 'NOT SET',
              VITE_GOOGLE_SHEETS_ID: import.meta.env.VITE_GOOGLE_SHEETS_ID || 'NOT SET',
              VITE_SHEETS_WRITE_TOKEN: import.meta.env.VITE_SHEETS_WRITE_TOKEN ? 'SET (hidden)' : 'NOT SET'
            }, null, 2)}
          </pre>
        </div>

        {testResults.length > 0 && (
          <div>
            <h3>Test Results:</h3>
            {testResults.map((result, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  borderRadius: '4px',
                  backgroundColor: 
                    result.status === 'success' ? '#1a4d2e' :
                    result.status === 'error' ? '#4d1a1a' :
                    '#2a2a2a',
                  border: `2px solid ${
                    result.status === 'success' ? '#2ecc71' :
                    result.status === 'error' ? '#e74c3c' :
                    '#95a5a6'
                  }`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    fontSize: '24px', 
                    marginRight: '10px' 
                  }}>
                    {result.status === 'success' ? '✅' : 
                     result.status === 'error' ? '❌' : 
                     '⏳'}
                  </span>
                  <strong style={{ fontSize: '18px' }}>{result.test}</strong>
                </div>
                
                <p style={{ margin: '10px 0' }}>{result.message}</p>
                
                {result.data && (
                  <details style={{ marginTop: '10px' }}>
                    <summary style={{ cursor: 'pointer', color: '#d2691e' }}>
                      View Details
                    </summary>
                    <pre style={{ 
                      background: '#0a0a0a', 
                      padding: '10px', 
                      borderRadius: '4px',
                      overflow: 'auto',
                      marginTop: '10px',
                      fontSize: '12px'
                    }}>
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
                
                <small style={{ color: '#95a5a6' }}>
                  {new Date(result.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

export default TestConnection

