# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the ACTS.Africa live data analytics page.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. A Google Sheets document with your data

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to only work with Google Sheets API for security

## Step 4: Create Your Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "ACTS Africa Impact Data" (or any name you prefer)
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 5: Set Up Your Data Structure

Create the following sheets in your Google Sheets document:

### Sheet 1: "Impact Metrics"
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| timestamp | studentsReached | schoolsParticipating | teachersTrained | aiClubsFormed | communityShowcases | workforcePlacements | fundingRaised | chaptersActive |
| 2024-01-15T10:00:00Z | 8500 | 42 | 350 | 28 | 18 | 85 | 175000 | 3 |

### Sheet 2: "Student Data"
| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| studentId | name | school | grade | aiLiteracyScore |
| ST001 | John Doe | Katavi Secondary | 12 | 85 |

### Sheet 3: "School Data"
| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| schoolId | schoolName | region | studentsCount | teachersCount |
| SC001 | Katavi Secondary | Katavi | 500 | 25 |

### Sheet 4: "Funding Data"
| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| date | source | amount | purpose | status |
| 2024-01-15 | Donation | 50000 | Teacher Training | Received |

## Step 6: Configure Environment Variables (Vite)

Create a `.env` file in the project root (do not commit it) and set:

```env
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_SHEETS_WRITE_TOKEN=your_shared_secret_token
VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
```

Replace:
- `YOUR_DEPLOYMENT_ID` with the deployment ID generated when you publish the Apps Script web app.
- `your_shared_secret_token` with the same token you configure inside `FINAL_APPS_SCRIPT.js`.
- `your_spreadsheet_id_here` with the spreadsheet ID from Step 4 (used for linking out to the sheet and optional direct API fallback).

If you still plan to use the direct Google Sheets API as a fallback, you can additionally set:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
```

Note: Vite only exposes variables prefixed with `VITE_` to client code. Netlify production variables should match these names exactly.

## Step 7: Make Your Google Sheets Public (Optional)

If you want to make the data publicly accessible without authentication:

1. In Google Sheets, click "Share" in the top right
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the link

## Step 7b: Using Google Apps Script (Recommended)

Use an Apps Script Web App as a proxy for controlled access and schema shaping.

1. In Google Drive, create a new Apps Script project.
2. Paste the production handler from `FINAL_APPS_SCRIPT.js`. It already includes:
   - Read access via `doGet`
   - Token-authenticated writes via both GET (for browser compatibility) and POST (for server-side tooling)
   - Concurrency control with `LockService`
3. Deploy → New deployment → Type: Web app.
   - Execute as: Me
   - Who has access: Anyone with the link
4. Copy the Web app URL and set it as `VITE_SHEETS_WEBAPP_URL` in `.env`.
5. Update the `WRITE_TOKEN` in the Apps Script file and set the same value as `VITE_SHEETS_WRITE_TOKEN` locally and on Netlify.

## Step 8: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/live-data` in your browser
3. Check the browser console for any API errors
4. Verify that data is being fetched and displayed

If the status still shows pending, ensure the sheet name matches `Impact Metrics` and the `VITE_` variables are set. The live page shows "Connected to Google Sheets" once credentials are valid.

## Netlify Deployment Notes

Set the same `VITE_GOOGLE_SHEETS_API_KEY` and `VITE_GOOGLE_SHEETS_ID` in Netlify Site Settings → Build & Deploy → Environment. Re-deploy after changes. Ensure your sheet is shared as "Anyone with the link – Viewer" or the API key has appropriate access.

## Troubleshooting

### Common Issues

1. **CORS Error**: This is normal in development. The production build should work fine.
2. **API Key Invalid**: Double-check your API key and ensure the Google Sheets API is enabled.
3. **Spreadsheet Not Found**: Verify the spreadsheet ID is correct and the sheet is accessible.
4. **Data Not Loading**: Check the sheet names and column headers match exactly.

### Debug Mode

To see what's happening behind the scenes, open your browser's developer tools and check the Console tab for any error messages.

## Security Considerations

1. **API Key Security**: Never commit your API key to version control. Use environment variables.
2. **Data Privacy**: Be careful about what data you put in public sheets.
3. **Rate Limits**: Google Sheets API has rate limits. The app includes retry logic for 429 errors.

## Data Updates

The live data page automatically refreshes every 5 minutes. To update data manually:

1. Edit your Google Sheets document
2. The changes will appear on the website within 5 minutes
3. You can also click the refresh button on the live data page

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your API credentials are correct
3. Ensure your Google Sheets structure matches the expected format
4. Check that the Google Sheets API is properly enabled

## Example Data

Here's some sample data you can use to test the integration:

```csv
timestamp,studentsReached,schoolsParticipating,teachersTrained,aiClubsFormed,communityShowcases,workforcePlacements,fundingRaised,chaptersActive
2024-01-15T10:00:00Z,8500,42,350,28,18,85,175000,3
2024-01-16T10:00:00Z,8750,43,365,30,19,90,180000,3
2024-01-17T10:00:00Z,9000,44,380,32,20,95,185000,3
```

This will help you get started with the Google Sheets integration for your ACTS.Africa live data analytics page!
