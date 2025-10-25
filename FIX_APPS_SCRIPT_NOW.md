# 🔧 Fix Your Apps Script (500 Error)

## ❌ Current Issue
Your Web App URL is deployed but returning 500 error because the script code needs to be updated.

**Your Web App URL:**
```
https://script.google.com/macros/s/AKfycbx5IXs4VVAxcOO2NkSo1je5HCOXNztBFScVOlgPlwdJ_KigJ_5OCkU-kHF3RJalKm8D/exec
```

---

## ✅ Fix It Now (2 Minutes)

### Step 1: Update the Script Code

1. **Go to your Apps Script project:**
   - https://script.google.com
   - Open your existing project (the one with the Web App URL above)

2. **Delete ALL existing code in Code.gs**

3. **Copy the ENTIRE contents of `GOOGLE_APPS_SCRIPT_PRODUCTION.js`**
   - Open the file in this repo
   - Select all (Ctrl+A)
   - Copy (Ctrl+C)

4. **Paste into Code.gs**
   - Paste (Ctrl+V)
   - Save (Ctrl+S)

5. **Verify these lines are correct:**
   ```javascript
   const SPREADSHEET_ID = '1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw';
   const WRITE_TOKEN = 'acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8';
   ```

---

### Step 2: Run Setup Functions

1. **Select `setupSheets` from the function dropdown (top of editor)**
2. **Click Run ▶️**
3. **Authorize the script:**
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
4. **Check the logs:**
   - Should see: "✅ All sheets created successfully!"

5. **Select `addSampleData` from dropdown**
6. **Click Run ▶️**
7. **Check logs:**
   - Should see: "✅ Sample data setup complete!"

---

### Step 3: Redeploy (Important!)

1. **Click Deploy → Manage deployments**
2. **Click the pencil/edit icon ✏️ next to your existing deployment**
3. **Click "Version" dropdown → Select "New version"**
4. **Click "Deploy"**
5. **The URL stays the same** (good - no need to update Netlify)

---

### Step 4: Test It Works

**Open this URL in a new browser tab:**
```
https://script.google.com/macros/s/AKfycbx5IXs4VVAxcOO2NkSo1je5HCOXNztBFScVOlgPlwdJ_KigJ_5OCkU-kHF3RJalKm8D/exec?range=Impact%20Metrics!A1:B2
```

**Expected result:**
```json
{
  "values": [
    ["timestamp", "studentsReached"],
    ["2025-10-25T12:00:00Z", 8500]
  ]
}
```

**If you see this JSON, it's working! ✅**

---

## 🎯 Then Add to Netlify

Once the Apps Script is working, add these to Netlify:

**Go to:** Netlify Dashboard → Site Settings → Environment Variables

### Add Variable 1:
```
Key:   VITE_SHEETS_WEBAPP_URL
Value: https://script.google.com/macros/s/AKfycbx5IXs4VVAxcOO2NkSo1je5HCOXNztBFScVOlgPlwdJ_KigJ_5OCkU-kHF3RJalKm8D/exec
```

### Add Variable 2:
```
Key:   VITE_GOOGLE_SHEETS_ID
Value: 1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw
```

### Add Variable 3:
```
Key:   VITE_SHEETS_WRITE_TOKEN
Value: acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

**Save → Trigger new deploy → Done!**

---

## 🐛 Troubleshooting

### Still getting 500 error?
1. Check Apps Script **Executions** tab for error details
2. Make sure you clicked "Deploy" after updating code
3. Try "New version" when redeploying

### "Cannot find range" error?
- Make sure you ran `setupSheets()` function
- Check that sheets were created in your spreadsheet

### "Access denied" error?
- Make sure you authorized the script
- Check that you own the spreadsheet with ID `1Kl9VhaZGZKKyTChFfFNr7jS_C86OSgcwtzrOh3PKkhw`

---

## ✅ Quick Checklist

- [ ] Open Apps Script project
- [ ] Delete old code
- [ ] Paste code from `GOOGLE_APPS_SCRIPT_PRODUCTION.js`
- [ ] Save
- [ ] Run `setupSheets()` → Authorize
- [ ] Run `addSampleData()`
- [ ] Deploy → Manage deployments → Edit → New version → Deploy
- [ ] Test URL in browser (should return JSON)
- [ ] Add 3 variables to Netlify
- [ ] Trigger Netlify deploy
- [ ] Visit `/live-data` on your site

**When all checked, you're live! 🎉**

