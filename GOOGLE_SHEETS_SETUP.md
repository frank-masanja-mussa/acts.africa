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

## Step 6: Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
REACT_APP_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
```

Replace:
- `your_api_key_here` with the API key from Step 3
- `your_spreadsheet_id_here` with the spreadsheet ID from Step 4

## Step 7: Make Your Google Sheets Public (Optional)

If you want to make the data publicly accessible without authentication:

1. In Google Sheets, click "Share" in the top right
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the link

## Step 8: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/live-data` in your browser
3. Check the browser console for any API errors
4. Verify that data is being fetched and displayed

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
