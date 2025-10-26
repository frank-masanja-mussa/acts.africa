/* ==========================================================
 *  ACTS.Africa - STEP 2: Production API
 *  
 *  AFTER running CREATE_NEW_SPREADSHEET.js, paste the ID below
 * ========================================================== */

/* 1️⃣  CONFIG - YOUR REAL SPREADSHEET ID -------------------- */
const SPREADSHEET_ID = '1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q';
const DEFAULT_RANGE  = 'Impact Metrics!A1:Z100';
const WRITE_TOKEN    = 'acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8';

/* 2️⃣  READ (GET) -------------------------------------------- */
function doGet(e) {
  // Check if this is a write request via GET (to avoid CORS preflight)
  if (e && e.parameter && e.parameter.action === 'write') {
    return handleWriteViaGet(e);
  }
  
  // Normal read request
  const range = (e && e.parameter && e.parameter.range) ? e.parameter.range : DEFAULT_RANGE;

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const values = ss.getRange(range).getValues();
    return respond_(200, { values: values });
  } catch (err) {
    return respond_(422, { error: err.message || err.toString() });
  }
}

/* 2b️⃣  WRITE VIA GET (to avoid CORS) ----------------------- */
function handleWriteViaGet(e) {
  try {
    // Verify token
    const token = e.parameter.token || '';
    if (token !== WRITE_TOKEN) {
      throw new Error('Unauthorized – invalid token');
    }

    const sheetName = e.parameter.sheet;
    const dataStr = e.parameter.data;
    
    if (!sheetName || !dataStr) {
      throw new Error('Missing sheet or data parameter');
    }

    const rows = JSON.parse(dataStr);
    
    if (!Array.isArray(rows) || !rows.length) {
      throw new Error('Invalid data format');
    }

    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) throw new Error('Sheet not found: ' + sheetName);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rows.length, rows[0].length).setValues(rows);

    lock.releaseLock();

    return respond_(200, { status: 'ok', inserted: rows.length, lastRow: lastRow + rows.length });
  } catch (err) {
    return respond_(400, { error: err.message || err.toString() });
  } finally {
    try { LockService.getScriptLock().releaseLock(); } catch (_) {}
  }
}

/* 3️⃣  WRITE (POST) ------------------------------------------ */
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
    lock.tryLock(10000);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) throw new Error('Sheet not found: ' + sheetName);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rows.length, rows[0].length).setValues(rows);

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
  const output = ContentService.createTextOutput('');
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/* 5️⃣  HELPERS ----------------------------------------------- */
function respond_(status, payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function authWrite_(e) {
  const tokenQ = (e && e.parameter && e.parameter.token) ? e.parameter.token : '';
  const bearer = (e && e.headers && e.headers.Authorization) ? e.headers.Authorization : '';

  const supplied = bearer.indexOf('Bearer ') === 0 ? bearer.substring(7) : tokenQ;

  if (supplied !== WRITE_TOKEN) {
    throw new Error('Unauthorized – invalid or missing token');
  }
}

/* 6️⃣  TEST FUNCTIONS ---------------------------------------- */
function testRead() {
  const result = doGet({ parameter: { range: 'Impact Metrics!A1:B2' } });
  Logger.log(result.getContent());
}

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

/* 7️⃣  SETUP SURVEY RESPONSES SHEET -------------------------- */
function setupSurveyResponsesSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Check if sheet already exists
  let sheet = ss.getSheetByName('Survey Responses');
  if (!sheet) {
    sheet = ss.insertSheet('Survey Responses');
  }
  
  // Set headers
  const headers = [
    'timestamp', 'country', 'age', 'gender', 'role',
    'internetUsage', 'aiExperience', 'devices',
    'aiUnderstanding', 'barriers', 'topics',
    'joinClub', 'learningPreference', 'expectations'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a5568')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('✅ Survey Responses sheet created/updated successfully');
}
