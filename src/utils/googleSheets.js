// Google Sheets API Integration
// This file contains utilities for connecting to Google Sheets API

// Configuration for Google Sheets API
const GOOGLE_SHEETS_CONFIG = {
  // These would be your actual Google Sheets API credentials
  API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  SPREADSHEET_ID: import.meta.env.VITE_GOOGLE_SHEETS_ID || '',
  RANGES: {
    IMPACT_METRICS: 'Impact Metrics!A1:Z100',
    STUDENT_DATA: 'Student Data!A1:Z100',
    SCHOOL_DATA: 'School Data!A1:Z100',
    FUNDING_DATA: 'Funding Data!A1:Z100'
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
    // Check if API credentials are available
    if (!GOOGLE_SHEETS_CONFIG.API_KEY || !GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      console.warn('Google Sheets API credentials not configured. Using mock data.')
      throw new Error('API credentials not configured')
    }

    const url = `${GOOGLE_SHEETS_API_BASE}/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_CONFIG.API_KEY}`
    
    const response = await fetch(url)
    
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
  return rows.map(row => {
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
    // Return mock data if API fails or credentials not configured
    return getMockData()
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
    // Return empty array if API fails or credentials not configured
    return []
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
    // Return empty array if API fails or credentials not configured
    return []
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
    // Return empty array if API fails or credentials not configured
    return []
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

// Mock data for development/testing
export const getMockData = () => {
  return {
    studentsReached: Math.floor(Math.random() * 5000) + 8000,
    schoolsParticipating: Math.floor(Math.random() * 20) + 35,
    teachersTrained: Math.floor(Math.random() * 200) + 300,
    communityShowcases: Math.floor(Math.random() * 10) + 15,
    workforcePlacements: Math.floor(Math.random() * 50) + 75,
    fundingRaised: Math.floor(Math.random() * 50000) + 150000,
    chaptersActive: Math.floor(Math.random() * 3) + 2,
    lastUpdated: new Date().toISOString()
  }
}
