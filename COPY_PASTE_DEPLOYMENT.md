# 📋 Copy-Paste Deployment Guide

## 🔐 Your Secure Token (Already Generated)

```
acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

---

## 1️⃣ Google Apps Script (Copy This)

**Go to:** https://script.google.com → New Project → Paste this code:

👉 **Open file:** `GOOGLE_APPS_SCRIPT_PRODUCTION.js` (already has the token configured)

**Then:**
1. Select `setupSheets` from dropdown → Run ▶️ → Authorize
2. Select `addSampleData` → Run ▶️
3. Deploy → New deployment → Web app → Execute as: Me → Access: Anyone
4. Copy the Web App URL

---

## 2️⃣ Netlify Environment Variables (Copy These)

**Go to:** Netlify Dashboard → Site Settings → Environment Variables → Add variable

### Variable 1:
```
Key:   VITE_SHEETS_WEBAPP_URL
Value: [PASTE YOUR WEB APP URL FROM STEP 1 HERE]
```

### Variable 2:
```
Key:   VITE_GOOGLE_SHEETS_ID
Value: 1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw
```

### Variable 3:
```
Key:   VITE_SHEETS_WRITE_TOKEN
Value: acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

**Then:** Save → Deploys → Trigger deploy

---

## 3️⃣ Test It Works

### Test Read:
Open in browser:
```
[YOUR_WEB_APP_URL]?range=Impact%20Metrics!A1:B2
```

Should return JSON with data.

### Test Website:
Visit your Netlify site → Go to `/live-data` → Should show real data

---

## ✅ What You Get

### ✅ READ (Public - No Token Needed)
Your React app automatically reads data from Google Sheets:
- Impact metrics every 5 minutes
- Student data
- School data
- Funding data

### 🔒 WRITE (Secure - Token Required)
Your React app can write data with these functions:
```javascript
import { updateImpactMetrics, addStudentData } from '@/utils/googleSheets';

// Update metrics
await updateImpactMetrics({
  studentsReached: 9000,
  schoolsParticipating: 50,
  teachersTrained: 400,
  communityShowcases: 25,
  workforcePlacements: 100,
  fundingRaised: 200000,
  chaptersActive: 4
});

// Add student
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

## 📊 Your Google Sheet

**URL:** https://docs.google.com/spreadsheets/d/1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw/edit

**Sheets created:**
- Impact Metrics (9 columns)
- Student Data (8 columns)
- School Data (7 columns)
- Funding Data (6 columns)

---

## 🚨 Important

- ✅ Token is already configured in all files
- ✅ Spreadsheet ID is already set
- ✅ No mock data - only real data
- ✅ Read operations are public (good for transparency)
- ✅ Write operations require secure token
- ⚠️ Never commit `.env` file to GitHub

---

## 🎯 That's It!

3 steps → Your app is live with full read/write Google Sheets integration.

**Need help?** Check `COMPLETE_SETUP_GUIDE.md` for detailed instructions.

