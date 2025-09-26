# Netlify Deployment Guide for ACTS.Africa

## Prerequisites
- GitHub repository: `https://github.com/frank-masanja-mussa/acts.africa.git`
- Domain: `acts.africa` (configured in Namecheap)
- Netlify account

## Step 1: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" as your Git provider
4. Select your repository: `frank-masanja-mussa/acts.africa`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or latest)
6. Click "Deploy site"

### Option B: Manual Deploy
1. Build your project locally:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to the deploy area

## Step 2: Configure Custom Domain

1. In your Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `acts.africa`
4. Click **Verify** and **Add domain**

## Step 3: Configure DNS in Namecheap

You need to update your DNS records in Namecheap to point to Netlify:

### Current DNS Records to Update:
1. **Remove existing records:**
   - CNAME Record: `www` → `parkingpage.namecheap.com.`
   - URL Redirect Record: `@` → `http://www.acts.africa/`

### Add New DNS Records:
1. **A Record:**
   - Host: `@`
   - Value: `75.2.60.5` (Netlify's IP)
   - TTL: `30 min`

2. **CNAME Record:**
   - Host: `www`
   - Value: `acts-africa.netlify.app` (or your Netlify subdomain)
   - TTL: `30 min`

### Alternative (Recommended): Use Netlify Nameservers
1. In Netlify, go to **Site settings** → **Domain management**
2. Click on your domain `acts.africa`
3. Go to **DNS** tab
4. Copy the nameservers provided by Netlify
5. In Namecheap, go to **Domain List** → **Manage** → **Advanced DNS**
6. Change nameservers to Netlify's nameservers

## Step 4: SSL Certificate
- Netlify automatically provides SSL certificates
- It may take a few minutes to provision
- Your site will be available at `https://acts.africa`

## Step 5: Verify Deployment
1. Check that your site loads at `https://acts.africa`
2. Test all routes and functionality
3. Verify that the SSL certificate is active

## Build Configuration Files Included

### `netlify.toml`
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18
- Redirect rules for SPA routing
- Security headers
- Cache optimization

### `_redirects`
- Handles client-side routing for React Router

### `public/_headers`
- Security headers for all pages
- Cache optimization for static assets

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Node version (should be 18+)
2. **404 on refresh**: Ensure `_redirects` file is in place
3. **DNS not working**: Wait 24-48 hours for DNS propagation
4. **SSL issues**: Wait for certificate provisioning (usually 5-10 minutes)

### Support:
- Netlify Documentation: https://docs.netlify.com/
- Netlify Community: https://community.netlify.com/

## Next Steps After Deployment
1. Set up form handling (if needed)
2. Configure analytics
3. Set up continuous deployment from GitHub
4. Configure environment variables (if needed)
5. Set up branch previews for testing
