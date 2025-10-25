# Netlify Environment Variables

Copy and paste these environment variables into your Netlify site settings:

## Required Environment Variables

```
VITE_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
VITE_GOOGLE_SHEETS_ID=your_google_spreadsheet_id_here
VITE_SHEETS_WEBAPP_URL=your_google_apps_script_webapp_url_here
```

## How to Set Up Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Click "Add variable"
5. Add each variable with its corresponding value

## Getting Your Values

### 1. Google Sheets API Key
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable Google Sheets API
- Go to Credentials > Create Credentials > API Key
- Copy the API key

### 2. Google Spreadsheet ID
- Open your Google Spreadsheet
- Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- The ID is the long string between `/d/` and `/edit`

### 3. Google Apps Script Web App URL (Recommended)
- Go to [Google Apps Script](https://script.google.com/)
- Create a new project
- Copy the code from `ACTS_AFRICA_APPS_SCRIPT.js`
- Deploy as web app with "Anyone" access
- Copy the web app URL

## Production Notes

- The app will only work with real data when these environment variables are properly configured
- Without proper configuration, the app will show error messages instead of mock data
- The Apps Script Web App URL is preferred over direct API access for better security
- Make sure your Google Sheets has the proper structure as defined in `GOOGLE_SHEETS_STRUCTURE.md`

## Security

- Never commit these values to version control
- Use Netlify's environment variable system for secure storage
- Consider using different API keys for different environments (staging/production)
