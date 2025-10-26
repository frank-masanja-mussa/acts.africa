# 🚀 ACTS.Africa - Production Deployment

## 📋 Environment Variables

### Netlify Configuration
Add these to: **Site Settings → Environment Variables**

```
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

### Local Development
Create `.env` file in project root:

```env
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbyZGr8TJLA_nrPmmG3tcGPFZuoxq0qK55vcL9YQcJB7OBjv5P7ZQm_zWEVv7Onx_8kc/exec
VITE_GOOGLE_SHEETS_ID=1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q
VITE_SHEETS_WRITE_TOKEN=acts_africa_f9c732777f663f515fc9b8b6dce3c21e3e0a7d5f249f6e3ab5c5173cb97126d8
```

---

## 🔧 Google Apps Script Setup

1. Go to https://script.google.com
2. Copy contents of `FINAL_APPS_SCRIPT.js`
3. Paste into Code.gs
4. Run `setupSurveyResponsesSheet()` (if not already done)
5. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Access: **Anyone**

---

## 🧪 Testing

### Local
```bash
npm run dev
```
Visit: http://localhost:5173/test-connection

### Production
After deploying to Netlify, visit: `/test-connection`

---

## 📊 Resources

- **Spreadsheet:** https://docs.google.com/spreadsheets/d/1DRjVUz5Twf1KnSEnEedauviAIX7ka7GpLgKqhlW853Q/edit
- **Apps Script:** https://script.google.com

---

## ✅ Features

- ✅ Full Google Sheets integration (read/write)
- ✅ Tanzania survey with real-time data
- ✅ Live data dashboard
- ✅ Secure token authentication
- ✅ No mock data - production ready

