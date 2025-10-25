// ACTS Africa - Google Apps Script
// Copy this entire code into your Apps Script Code.gs file

// ===== CONFIGURATION =====
const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SPREADSHEET_ID';

// ===== ONE-TIME SETUP FUNCTION =====
function setupACTSAfrica() {
  // Create the main spreadsheet
  const ss = SpreadsheetApp.create('ACTS Africa - Live Data');
  const spreadsheetId = ss.getId();
  
  // Create all required sheets
  createImpactMetricsSheet(ss);
  createSurveyResponsesSheet(ss);
  createStudentDataSheet(ss);
  createSchoolDataSheet(ss);
  createFundingDataSheet(ss);
  createChapterDataSheet(ss);
  createAnalyticsSummarySheet(ss);
  
  // Add sample data
  addSampleData(ss);
  
  Logger.log('✅ ACTS Africa spreadsheet created successfully!');
  Logger.log('📊 Spreadsheet ID: ' + spreadsheetId);
  Logger.log('🔗 Spreadsheet URL: ' + ss.getUrl());
  Logger.log('📋 Copy the Spreadsheet ID and update SPREADSHEET_ID in this script');
  
  return spreadsheetId;
}

// ===== SHEET CREATION FUNCTIONS =====
function createImpactMetricsSheet(ss) {
  const sheet = ss.insertSheet('Impact Metrics');
  const headers = [
    'timestamp', 'studentsReached', 'schoolsParticipating', 'teachersTrained',
    'communityShowcases', 'workforcePlacements', 'fundingRaised', 'chaptersActive', 'lastUpdated'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createSurveyResponsesSheet(ss) {
  const sheet = ss.insertSheet('Survey Responses');
  const headers = [
    'timestamp', 'country', 'region', 'ageGroup', 'gender', 'educationLevel',
    'aiKnowledge', 'internetAccess', 'learningBarriers', 'willingToJoin'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createStudentDataSheet(ss) {
  const sheet = ss.insertSheet('Student Data');
  const headers = [
    'studentId', 'name', 'school', 'grade', 'aiLiteracyScore', 'region', 'enrollmentDate', 'status'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createSchoolDataSheet(ss) {
  const sheet = ss.insertSheet('School Data');
  const headers = [
    'schoolId', 'schoolName', 'region', 'studentsCount', 'teachersCount', 'partnershipDate', 'status'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createFundingDataSheet(ss) {
  const sheet = ss.insertSheet('Funding Data');
  const headers = [
    'date', 'source', 'amount', 'purpose', 'status', 'notes'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createChapterDataSheet(ss) {
  const sheet = ss.insertSheet('Chapter Data');
  const headers = [
    'chapterId', 'chapterName', 'region', 'establishedDate', 'membersCount', 'status'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

function createAnalyticsSummarySheet(ss) {
  const sheet = ss.insertSheet('Analytics Summary');
  const headers = [
    'metric', 'currentValue', 'previousValue', 'change', 'lastUpdated'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
}

// ===== SAMPLE DATA =====
function addSampleData(ss) {
  const now = new Date().toISOString();
  
  // Impact Metrics sample data
  const impactSheet = ss.getSheetByName('Impact Metrics');
  const impactData = [
    [now, 8500, 42, 350, 18, 85, 175000, 3, now],
    [new Date(Date.now() - 86400000).toISOString(), 8000, 40, 320, 15, 75, 150000, 3, new Date(Date.now() - 86400000).toISOString()]
  ];
  impactSheet.getRange(2, 1, impactData.length, impactData[0].length).setValues(impactData);
  
  // Survey Responses sample data
  const surveySheet = ss.getSheetByName('Survey Responses');
  const surveyData = [
    [now, 'Tanzania', 'Dar es Salaam', '18-25', 'Female', 'Secondary', 'Beginner', 'Mobile', 'Cost', 'Yes'],
    [now, 'Tanzania', 'Arusha', '26-35', 'Male', 'University', 'Intermediate', 'WiFi', 'Time', 'Yes'],
    [now, 'Kenya', 'Nairobi', '18-25', 'Male', 'University', 'Advanced', 'WiFi', 'None', 'Yes']
  ];
  surveySheet.getRange(2, 1, surveyData.length, surveyData[0].length).setValues(surveyData);
  
  // Student Data sample
  const studentSheet = ss.getSheetByName('Student Data');
  const studentData = [
    ['ST001', 'John Doe', 'Katavi Secondary', 12, 85, 'Katavi', '2024-01-15', 'Active'],
    ['ST002', 'Jane Smith', 'Arusha High', 11, 92, 'Arusha', '2024-01-16', 'Active']
  ];
  studentSheet.getRange(2, 1, studentData.length, studentData[0].length).setValues(studentData);
  
  // School Data sample
  const schoolSheet = ss.getSheetByName('School Data');
  const schoolData = [
    ['SC001', 'Katavi Secondary', 'Katavi', 500, 25, '2024-01-01', 'Active'],
    ['SC002', 'Arusha High', 'Arusha', 750, 40, '2024-01-05', 'Active']
  ];
  schoolSheet.getRange(2, 1, schoolData.length, schoolData[0].length).setValues(schoolData);
  
  // Funding Data sample
  const fundingSheet = ss.getSheetByName('Funding Data');
  const fundingData = [
    ['2024-01-15', 'Donation', 50000, 'Teacher Training', 'Received', 'Anonymous donor'],
    ['2024-01-20', 'Grant', 100000, 'Equipment', 'Pending', 'Government grant']
  ];
  fundingSheet.getRange(2, 1, fundingData.length, fundingData[0].length).setValues(fundingData);
  
  // Chapter Data sample
  const chapterSheet = ss.getSheetByName('Chapter Data');
  const chapterData = [
    ['CH001', 'Dar es Salaam Chapter', 'Dar es Salaam', '2024-01-01', 25, 'Active'],
    ['CH002', 'Arusha Chapter', 'Arusha', '2024-01-15', 18, 'Active']
  ];
  chapterSheet.getRange(2, 1, chapterData.length, chapterData[0].length).setValues(chapterData);
  
  // Analytics Summary sample
  const analyticsSheet = ss.getSheetByName('Analytics Summary');
  const analyticsData = [
    ['Total Students', 8500, 8000, '+6.25%', now],
    ['Active Schools', 42, 40, '+5%', now],
    ['Survey Responses', 1250, 1000, '+25%', now]
  ];
  analyticsSheet.getRange(2, 1, analyticsData.length, analyticsData[0].length).setValues(analyticsData);
}

// ===== WEB APP HANDLER =====
function doGet(e) {
  try {
    const range = (e && e.parameter && e.parameter.range) ? e.parameter.range : 'Impact Metrics!A1:Z100';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const values = ss.getRange(range).getValues();
    
    return ContentService
      .createTextOutput(JSON.stringify({ values }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== UTILITY FUNCTIONS =====
function updateImpactMetrics(students, schools, teachers, showcases, placements, funding, chapters) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Impact Metrics');
  const now = new Date().toISOString();
  
  const newRow = [now, students, schools, teachers, showcases, placements, funding, chapters, now];
  sheet.appendRow(newRow);
  
  Logger.log('✅ Impact metrics updated successfully');
}

function addSurveyResponse(country, region, ageGroup, gender, education, aiKnowledge, internet, barriers, willing) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Survey Responses');
  const now = new Date().toISOString();
  
  const newRow = [now, country, region, ageGroup, gender, education, aiKnowledge, internet, barriers, willing];
  sheet.appendRow(newRow);
  
  Logger.log('✅ Survey response added successfully');
}

// ===== DEPLOYMENT INSTRUCTIONS =====
/*
1. Copy this entire code into Google Apps Script (script.google.com)
2. Run setupACTSAfrica() once to create the spreadsheet and sample data
3. Copy the Spreadsheet ID from the logs and replace SPREADSHEET_ID above
4. Deploy → New deployment → Web app
   - Execute as: Me
   - Who has access: Anyone with the link
5. Copy the Web App URL and set it as VITE_SHEETS_WEBAPP_URL in your .env
6. Your ACTS Africa dashboard will now show live data!
*/
