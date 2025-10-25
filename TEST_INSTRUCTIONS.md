# 🧪 Testing Your Google Sheets Integration

## 🎯 Quick Test Page

I've created a comprehensive test page to diagnose any connection issues.

### **Access the Test Page:**

**Local Development:**
```
http://localhost:5173/test-connection
```

**Production (after deploy):**
```
https://your-site.netlify.app/test-connection
```

---

## 🔍 What the Test Page Does

The test page will automatically check:

1. ✅ **Environment Variables** - Are all 3 variables set?
2. ✅ **Direct API Call** - Can we reach your Apps Script?
3. ✅ **Read Function** - Does `getImpactMetrics()` work?
4. ✅ **Write Function** - Can we write test data?

---

## 🚀 How to Use

### **Step 1: Run Locally First**

1. **Create `.env` file** in project root:
```env
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

2. **Start dev server:**
```bash
npm run dev
```

3. **Open test page:**
```
http://localhost:5173/test-connection
```

4. **Click "Run Connection Tests"**

5. **Check results:**
   - ✅ Green = Working
   - ❌ Red = Problem
   - ⏳ Gray = In progress

---

### **Step 2: Fix Any Issues**

#### ❌ **If "Environment Variables" fails:**
- Make sure `.env` file exists in project root
- Check that all 3 variables are set
- Restart dev server (`npm run dev`)

#### ❌ **If "Direct API Call" fails:**
- Check that your Apps Script is deployed
- Test the URL directly in browser:
  ```
  https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec?range=Impact%20Metrics!A1:B2
  ```
- Should return JSON with data
- If it returns error, check Apps Script code

#### ❌ **If "getImpactMetrics()" fails:**
- Check browser console (F12) for detailed error
- Verify sheet name is exactly "Impact Metrics"
- Check that data exists in the sheet

#### ❌ **If "Write Test" fails:**
- Check that `VITE_SHEETS_WRITE_TOKEN` matches Apps Script `WRITE_TOKEN`
- Verify Apps Script has write permissions
- Check Apps Script execution logs

---

### **Step 3: Test on Netlify**

1. **Make sure environment variables are set in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add all 3 variables
   - Save

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add connection test page"
   git push origin main
   ```

3. **Visit test page on production:**
   ```
   https://your-site.netlify.app/test-connection
   ```

4. **Run tests** and verify all pass

---

## 📊 Expected Results

### ✅ **All Tests Passing:**

```
✅ Environment Variables
   All required variables are set

✅ Direct API Call
   Successfully fetched data. Got 3 rows

✅ getImpactMetrics()
   Successfully parsed impact metrics
   {
     "studentsReached": 8500,
     "schoolsParticipating": 42,
     ...
   }

✅ Write Test
   Successfully wrote test data. Inserted 1 row(s)
```

### 📝 **After Tests Pass:**

1. Check your Google Sheet
2. You should see a new row with test data (9999, 99, 999, etc.)
3. Go to `/live-data` page
4. Should show real data from your sheet

---

## 🔧 Common Issues & Fixes

### Issue: "VITE_SHEETS_WEBAPP_URL is NOT SET"
**Fix:** Create `.env` file with the variables

### Issue: "Apps Script error: 500"
**Fix:** 
- Go to Apps Script
- Check execution logs for errors
- Make sure `SPREADSHEET_ID` is correct in Apps Script

### Issue: "Unauthorized - invalid token"
**Fix:** 
- Token in `.env` must match token in Apps Script
- Both should be: `acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8`

### Issue: "Sheet not found: Impact Metrics"
**Fix:**
- Open your spreadsheet
- Make sure sheet is named exactly "Impact Metrics" (case-sensitive)
- Check for extra spaces

---

## ✅ Checklist

- [ ] `.env` file created with 3 variables
- [ ] Dev server running (`npm run dev`)
- [ ] Test page accessible (`/test-connection`)
- [ ] All 4 tests passing locally
- [ ] Environment variables added to Netlify
- [ ] Code pushed to GitHub
- [ ] Netlify deployed
- [ ] All 4 tests passing on production
- [ ] `/live-data` page shows real data

**When all checked, your integration is working perfectly!** 🎉

---

## 🆘 Still Having Issues?

1. Open browser console (F12)
2. Go to Console tab
3. Run tests
4. Copy any error messages
5. Check Apps Script execution logs
6. Verify spreadsheet structure matches expected format

