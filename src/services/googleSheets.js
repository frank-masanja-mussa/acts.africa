// Google Sheets API Integration
// This file contains utilities for connecting to Google Sheets API

// Configuration for Google Sheets API
const GOOGLE_SHEETS_CONFIG = {
  // These would be your actual Google Sheets API credentials
  API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  SPREADSHEET_ID: import.meta.env.VITE_GOOGLE_SHEETS_ID || '',
  WEBAPP_URL: import.meta.env.VITE_SHEETS_WEBAPP_URL || '',
  RANGES: {
    IMPACT_METRICS: 'Impact Metrics!A1:Z100',
    STUDENT_DATA: 'Student Data!A1:Z100',
    SCHOOL_DATA: 'School Data!A1:Z100',
    FUNDING_DATA: 'Funding Data!A1:Z100',
    SURVEY_RESPONSES: 'Survey Responses!A1:N20000'
  }
}

// Base URL for Google Sheets API
const GOOGLE_SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets'

/**
 * Fetch data from Google Sheets
 * @param {string} range - The range to fetch (e.g., 'Sheet1!A1:Z100')
 * @returns {Promise<Object>} The fetched data
 */
export const fetchGoogleSheetsData = async (range) => {
  try {
    // Prefer Apps Script Web App if configured
    if (GOOGLE_SHEETS_CONFIG.WEBAPP_URL) {
      const url = `${GOOGLE_SHEETS_CONFIG.WEBAPP_URL}?range=${encodeURIComponent(range)}`
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`Apps Script error: ${response.status}`)
      }
      const data = await response.json()
      // Expecting { values: [...] } compatible with Sheets API
      return data
    }

    // Fallback to direct Sheets API using API key
    if (!GOOGLE_SHEETS_CONFIG.API_KEY || !GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      console.warn('Google Sheets credentials not configured (WEBAPP_URL or API key/ID). Using mock data.')
      throw new Error('Google Sheets credentials not configured')
    }

    const url = `${GOOGLE_SHEETS_API_BASE}/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_CONFIG.API_KEY}`
    const response = await fetch(url, { cache: 'no-store' })
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error)
    throw error
  }
}

/**
 * Parse Google Sheets data into structured format
 * @param {Object} rawData - Raw data from Google Sheets API
 * @returns {Array<Object>} Parsed data array
 */
export const parseSheetsData = (rawData) => {
  if (!rawData.values || rawData.values.length === 0) {
    return []
  }
  
  const [headers, ...rows] = rawData.values
  return rows
    .filter(row => row.some(cell => String(cell || '').trim() !== ''))
    .map(row => {
    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = row[index] || ''
    })
    return obj
  })
}

/**
 * Get impact metrics from Google Sheets
 * @returns {Promise<Object>} Impact metrics data
 */
export const getImpactMetrics = async () => {
  try {
    const data = await fetchGoogleSheetsData(GOOGLE_SHEETS_CONFIG.RANGES.IMPACT_METRICS)
    const parsedData = parseSheetsData(data)
    
    // Find the latest entry (assuming data is sorted by date)
    const latestEntry = parsedData[parsedData.length - 1] || {}
    
    return {
      studentsReached: parseInt(latestEntry.studentsReached) || 0,
      schoolsParticipating: parseInt(latestEntry.schoolsParticipating) || 0,
      teachersTrained: parseInt(latestEntry.teachersTrained) || 0,
      communityShowcases: parseInt(latestEntry.communityShowcases) || 0,
      workforcePlacements: parseInt(latestEntry.workforcePlacements) || 0,
      fundingRaised: parseFloat(latestEntry.fundingRaised) || 0,
      chaptersActive: parseInt(latestEntry.chaptersActive) || 0,
      lastUpdated: latestEntry.timestamp || new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching impact metrics:', error)
    throw error
  }
}

/**
 * Get student data from Google Sheets
 * @returns {Promise<Array<Object>>} Student data array
 */
export const getStudentData = async () => {
  try {
    const data = await fetchGoogleSheetsData(GOOGLE_SHEETS_CONFIG.RANGES.STUDENT_DATA)
    return parseSheetsData(data)
  } catch (error) {
    console.error('Error fetching student data:', error)
    throw error
  }
}

/**
 * Get school data from Google Sheets
 * @returns {Promise<Array<Object>>} School data array
 */
export const getSchoolData = async () => {
  try {
    const data = await fetchGoogleSheetsData(GOOGLE_SHEETS_CONFIG.RANGES.SCHOOL_DATA)
    return parseSheetsData(data)
  } catch (error) {
    console.error('Error fetching school data:', error)
    throw error
  }
}

/**
 * Get funding data from Google Sheets
 * @returns {Promise<Array<Object>>} Funding data array
 */
export const getFundingData = async () => {
  try {
    const data = await fetchGoogleSheetsData(GOOGLE_SHEETS_CONFIG.RANGES.FUNDING_DATA)
    return parseSheetsData(data)
  } catch (error) {
    console.error('Error fetching funding data:', error)
    throw error
  }
}

/**
 * Get survey responses from Google Sheets
 * @returns {Promise<Array<Object>>} Survey responses array
 */
export const getSurveyResponses = async () => {
  try {
    const data = await fetchGoogleSheetsData(GOOGLE_SHEETS_CONFIG.RANGES.SURVEY_RESPONSES)
    return parseSheetsData(data)
  } catch (error) {
    console.error('Error fetching survey responses:', error)
    throw error
  }
}

/**
 * Export data to CSV format
 * @param {Array<Object>} data - Data to export
 * @param {string} filename - Name of the CSV file
 */
export const exportToCSV = (data, filename = 'acts-africa-data.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Get Google Sheets URL for direct access
 * @returns {string} Google Sheets URL
 */
export const getGoogleSheetsURL = () => {
  return `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/edit`
}


/**
 * Write data to Google Sheets via Apps Script Web App
 * @param {string} sheetName - Name of the sheet to write to
 * @param {Array<Array>} rows - Array of rows to append
 * @returns {Promise<Object>} Response with status and inserted count
 */
export const writeToGoogleSheets = async (sheetName, rows) => {
  try {
    if (!GOOGLE_SHEETS_CONFIG.WEBAPP_URL) {
      throw new Error('Google Sheets Web App URL not configured')
    }

    const token = import.meta.env.VITE_SHEETS_WRITE_TOKEN || ''
    if (!token) {
      throw new Error('Write token not configured')
    }

    const url = `${GOOGLE_SHEETS_CONFIG.WEBAPP_URL}?token=${encodeURIComponent(token)}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheet: sheetName,
        rows: rows
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Write failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error writing to Google Sheets:', error)
    throw error
  }
}

/**
 * Update impact metrics in Google Sheets
 * @param {Object} metrics - Impact metrics object
 * @returns {Promise<Object>} Response from write operation
 */
export const updateImpactMetrics = async (metrics) => {
  const now = new Date().toISOString()
  const row = [
    now,
    metrics.studentsReached || 0,
    metrics.schoolsParticipating || 0,
    metrics.teachersTrained || 0,
    metrics.communityShowcases || 0,
    metrics.workforcePlacements || 0,
    metrics.fundingRaised || 0,
    metrics.chaptersActive || 0,
    now
  ]
  
  return writeToGoogleSheets('Impact Metrics', [row])
}

/**
 * Add student data to Google Sheets
 * @param {Object} student - Student data object
 * @returns {Promise<Object>} Response from write operation
 */
export const addStudentData = async (student) => {
  const row = [
    student.studentId || '',
    student.name || '',
    student.school || '',
    student.grade || '',
    student.aiLiteracyScore || 0,
    student.region || '',
    student.enrollmentDate || new Date().toISOString(),
    student.status || 'Active'
  ]
  
  return writeToGoogleSheets('Student Data', [row])
}

/**
 * Add school data to Google Sheets
 * @param {Object} school - School data object
 * @returns {Promise<Object>} Response from write operation
 */
export const addSchoolData = async (school) => {
  const row = [
    school.schoolId || '',
    school.schoolName || '',
    school.region || '',
    school.studentsCount || 0,
    school.teachersCount || 0,
    school.partnershipDate || new Date().toISOString(),
    school.status || 'Active'
  ]
  
  return writeToGoogleSheets('School Data', [row])
}

/**
 * Add funding data to Google Sheets
 * @param {Object} funding - Funding data object
 * @returns {Promise<Object>} Response from write operation
 */
export const addFundingData = async (funding) => {
  const row = [
    funding.date || new Date().toISOString(),
    funding.source || '',
    funding.amount || 0,
    funding.purpose || '',
    funding.status || 'Pending',
    funding.notes || ''
  ]
  
  return writeToGoogleSheets('Funding Data', [row])
}

/**
 * Determine whether Google Sheets connectivity is configured
 * Prefers Apps Script Web App; falls back to API key + Spreadsheet ID
 * @returns {boolean}
 */
export const isGoogleSheetsConfigured = () => {
  if (GOOGLE_SHEETS_CONFIG.WEBAPP_URL && GOOGLE_SHEETS_CONFIG.WEBAPP_URL.trim() !== '') return true
  if (
    GOOGLE_SHEETS_CONFIG.API_KEY && GOOGLE_SHEETS_CONFIG.API_KEY.trim() !== '' &&
    GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID && GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID.trim() !== ''
  ) return true
  return false
}
