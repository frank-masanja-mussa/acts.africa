# 🔐 Complete Environment Variables Guide

## ✅ Your Production Environment Variables

All values are ready to use - no placeholders!

---

## 📁 For Local Development (.env file)

Create a `.env` file in your project root and paste this:

```env
# ACTS.Africa Local Development Environment Variables

VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

**Then run:**
```bash
npm run dev
```

Visit `http://localhost:5173/live-data` and you'll see real data!

---

## 🌐 For Netlify (Production)

Go to: **Netlify Dashboard → Your Site → Site Settings → Environment Variables**

Click **"Add variable"** for each:

### Variable 1:
```
Key:   VITE_SHEETS_WEBAPP_URL
Value: https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
```

### Variable 2:
```
Key:   VITE_GOOGLE_SHEETS_ID
Value: 1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
```

### Variable 3:
```
Key:   VITE_SHEETS_WRITE_TOKEN
Value: acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

**Then:**
- Click **Save**
- Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

## 📋 What Each Variable Does

### `VITE_SHEETS_WEBAPP_URL` (Required)
- Your Google Apps Script Web App endpoint
- Used for both reading and writing data
- This is your working API URL

### `VITE_GOOGLE_SHEETS_ID` (Required)
- Your Google Spreadsheet ID
- Used to generate direct links to your spreadsheet
- Your spreadsheet: https://docs.google.com/spreadsheets/d/1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q/edit

### `VITE_SHEETS_WRITE_TOKEN` (Required)
- Secure token for write operations
- Must match the `WRITE_TOKEN` in your Apps Script
- Prevents unauthorized data modifications

### `VITE_GOOGLE_SHEETS_API_KEY` (Optional)
- Only needed if using direct Google Sheets API
- Not required since you're using Apps Script Web App
- Can be left out

---

## 🧪 Test Your Setup

### Test Locally:
```bash
# 1. Create .env file with the variables above
# 2. Run the dev server
npm run dev

# 3. Open browser
http://localhost:5173/live-data

# Should show real data from Google Sheets!
```

### Test Production:
```bash
# After deploying to Netlify
https://your-site.netlify.app/live-data

# Should show the same real data!
```

---

## 🔒 Security Notes

✅ **DO:**
- Keep `.env` file in `.gitignore` (already done)
- Use Netlify's environment variables for production
- Keep your write token secret

❌ **DON'T:**
- Commit `.env` to Git
- Share your write token publicly
- Hardcode credentials in your code

---

## 📊 Your Resources

| Resource | URL |
|----------|-----|
| **Spreadsheet** | https://docs.google.com/spreadsheets/d/1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q/edit |
| **API Endpoint** | https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec |
| **Apps Script** | https://script.google.com |

---

## ✅ Quick Checklist

- [ ] `.env` file created locally (for development)
- [ ] 3 variables added to Netlify (for production)
- [ ] Netlify site deployed
- [ ] `/live-data` page shows real data
- [ ] No errors in browser console

**When all checked, you're fully operational! 🚀**

