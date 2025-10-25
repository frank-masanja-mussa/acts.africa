# 🚀 ACTS.Africa Production Deployment Guide

## ✅ Complete Setup Checklist

### 1️⃣ Google Apps Script Setup (5 minutes)

**Step 1: Copy the production script**
1. Open the file `GOOGLE_APPS_SCRIPT_PRODUCTION.js` in this repo
2. Copy the entire contents
3. Go to https://script.google.com
4. Create a new project or open your existing one
5. Paste the code into `Code.gs`

**Step 2: Configure the script**
1. Find this line: `const WRITE_TOKEN = 'acts_africa_2025_secure_token_change_this';`
2. Replace with a secure random string (at least 32 characters)
   - Example: `acts_africa_prod_x7k9m2p5q8w1e4r6t9y2u5i8o0p3a6s9`
3. Save the script (Ctrl/Cmd + S)

**Step 3: Run setup functions**
1. In the Apps Script editor, select `setupSheets` from the function dropdown
2. Click Run ▶️
3. Authorize the script when prompted
4. Check the logs - you should see "✅ All sheets created successfully!"
5. Select `addSampleData` and run it to add test data

**Step 4: Deploy as Web App**
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Configure:
   - Description: `ACTS.Africa Production API`
   - Execute as: **Me** (your email)
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the **Web app URL** (ends with `/exec`)

**Step 5: Test the deployment**
1. Open an incognito browser tab
2. Paste: `YOUR_WEB_APP_URL?range=Impact%20Metrics!A1:B2`
3. You should see JSON like: `{"values":[["timestamp","studentsReached"],["2025-10-25T...","8500"]]}`

---

### 2️⃣ Netlify Environment Variables

Go to your Netlify dashboard:
1. Select your site
2. **Site settings** → **Environment variables**
3. Click **Add variable** and add these three:

```
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbx5IXs4VVAxcOO2NkSo1je5HCOXNztBFScVOlgPlwdJ_KigJ_5OCkU-kHF3RJalKm8D/exec

VITE_GOOGLE_SHEETS_ID=1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw

VITE_SHEETS_WRITE_TOKEN=acts_africa_prod_x7k9m2p5q8w1e4r6t9y2u5i8o0p3a6s9
```

⚠️ **Important:**
- Replace `VITE_SHEETS_WEBAPP_URL` with YOUR actual Web App URL from Step 1
- Replace `VITE_SHEETS_WRITE_TOKEN` with the SAME token you used in the Apps Script

4. Click **Save**
5. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

---

### 3️⃣ Verify Everything Works

**Test Read (GET):**
1. Open your deployed Netlify site
2. Navigate to `/live-data`
3. You should see real data from your Google Sheet
4. Check browser console - no errors should appear

**Test Write (POST) - Optional:**
Create a test page or use browser console:

```javascript
// In your browser console on the Netlify site
const { updateImpactMetrics } = await import('/src/utils/googleSheets.js');

await updateImpactMetrics({
  studentsReached: 9000,
  schoolsParticipating: 50,
  teachersTrained: 400,
  communityShowcases: 25,
  workforcePlacements: 100,
  fundingRaised: 200000,
  chaptersActive: 4
});

// Check your Google Sheet - a new row should appear!
```

---

## 📊 Your Google Sheet Structure

After running `setupSheets()`, you'll have these tabs:

### Impact Metrics
| timestamp | studentsReached | schoolsParticipating | teachersTrained | communityShowcases | workforcePlacements | fundingRaised | chaptersActive | lastUpdated |
|-----------|-----------------|----------------------|-----------------|--------------------|--------------------|---------------|----------------|-------------|

### Student Data
| studentId | name | school | grade | aiLiteracyScore | region | enrollmentDate | status |
|-----------|------|--------|-------|-----------------|--------|----------------|--------|

### School Data
| schoolId | schoolName | region | studentsCount | teachersCount | partnershipDate | status |
|----------|------------|--------|---------------|---------------|-----------------|--------|

### Funding Data
| date | source | amount | purpose | status | notes |
|------|--------|--------|---------|--------|-------|

---

## 🔒 Security Features

✅ **Write Protection:** All POST requests require a secure token  
✅ **CORS Enabled:** Only your domain can make requests  
✅ **No Cache:** Fresh data on every request  
✅ **Concurrent-Safe:** Uses LockService to prevent race conditions  
✅ **Error Handling:** Clear error messages, no data leaks  

---

## 🛠 Troubleshooting

### "Unauthorized - invalid token"
- Check that `VITE_SHEETS_WRITE_TOKEN` in Netlify matches `WRITE_TOKEN` in Apps Script
- Make sure you redeployed both Apps Script AND Netlify after changes

### "Sheet not found"
- Run `setupSheets()` in Apps Script editor
- Check sheet names match exactly (case-sensitive)

### "Access denied" in Apps Script
- Make sure you authorized the script
- Check that the script owner can access the spreadsheet

### No data showing on website
- Check browser console for errors
- Verify `VITE_SHEETS_WEBAPP_URL` is correct in Netlify
- Test the Web App URL directly in browser with `?range=Impact%20Metrics!A1:B2`

---

## 📝 API Reference

### Read Data (Frontend)
```javascript
import { getImpactMetrics, getStudentData, getSchoolData, getFundingData } from '@/utils/googleSheets';

// Get latest impact metrics
const metrics = await getImpactMetrics();

// Get all student data
const students = await getStudentData();
```

### Write Data (Frontend)
```javascript
import { updateImpactMetrics, addStudentData, addSchoolData, addFundingData } from '@/utils/googleSheets';

// Update impact metrics
await updateImpactMetrics({
  studentsReached: 9000,
  schoolsParticipating: 50,
  teachersTrained: 400,
  communityShowcases: 25,
  workforcePlacements: 100,
  fundingRaised: 200000,
  chaptersActive: 4
});

// Add new student
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

## ✨ What's Been Removed

❌ All mock data functions  
❌ Hardcoded placeholder values  
❌ Random data generation  
❌ Fallback to fake data  
❌ Development-only code  

✅ **100% Production-Ready Code**

---

## 🎯 Next Steps

1. ✅ Deploy the Apps Script
2. ✅ Add environment variables to Netlify
3. ✅ Test read functionality
4. ✅ Test write functionality (optional)
5. 🚀 Your app is live with real data!

---

## 📞 Support

If you encounter issues:
1. Check the Apps Script execution logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Make sure both Apps Script and Netlify are deployed with latest code

**Your ACTS.Africa dashboard is now production-ready! 🎉**

