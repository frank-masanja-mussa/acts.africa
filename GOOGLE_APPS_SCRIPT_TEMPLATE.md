# Google Apps Script Template for ACTS Africa

Paste the following into your Apps Script `Code.gs`, update `SPREADSHEET_ID`, run `setup()` once if you need to create the sheet, then deploy `doGet` as a Web App.

```javascript
// ===== Configure your Spreadsheet ID =====
const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';

// ===== One-time setup to create the sheet and headers =====
function setup() {
  const ss = SpreadsheetApp.create('ACTS Africa Impact Data');
  const sheet = ss.getActiveSheet();
  sheet.setName('Impact Metrics');
  sheet.getRange(1, 1, 1, 8).setValues([[
    'timestamp',
    'studentsReached',
    'schoolsParticipating',
    'teachersTrained',
    'communityShowcases',
    'workforcePlacements',
    'fundingRaised',
    'chaptersActive'
  ]]);
  Logger.log('SPREADSHEET_ID: ' + ss.getId());
  Logger.log('URL: ' + ss.getUrl());
}

// ===== Ensure headers exist on an existing sheet =====
function ensureHeaders() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Impact Metrics') || ss.insertSheet('Impact Metrics');
  const expected = ['timestamp','studentsReached','schoolsParticipating','teachersTrained','communityShowcases','workforcePlacements','fundingRaised','chaptersActive'];
  const current = sheet.getRange(1,1,1,expected.length).getValues()[0] || [];
  if (expected.join('|') !== current.join('|')) {
    sheet.getRange(1,1,1,expected.length).setValues([expected]);
  }
}

// ===== Web App handler (read-only) =====
function doGet(e) {
  const range = (e && e.parameter && e.parameter.range) ? e.parameter.range : 'Impact Metrics!A1:Z100';
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const values = ss.getRange(range).getValues();
  return ContentService
    .createTextOutput(JSON.stringify({ values }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy → New deployment → Web app → Execute as Me, Who has access: Anyone with the link. Copy the Web App URL and set `VITE_SHEETS_WEBAPP_URL` in your environment.

