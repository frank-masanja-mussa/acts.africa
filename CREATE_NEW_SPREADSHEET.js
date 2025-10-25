/* ==========================================================
 *  ACTS.Africa - STEP 1: Create Your Spreadsheet
 *  
 *  RUN THIS FIRST to create a new spreadsheet in YOUR account
 * ========================================================== */

function createACTSAfricaSpreadsheet() {
  // Create a new spreadsheet
  const ss = SpreadsheetApp.create('ACTS Africa - Live Data');
  const spreadsheetId = ss.getId();
  const url = ss.getUrl();
  
  Logger.log('========================================');
  Logger.log('✅ SPREADSHEET CREATED SUCCESSFULLY!');
  Logger.log('========================================');
  Logger.log('Spreadsheet ID: ' + spreadsheetId);
  Logger.log('URL: ' + url);
  Logger.log('========================================');
  Logger.log('COPY THE ID ABOVE AND PASTE IT IN THE NEXT STEP');
  Logger.log('========================================');
  
  // Create all required sheets
  createImpactMetricsSheet(ss);
  createStudentDataSheet(ss);
  createSchoolDataSheet(ss);
  createFundingDataSheet(ss);
  
  // Add sample data
  addSampleDataToSheets(ss);
  
  Logger.log('✅ All sheets and sample data created!');
  Logger.log('✅ Open the URL above to see your spreadsheet');
  
  return spreadsheetId;
}

function createImpactMetricsSheet(ss) {
  const sheet = ss.getSheetByName('Sheet1');
  sheet.setName('Impact Metrics');
  
  const headers = [
    'timestamp', 'studentsReached', 'schoolsParticipating', 'teachersTrained',
    'communityShowcases', 'workforcePlacements', 'fundingRaised', 'chaptersActive', 'lastUpdated'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a5568')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function createStudentDataSheet(ss) {
  const sheet = ss.insertSheet('Student Data');
  
  const headers = [
    'studentId', 'name', 'school', 'grade', 'aiLiteracyScore', 'region', 'enrollmentDate', 'status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a5568')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function createSchoolDataSheet(ss) {
  const sheet = ss.insertSheet('School Data');
  
  const headers = [
    'schoolId', 'schoolName', 'region', 'studentsCount', 'teachersCount', 'partnershipDate', 'status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a5568')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function createFundingDataSheet(ss) {
  const sheet = ss.insertSheet('Funding Data');
  
  const headers = [
    'date', 'source', 'amount', 'purpose', 'status', 'notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a5568')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function addSampleDataToSheets(ss) {
  const now = new Date().toISOString();
  
  // Impact Metrics sample data
  const impactSheet = ss.getSheetByName('Impact Metrics');
  const impactData = [
    [now, 8500, 42, 350, 18, 85, 175000, 3, now],
    [new Date(Date.now() - 86400000).toISOString(), 8000, 40, 320, 15, 75, 150000, 3, new Date(Date.now() - 86400000).toISOString()]
  ];
  impactSheet.getRange(2, 1, impactData.length, impactData[0].length).setValues(impactData);
  
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
}

