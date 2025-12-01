# 🚀 Deploy Hupscale to GitHub Pages

## Quick Deployment Guide

Your mobile-responsive Hupscale website is ready to deploy to GitHub Pages!

---

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

---

## 🔧 Step-by-Step Deployment

### Step 1: Build the Website

```bash
cd hupscale
npm install
npm run build
```

This will create an `out` folder with your static website.

### Step 2: Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Mobile responsive Hupscale website"
```

### Step 3: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Name it **"Hupscale"** (must match the basePath in next.config.js)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click **"Create repository"**

### Step 4: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Hupscale.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy to GitHub Pages

#### Option A: Using gh-pages package (Recommended)

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**
   
   Open `package.json` and add this to the `"scripts"` section:
   ```json
   "deploy": "npm run build && gh-pages -d out"
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

#### Option B: Manual GitHub Pages Setup

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch: **gh-pages** and folder: **/ (root)**
5. Click **Save**

### Step 6: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/Hupscale/
```

⏱️ **Note:** It may take 2-5 minutes for the site to be live after first deployment.

---

## 🔄 Update Your Website

Whenever you make changes:

```bash
# Make your changes to the code
git add .
git commit -m "Description of changes"
git push origin main

# Deploy updated version
npm run deploy
```

---

## ⚙️ Configuration Explained

Your `next.config.js` is already configured for GitHub Pages:

```javascript
const nextConfig = {
  output: 'export',              // Static export for GitHub Pages
  trailingSlash: true,           // Adds trailing slashes to URLs
  assetPrefix: '/Hupscale',      // Repository name prefix
  basePath: '/Hupscale',         // Base path for routing
  images: {
    unoptimized: true,           // Required for static export
  }
}
```

**Important:** The repository name **must be "Hupscale"** to match the configuration, or you need to update `assetPrefix` and `basePath` in `next.config.js`.

---

## 🐛 Troubleshooting

### Issue: 404 Error on GitHub Pages

**Solution:**
1. Make sure repository name is exactly **"Hupscale"**
2. Check that GitHub Pages is enabled in repository settings
3. Verify the branch is set to **gh-pages**
4. Wait 2-5 minutes after deployment

### Issue: CSS/Images Not Loading

**Solution:**
1. Verify `assetPrefix` and `basePath` in `next.config.js` match your repository name
2. Rebuild and redeploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Issue: "gh-pages not found"

**Solution:**
```bash
npm install --save-dev gh-pages
```

### Issue: Changes Not Showing

**Solution:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait a few minutes for GitHub Pages to update
3. Check if deployment was successful:
   ```bash
   git log origin/gh-pages
   ```

---

## 📱 Verify Mobile Responsiveness

After deployment, test your live site:

1. **Open the GitHub Pages URL** in your browser
2. **Press F12** to open DevTools
3. **Click the device icon** (Ctrl+Shift+M)
4. **Select different devices** (iPhone, iPad, etc.)
5. **Test all features:**
   - Navigation menu
   - Service selection
   - Testimonials carousel
   - FAQ accordion
   - Touch interactions

---

## 🔐 Using Custom Domain (Optional)

If you want to use your own domain (e.g., hupscale.com):

1. **Update next.config.js:**
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     assetPrefix: '',        // Remove this for custom domain
     basePath: '',           // Remove this for custom domain
     images: {
       unoptimized: true,
     }
   }
   ```

2. **Add CNAME file** in the `public` folder:
   ```
   yourdomain.com
   ```

3. **Configure DNS** with your domain provider:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `YOUR_USERNAME.github.io`

4. **Enable custom domain** in GitHub repository settings

---

## 📊 Deployment Checklist

Before deploying:

- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run build` to test the build locally
- [ ] Check that `out` folder is created successfully
- [ ] Verify repository name matches `basePath` in next.config.js
- [ ] Test the website locally before deploying
- [ ] Commit all changes to git
- [ ] Push to GitHub main branch

After deploying:

- [ ] Wait 2-5 minutes for GitHub Pages to build
- [ ] Visit your GitHub Pages URL
- [ ] Test on desktop browser
- [ ] Test on mobile devices (or use DevTools)
- [ ] Check all pages and links work
- [ ] Verify images and CSS load correctly
- [ ] Test navigation menu on mobile
- [ ] Test interactive features (carousel, FAQ, etc.)

---

## 🚀 Quick Commands Reference

```bash
# Initial setup
npm install
npm run build
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Hupscale.git
git push -u origin main

# Install deployment tool
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy

# Update and redeploy
git add .
git commit -m "Update description"
git push origin main
npm run deploy
```

---

## 📝 Package.json Scripts

Make sure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

---

## 🌐 Alternative Deployment Options

If GitHub Pages doesn't work for you, consider these alternatives:

### Vercel (Easiest for Next.js)
```bash
npm install -g vercel
vercel
```
✅ Automatic deployments
✅ Custom domains
✅ Better performance
✅ Free tier available

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```
✅ Drag-and-drop deployment
✅ Continuous deployment
✅ Free tier available

---

## 📞 Support

If you encounter issues:

1. **Check GitHub Actions** tab in your repository for build errors
2. **Review GitHub Pages settings** in repository settings
3. **Clear browser cache** and try again
4. **Check browser console** (F12) for errors
5. **Verify configuration** in next.config.js

---

## ✅ Success!

Once deployed, your mobile-responsive Hupscale website will be live at:

```
https://YOUR_USERNAME.github.io/Hupscale/
```

Share this URL to show off your fully responsive, mobile-friendly website! 🎉

---

**Need help?** Check the troubleshooting section above or review the other documentation files included in the package.
