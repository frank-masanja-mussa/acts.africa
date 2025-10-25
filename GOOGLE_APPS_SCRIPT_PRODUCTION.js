/* ==========================================================
 *  ACTS.Africa  –  Production JSON API for Google Sheets
 *  
 *  DEPLOYMENT INSTRUCTIONS:
 *  1. Copy this entire file
 *  2. Go to https://script.google.com
 *  3. Paste into Code.gs
 *  4. Change WRITE_TOKEN to a secure random string
 *  5. Deploy → New deployment → Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  6. Copy the Web App URL
 * ========================================================== */

/* 1️⃣  CONFIG ------------------------------------------------ */
const SPREADSHEET_ID = '1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw';
const DEFAULT_RANGE  = 'Impact Metrics!A1:Z100';
const WRITE_TOKEN    = 'acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8';

/* 2️⃣  READ (GET) -------------------------------------------- */
function doGet(e) {
  const range = (e?.parameter?.range) || DEFAULT_RANGE;

  try {
    const ss     = SpreadsheetApp.openById(SPREADSHEET_ID);
    const values = ss.getRange(range).getValues();
    return respond_(200, { values });
  } catch (err) {
    return respond_(422, { error: err.message || err.toString() });
  }
}

/* 3️⃣  WRITE (POST) ------------------------------------------
 *  POST JSON body:
 *  {
 *    "sheet": "Impact Metrics",
 *    "rows" : [
 *      ["2025-10-25T12:00:00Z", 9000, 50, 400, 25, 100, 200000, 4, "2025-10-25T12:00:00Z"]
 *    ]
 *  }
 *  Query param: ?token=<WRITE_TOKEN>
 */
function doPost(e) {
  try {
    authWrite_(e);

    const payload   = JSON.parse(e.postData.contents);
    const sheetName = payload.sheet;
    const rows      = payload.rows;

    if (!sheetName || !Array.isArray(rows) || !rows.length) {
      throw new Error('Invalid payload: missing sheet or rows');
    }

    const lock = LockService.getScriptLock();
    lock.tryLock(10000);  // prevent race conditions

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID)
                                 .getSheetByName(sheetName);
    if (!sheet) throw new Error('Sheet not found: ' + sheetName);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rows.length, rows[0].length)
         .setValues(rows);

    lock.releaseLock();

    return respond_(200, { status: 'ok', inserted: rows.length, lastRow: lastRow + rows.length });
  } catch (err) {
    return respond_(400, { error: err.message || err.toString() });
  } finally {
    try { LockService.getScriptLock().releaseLock(); } catch (_) {}
  }
}

/* 4️⃣  CORS pre-flight (OPTIONS) ----------------------------- */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

/* 5️⃣  HELPERS ----------------------------------------------- */
function respond_(status, payload) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function authWrite_(e) {
  const tokenQ = e?.parameter?.token || '';
  const bearer = e?.headers?.Authorization || '';

  const supplied = bearer.startsWith('Bearer ') 
    ? bearer.slice(7) 
    : tokenQ;

  if (supplied !== WRITE_TOKEN) {
    throw new Error('Unauthorized – invalid or missing token');
  }
}

/* 6️⃣  UTILITY FUNCTIONS (call from Apps Script editor) ------ */

/**
 * One-time setup: creates all required sheets with proper headers
 */
function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Impact Metrics
  createSheetIfNotExists(ss, 'Impact Metrics', [
    'timestamp', 'studentsReached', 'schoolsParticipating', 'teachersTrained',
    'communityShowcases', 'workforcePlacements', 'fundingRaised', 'chaptersActive', 'lastUpdated'
  ]);
  
  // Student Data
  createSheetIfNotExists(ss, 'Student Data', [
    'studentId', 'name', 'school', 'grade', 'aiLiteracyScore', 'region', 'enrollmentDate', 'status'
  ]);
  
  // School Data
  createSheetIfNotExists(ss, 'School Data', [
    'schoolId', 'schoolName', 'region', 'studentsCount', 'teachersCount', 'partnershipDate', 'status'
  ]);
  
  // Funding Data
  createSheetIfNotExists(ss, 'Funding Data', [
    'date', 'source', 'amount', 'purpose', 'status', 'notes'
  ]);
  
  Logger.log('✅ All sheets created successfully!');
}

function createSheetIfNotExists(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4a5568').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

/**
 * Add sample data for testing
 */
function addSampleData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const now = new Date().toISOString();
  
  // Impact Metrics
  const impactSheet = ss.getSheetByName('Impact Metrics');
  if (impactSheet.getLastRow() === 1) {  // only headers
    impactSheet.appendRow([now, 8500, 42, 350, 18, 85, 175000, 3, now]);
    Logger.log('✅ Sample impact metrics added');
  }
  
  // Student Data
  const studentSheet = ss.getSheetByName('Student Data');
  if (studentSheet.getLastRow() === 1) {
    studentSheet.appendRow(['ST001', 'John Doe', 'Katavi Secondary', 12, 85, 'Katavi', '2024-01-15', 'Active']);
    studentSheet.appendRow(['ST002', 'Jane Smith', 'Arusha High', 11, 92, 'Arusha', '2024-01-16', 'Active']);
    Logger.log('✅ Sample student data added');
  }
  
  Logger.log('✅ Sample data setup complete!');
}

/**
 * Test the doGet function locally
 */
function testRead() {
  const result = doGet({ parameter: { range: 'Impact Metrics!A1:B2' } });
  Logger.log(result.getContent());
}

/**
 * Test the doPost function locally
 */
function testWrite() {
  const now = new Date().toISOString();
  const result = doPost({
    parameter: { token: WRITE_TOKEN },
    postData: {
      contents: JSON.stringify({
        sheet: 'Impact Metrics',
        rows: [[now, 9000, 50, 400, 25, 100, 200000, 4, now]]
      })
    }
  });
  Logger.log(result.getContent());
}

