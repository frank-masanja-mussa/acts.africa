# 🚀 Quick Start: Test Your Google Sheets Connection

## ⚡ 3-Step Test (2 Minutes)

### **Step 1: Create `.env` File**

In your project root, create a file named `.env` and paste this:

```env
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

---

### **Step 2: Run Dev Server**

```bash
npm run dev
```

---

### **Step 3: Test Connection**

Open in browser:
```
http://localhost:5173/test-connection
```

Click **"Run Connection Tests"**

---

## ✅ Expected Results

All 4 tests should pass:

```
✅ Environment Variables - All required variables are set
✅ Direct API Call - Successfully fetched data. Got 3 rows
✅ getImpactMetrics() - Successfully parsed impact metrics
✅ Write Test - Successfully wrote test data. Inserted 1 row(s)
```

---

## 📊 Then Check Live Data

Visit:
```
http://localhost:5173/live-data
```

You should see:
- **Students Reached:** 8500 (or 9999 if write test ran)
- **Schools Participating:** 42 (or 99)
- **Teachers Trained:** 350 (or 999)
- etc.

---

## 🌐 Deploy to Netlify

### **1. Add Environment Variables to Netlify:**

Go to: **Netlify Dashboard → Site Settings → Environment Variables**

Add these 3:
```
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec

VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q

VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

### **2. Trigger Deploy:**

Netlify will auto-deploy from your GitHub push, or manually trigger:
- Go to **Deploys** tab
- Click **Trigger deploy** → **Deploy site**

### **3. Test Production:**

Visit:
```
https://your-site.netlify.app/test-connection
```

Run tests - all should pass!

Then visit:
```
https://your-site.netlify.app/live-data
```

Should show real data! 🎉

---

## ❌ Troubleshooting

### Issue: Tests fail locally
1. Make sure `.env` file exists in project root
2. Restart dev server
3. Check browser console (F12) for errors

### Issue: Tests pass locally but fail on Netlify
1. Verify environment variables are set in Netlify
2. Make sure you clicked "Save"
3. Trigger a new deploy
4. Wait for deploy to complete

### Issue: "Apps Script error: 500"
1. Go to https://script.google.com
2. Check execution logs
3. Make sure `SPREADSHEET_ID` is correct
4. Redeploy Apps Script

---

## 📝 Quick Checklist

- [ ] `.env` file created
- [ ] Dev server running
- [ ] `/test-connection` page loads
- [ ] All 4 tests pass locally
- [ ] `/live-data` shows real data locally
- [ ] Environment variables added to Netlify
- [ ] Netlify deployed
- [ ] Tests pass on production
- [ ] Live data shows on production

**All checked? You're live! 🚀**

