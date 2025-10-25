# Quick Setup Instructions for ACTS Africa Google Sheets

## 🚀 One-Click Setup (5 minutes)

### Step 1: Create Apps Script Project
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the entire content from `ACTS_AFRICA_APPS_SCRIPT.js`

### Step 2: Run Setup
1. Click the "Run" button (▶️) next to `setupACTSAfrica`
2. Grant permissions when prompted
3. Check the logs - you'll see:
   - ✅ Spreadsheet created
   - 📊 Spreadsheet ID: [copy this]
   - 🔗 Spreadsheet URL: [bookmark this]

### Step 3: Update Configuration
1. Copy the Spreadsheet ID from the logs
2. In your Apps Script, replace `REPLACE_WITH_YOUR_SPREADSHEET_ID` with the actual ID
3. Save the script

### Step 4: Deploy Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as type
3. Set:
   - Execute as: Me
   - Who has access: Anyone with the link
4. Click "Deploy"
5. Copy the Web App URL

### Step 5: Configure Frontend
1. Copy `env.example` to `.env`
2. Set `VITE_SHEETS_WEBAPP_URL` to your Web App URL
3. Run `npm run dev`
4. Visit `/live-data` - you should see "Connected to Google Sheets" with real data!

## 🎯 What You Get

Your Google Sheet will have 7 tabs:
- **Impact Metrics**: Main dashboard data (students, schools, funding, etc.)
- **Survey Responses**: AI literacy survey data
- **Student Data**: Individual student records
- **School Data**: Partner school information
- **Funding Data**: Financial records
- **Chapter Data**: Chapter information
- **Analytics Summary**: Aggregated metrics

## 🔧 Adding New Data

Use these functions in Apps Script:
- `updateImpactMetrics()` - Update main dashboard numbers
- `addSurveyResponse()` - Add new survey responses

## 🌐 Netlify Deployment

In Netlify → Site Settings → Environment Variables:
- Add `VITE_SHEETS_WEBAPP_URL` with your Web App URL
- Redeploy your site

## ✅ Verification

Visit your Web App URL directly:
`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?range=Impact%20Metrics!A1:Z100`

You should see JSON like:
```json
{
  "values": [
    ["timestamp", "studentsReached", "schoolsParticipating", ...],
    ["2024-01-15T10:00:00Z", 8500, 42, ...]
  ]
}
```

That's it! Your ACTS Africa dashboard is now connected to Google Sheets with live data updates.
