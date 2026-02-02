# 🚀 Quick Deploy Guide

## Before You Deploy

### 1️⃣ Add Dashboard Screenshot
```bash
# Save your POD dashboard screenshot as:
/public/assets/pod-dashboard.webp

# Recommended: Use Squoosh.app to convert PNG → WebP
# Target: ~200-500KB, 1920x1080px, quality 85%
```

### 2️⃣ Test Locally
```bash
npm run dev
# Visit: http://localhost:5173/test-assets.html
# Should see: ✅ Image loaded successfully!
```

### 3️⃣ Deploy to Vercel
```bash
vercel --prod
```

## What Changed

| Before | After |
|--------|-------|
| `import img from 'figma:asset/...'` | `<img src="/assets/pod-dashboard.webp" />` |
| Virtual module imports | Standard public folder assets |
| Build-time bundling | CDN-served static files |

## File Locations

```
portfolio-website/
├── public/
│   ├── assets/
│   │   ├── pod-dashboard.webp  ← Add actual image here
│   │   ├── README.md
│   │   └── SETUP-INSTRUCTIONS.md
│   └── test-assets.html
├── src/
│   └── app/
│       └── components/
│           └── DashboardMockup.tsx  ← Updated to use /assets/
├── vercel.json  ← Updated with asset routing
└── IMAGE-MIGRATION-SUMMARY.md  ← Full details
```

## Verification Commands

```bash
# Check structure
ls -la public/assets/

# Search for old imports
grep -r "figma:asset" src/

# Search for new paths
grep -r "/assets/" src/

# Run verification script
bash verify-migration.sh
```

## Production URLs

After deployment, verify these URLs return 200:
- `https://yourdomain.com/assets/pod-dashboard.webp` (should show dashboard)
- `https://yourdomain.com/` (hero should show mockup)
- `https://yourdomain.com/projects` (POD project should show mockup)

## Troubleshooting

### Image doesn't appear
1. Check file exists: `ls public/assets/pod-dashboard.webp`
2. Restart dev server: Stop and run `npm run dev` again
3. Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### 404 on production
1. Verify file in repository
2. Check Vercel build logs
3. Force redeploy: `vercel --prod --force`

## Image Requirements

- **Format**: WebP (best compression/quality)
- **Dimensions**: 1920x1080px or higher (will scale down automatically)
- **File Size**: Target 200-500KB (use quality 80-90%)
- **Color Space**: RGB
- **Optimization**: Use Squoosh.app, ImageOptim, or similar

## CDN & Caching

The `vercel.json` is configured to:
- Serve assets from Vercel's global CDN
- Cache for 1 year (immutable)
- Automatically compress and optimize
- Serve from nearest edge location to users

## Support Files

- `IMAGE-MIGRATION-SUMMARY.md` - Complete migration details
- `DEPLOYMENT-CHECKLIST.md` - Full deployment checklist
- `/public/assets/SETUP-INSTRUCTIONS.md` - Image setup guide
- `/public/test-assets.html` - Asset testing page

---

**Status**: ✅ Ready for deployment (after adding dashboard image)
