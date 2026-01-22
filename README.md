# Hupscale Website - Complete Source Code

## Overview

This archive contains the **complete, up-to-date source code** for the Hupscale website with all mobile responsiveness fixes applied.

---

## What's Included

### Complete Next.js Project
- All source code files (TypeScript, React components)
- All pages and routing configuration
- All styles (Tailwind CSS, global CSS)
- All public assets (images, videos, PDFs, fonts)
- All configuration files (Next.js, TypeScript, ESLint, etc.)
- All localization files (French and English translations)

### Excluded for Size Optimization
- `node_modules` (install with `npm install`)
- `.next` (build directory, regenerated with `npm run build`)
- `.git` (version control, can be reinitialized)

---

## Quick Start

### 1. Extract the Archive
```bash
tar -xzf hupscale_website_complete_updated.tar.gz
cd hupscale_fresh
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js 15.1.3
- React 18
- Tailwind CSS
- TypeScript
- And all other dependencies

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website locally.

### 4. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `out` directory.

### 5. Deploy to GitHub Pages
```bash
# Configure git (if needed)
git init
git remote add origin https://github.com/LongRodSilver/Hupscale_Finale.git

# Commit and push
git add -A
git commit -m "Deploy updated website"
git push origin main
```

GitHub Actions will automatically deploy to: https://longrodsilver.github.io/Hupscale_Finale/

---

## Project Structure

```
hupscale_fresh/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── livre-dor/                # Guest book page
│       ├── page.tsx
│       └── layout.tsx
├── components/                   # React components
│   ├── ContactSection.tsx        # Contact section (FIXED)
│   ├── PdfModal.tsx              # PDF viewer modal
│   ├── TestimonialForm.tsx       # Guest book form
│   └── ui/                       # UI components (Card, Button, etc.)
├── contexts/                     # React contexts
│   └── LanguageContext.tsx       # Language switching
├── hooks/                        # Custom React hooks
│   └── useTranslations.ts        # Translation hook
├── locales/                      # Translations
│   ├── en/
│   │   └── translation.json      # English translations
│   └── fr/
│       └── translation.json      # French translations
├── public/                       # Static assets
│   ├── *.jpg, *.png              # Images
│   ├── *.svg                     # Icons
│   ├── *.mp4                     # Videos
│   ├── *.pdf                     # PDF documents
│   └── fonts/                    # Custom fonts
├── lib/                          # Utility functions
│   └── utils.ts
├── .github/                      # GitHub Actions
│   └── workflows/
│       └── deploy.yml            # Auto-deployment
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── middleware.ts                 # Next.js middleware
```

---

## All Fixes Applied

### 1. Testimonials Profile Pictures (Fixed)
- **Issue**: Images missing on mobile
- **Fix**: Added `getImagePath()` wrapper
- **File**: `app/page.tsx` line 1438

### 2. About Us Vertical Scrollbar (Fixed)
- **Issue**: Internal scrollbar on mobile
- **Fix**: Changed CardContent `h-full` to `h-auto`
- **File**: `app/page.tsx` line 1113

### 3. Contact Us Vertical Scrollbar (Fixed - New Approach)
- **Issue**: Internal scrollbar on mobile
- **Fix**: Applied `min-h-screen` approach
- **File**: `components/ContactSection.tsx` lines 9, 10, 13

### 4. Contact Cards Horizontal Scrollbar (Fixed)
- **Issue**: Horizontal overflow on mobile
- **Fix**: Changed `hover:scale-105` to `md:hover:scale-105`
- **File**: `components/ContactSection.tsx` lines 26, 56, 82

---

## Features

### Sections
- Hero with video background
- Benefits with category icons
- Services (About Us) with animated cards
- Idea to Execution process
- Testimonials with Google Sheets integration
- Team members with snap scroll
- FAQ with expandable questions
- Contact Us with 3 cards
- Guest Book page

### Functionality
- Bilingual support (French/English)
- Language switcher in header
- Google Sheets API for testimonials
- PDF modal viewer (no download)
- Stripe Payment Link integration
- Calendly appointment booking
- Responsive design for all devices
- Sticky scroll sections
- Snap scroll on mobile
- Touch-friendly interactions

---

## Configuration

### Environment Variables
If you need to configure Google Sheets API or other services, create a `.env.local` file:

```env
# Google Sheets (if needed)
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_sheet_id

# Other configurations as needed
```

### GitHub Pages Configuration
The project is configured for GitHub Pages deployment with:
- `next.config.js` with `output: 'export'` and `basePath`
- `.github/workflows/deploy.yml` for automatic deployment
- `.nojekyll` file in public directory

---

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server (not used for static export)

# Linting
npm run lint         # Run ESLint
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

---

## Performance

- **Main page**: 27.7 kB (142 kB First Load JS)
- **Guest book**: 4.76 kB
- **Static site**: Fast loading, no server-side rendering needed
- **Optimized images**: Next.js image optimization
- **Code splitting**: Automatic with Next.js

---

## Troubleshooting

### Build Errors
If you encounter build errors:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Git Issues
If you need to reinitialize git:
```bash
git init
git remote add origin https://github.com/LongRodSilver/Hupscale_Finale.git
git fetch origin main
git reset --hard origin/main
```

---

## Support

For issues or questions:
1. Check the documentation files included
2. Review GitHub Actions logs for deployment issues
3. Verify all dependencies are installed correctly
4. Ensure Node.js version is compatible (v18 or higher recommended)

---

## License

This is proprietary code for Hupscale. All rights reserved.

---

## Contact

- **Email**: contact@hupscale.com
- **Website**: https://longrodsilver.github.io/Hupscale_Finale/

---

## Version Information

- **Date**: January 22, 2026
- **Commit**: 33bbb8a
- **Next.js**: 15.1.3
- **React**: 18
- **Node.js**: 22.13.0 (recommended)
- **Status**: Production-ready ✅

---

## Summary

This source code archive contains everything you need to:
- ✅ Run the website locally for development
- ✅ Build the website for production
- ✅ Deploy to GitHub Pages or any static hosting
- ✅ Modify and customize the website
- ✅ Maintain and update the codebase

All mobile responsiveness issues have been fixed and the website is fully functional on all devices!
