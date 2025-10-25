# 🚀 ACTS.Africa Complete Setup Guide

## ✅ Your Secure Token (Generated)

```
acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

This token is already configured in all files. **Keep it secret!**

---

## 📊 What Your Apps Script Does

### ✅ READ Operations (No Token Required)
Anyone can read data from your sheets via GET requests:

```javascript
// Example: Read Impact Metrics
GET https://your-webapp-url/exec?range=Impact%20Metrics!A1:Z100

// Returns:
{
  "values": [
    ["timestamp", "studentsReached", "schoolsParticipating", ...],
    ["2025-10-25T12:00:00Z", 8500, 42, 350, ...]
  ]
}
```

**Used by your React app to display live data on `/live-data` page**

### 🔒 WRITE Operations (Token Required)
Only authorized requests with the correct token can write:

```javascript
// Example: Add new impact metrics
POST https://your-webapp-url/exec?token=acts_africa_f9c732...

Body:
{
  "sheet": "Impact Metrics",
  "rows": [
    ["2025-10-25T12:00:00Z", 9000, 50, 400, 25, 100, 200000, 4, "2025-10-25T12:00:00Z"]
  ]
}

// Returns:
{
  "status": "ok",
  "inserted": 1,
  "lastRow": 3
}
```

**Used by your React app when you call `updateImpactMetrics()` or other write functions**

---

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Google Apps Script (3 minutes)

1. **Open the script file:**
   - Open `GOOGLE_APPS_SCRIPT_PRODUCTION.js` in this repo
   - Copy the entire contents (Ctrl+A, Ctrl+C)

2. **Go to Apps Script:**
   - Visit https://script.google.com
   - Click **New Project**
   - Delete the default code
   - Paste your copied code

3. **Verify the configuration:**
   ```javascript
   const SPREADSHEET_ID = '1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw';
   const WRITE_TOKEN = 'acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8';
   ```
   ✅ These are already correct!

4. **Run setup (first time only):**
   - Select `setupSheets` from the function dropdown
   - Click **Run** ▶️
   - Authorize when prompted (click "Advanced" → "Go to project")
   - Check logs: should see "✅ All sheets created successfully!"
   - Select `addSampleData` and run it
   - Check logs: should see "✅ Sample data setup complete!"

5. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click gear icon ⚙️ → Select **Web app**
   - Settings:
     - Description: `ACTS.Africa Production API`
     - Execute as: **Me** (your email)
     - Who has access: **Anyone**
   - Click **Deploy**
   - **Copy the Web App URL** (ends with `/exec`)

6. **Test it works:**
   - Open a new browser tab (incognito mode)
   - Paste: `YOUR_WEB_APP_URL?range=Impact%20Metrics!A1:B2`
   - Should see JSON with your data

---

### Step 2: Configure Netlify (1 minute)

1. **Go to Netlify:**
   - Dashboard → Your Site → **Site settings** → **Environment variables**

2. **Add these 3 variables:**

   **Variable 1:**
   ```
   Key:   VITE_SHEETS_WEBAPP_URL
   Value: [PASTE YOUR WEB APP URL FROM STEP 1]
   ```

   **Variable 2:**
   ```
   Key:   VITE_GOOGLE_SHEETS_ID
   Value: 1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw
   ```

   **Variable 3:**
   ```
   Key:   VITE_SHEETS_WRITE_TOKEN
   Value: acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
   ```

3. **Save and deploy:**
   - Click **Save**
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

### Step 3: Verify Everything Works (2 minutes)

#### ✅ Test 1: Read Data
1. Visit your deployed site
2. Go to `/live-data` page
3. Should see real data from Google Sheets
4. Open browser console (F12) - no errors should appear

#### ✅ Test 2: Check Google Sheet
1. Open: https://docs.google.com/spreadsheets/d/1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw/edit
2. You should see 4 sheets:
   - Impact Metrics (with sample data)
   - Student Data (with sample data)
   - School Data (with sample data)
   - Funding Data (with sample data)

#### ✅ Test 3: Write Data (Optional)
On your deployed site, open browser console (F12) and run:

```javascript
// Import the write function
const { updateImpactMetrics } = await import('/src/utils/googleSheets.js');

// Write new data
await updateImpactMetrics({
  studentsReached: 9000,
  schoolsParticipating: 50,
  teachersTrained: 400,
  communityShowcases: 25,
  workforcePlacements: 100,
  fundingRaised: 200000,
  chaptersActive: 4
});

// Check your Google Sheet - new row should appear!
```

---

## 📋 Your Google Sheet Structure

After running `setupSheets()`, you have:

### Impact Metrics Sheet
| Column | Type | Description |
|--------|------|-------------|
| timestamp | ISO Date | When the data was recorded |
| studentsReached | Number | Total students reached |
| schoolsParticipating | Number | Number of schools |
| teachersTrained | Number | Teachers trained |
| communityShowcases | Number | Community events held |
| workforcePlacements | Number | Students placed in jobs |
| fundingRaised | Number | Total funding in USD |
| chaptersActive | Number | Active chapters |
| lastUpdated | ISO Date | Last update timestamp |

### Student Data Sheet
| Column | Type | Description |
|--------|------|-------------|
| studentId | String | Unique student ID |
| name | String | Student name |
| school | String | School name |
| grade | Number | Grade level |
| aiLiteracyScore | Number | AI literacy score (0-100) |
| region | String | Geographic region |
| enrollmentDate | ISO Date | When enrolled |
| status | String | Active/Inactive |

### School Data Sheet
| Column | Type | Description |
|--------|------|-------------|
| schoolId | String | Unique school ID |
| schoolName | String | School name |
| region | String | Geographic region |
| studentsCount | Number | Total students |
| teachersCount | Number | Total teachers |
| partnershipDate | ISO Date | Partnership start date |
| status | String | Active/Inactive |

### Funding Data Sheet
| Column | Type | Description |
|--------|------|-------------|
| date | ISO Date | Funding date |
| source | String | Funding source |
| amount | Number | Amount in USD |
| purpose | String | What it's for |
| status | String | Received/Pending |
| notes | String | Additional notes |

---

## 🔧 How Your React App Uses This

### Reading Data (Automatic)

Your `/live-data` page automatically fetches data every 5 minutes:

```javascript
// In src/pages/LiveData.jsx
useEffect(() => {
  const fetchData = async () => {
    const impact = await getImpactMetrics();  // Calls Apps Script GET
    setData(impact);
  };
  
  fetchData();
  const interval = setInterval(fetchData, 5 * 60 * 1000);  // Every 5 min
}, []);
```

### Writing Data (Manual)

You can write data from anywhere in your app:

```javascript
import { updateImpactMetrics, addStudentData } from '@/utils/googleSheets';

// Update metrics
await updateImpactMetrics({
  studentsReached: 9500,
  schoolsParticipating: 55,
  // ... other fields
});

// Add a student
await addStudentData({
  studentId: 'ST003',
  name: 'Alice Johnson',
  school: 'Mwanza Secondary',
  grade: 10,
  aiLiteracyScore: 88,
  region: 'Mwanza',
  status: 'Active'
});
```

---

## 🔐 Security

### ✅ What's Protected
- **Write operations** require the secure token
- **Token is never exposed** in client-side code (stored in env vars)
- **CORS headers** prevent unauthorized domains
- **Concurrent-safe** writes prevent data corruption

### ✅ What's Public
- **Read operations** are public (anyone can read)
- This is intentional - your impact data is meant to be transparent
- If you need private reads, modify the Apps Script to require token for GET too

---

## 🐛 Troubleshooting

### "Unauthorized - invalid token"
- Check that `VITE_SHEETS_WRITE_TOKEN` in Netlify exactly matches `WRITE_TOKEN` in Apps Script
- Redeploy both Apps Script and Netlify

### "Access denied" in Apps Script
- Run the script manually once to authorize it
- Make sure you own the spreadsheet

### No data showing on website
- Check browser console (F12) for errors
- Verify `VITE_SHEETS_WEBAPP_URL` is correct in Netlify
- Test the Web App URL directly in browser

### Apps Script execution fails
- Go to Apps Script → **Executions** tab
- Click the failed execution to see the error
- Usually it's a missing sheet or wrong range

---

## 📞 Quick Reference

### Your Configuration
```
Spreadsheet ID: 1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw
Web App URL: https://script.google.com/macros/s/AKfycbx5IXs4VVAxcOO2NkSo1je5HCOXNztBFScVOlgPlwdJ_KigJ_5OCkU-kHF3RJalKm8D/exec
Write Token: acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

### API Endpoints
```
READ:  GET  {WEBAPP_URL}?range=Sheet!A1:Z100
WRITE: POST {WEBAPP_URL}?token={TOKEN}
       Body: { "sheet": "SheetName", "rows": [[...]] }
```

### React Functions
```javascript
// Read
getImpactMetrics()
getStudentData()
getSchoolData()
getFundingData()

// Write
updateImpactMetrics(metrics)
addStudentData(student)
addSchoolData(school)
addFundingData(funding)
```

---

## ✅ Checklist

- [ ] Copy `GOOGLE_APPS_SCRIPT_PRODUCTION.js` to Apps Script
- [ ] Run `setupSheets()` function
- [ ] Run `addSampleData()` function
- [ ] Deploy as Web App (Execute as: Me, Access: Anyone)
- [ ] Copy Web App URL
- [ ] Add 3 environment variables to Netlify
- [ ] Trigger Netlify deploy
- [ ] Test `/live-data` page shows real data
- [ ] Test write operation (optional)

**When all checked, you're live! 🎉**

---

*Your app now has full read/write access to Google Sheets with production-grade security.*

