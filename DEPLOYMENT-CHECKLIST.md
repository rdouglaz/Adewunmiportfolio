# Production Deployment Checklist

## ✅ Completed Items

- [x] Created `/public/assets` directory structure
- [x] Updated `DashboardMockup.tsx` to use standard image paths (`/assets/pod-dashboard.webp`)
- [x] Removed all `figma:asset` import references
- [x] Added image loading fallback for development
- [x] Updated `vercel.json` with proper static asset routing and caching headers
- [x] Added comprehensive setup documentation

## ⚠️ Required Before Deployment

### 1. Add Dashboard Screenshot
**File**: `/public/assets/pod-dashboard.webp`

**Current Status**: Placeholder file exists, needs actual image

**Action Required**:
1. Export the POD dashboard screenshot from the uploaded images
2. Convert to WebP format (recommended: 1920x1080, ~200-500KB)
3. Save as `/public/assets/pod-dashboard.webp`
4. Verify locally by running `npm run dev`

**Tools to Convert**:
- Squoosh.app (online, drag-and-drop)
- ImageMagick: `magick input.png -quality 85 -define webp:method=6 output.webp`
- CloudConvert.com

### 2. Optional: Add Favicon
**Files**: 
- `/public/favicon.ico`
- `/public/favicon-16x16.png`
- `/public/favicon-32x32.png`
- `/public/apple-touch-icon.png`

**Action**: Add POD branding icons for browser tabs and bookmarks

## 🚀 Deployment Configuration

### Vercel Settings
The `vercel.json` is now configured with:
- Static asset routing for `/assets/*`
- Cache headers (1 year immutable for assets)
- Client-side routing fallback for SPA

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

### Environment Variables (if needed)
- `VITE_SUPABASE_URL` (already configured)
- `VITE_SUPABASE_ANON_KEY` (already configured)

## 🔍 Pre-Deployment Testing

### Local Testing
```bash
# Development mode
npm run dev

# Production build preview
npm run build
npm run preview
```

### Verification Checklist
- [ ] Dashboard mockup displays correctly on Home page
- [ ] Dashboard mockup displays correctly on Projects page
- [ ] Image loads without errors in browser console
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All navigation links work
- [ ] Contact form submits to Supabase
- [ ] Request Access modal functions properly

## 📦 Deployment Commands

### Deploy to Vercel Production
```bash
vercel --prod
```

### Or use Vercel CLI
```bash
# Link project (first time only)
vercel link

# Deploy to production
vercel --prod
```

### Or use Git Integration
Simply push to your main/master branch, and Vercel will auto-deploy

## ✨ Post-Deployment Verification

After deployment, verify:
1. Visit: `https://yourdomain.com`
2. Check: Dashboard mockup appears in hero section
3. Navigate: to `/projects` page
4. Verify: Dashboard mockup appears in POD project
5. Test: Request Access modal
6. Confirm: All images load with no 404 errors

### Check Image URL
Direct link: `https://yourdomain.com/assets/pod-dashboard.webp`
Should return: 200 OK with the dashboard image

## 📝 Notes

- **Image Fallback**: Currently uses Unsplash placeholder during development
- **Asset Caching**: Set to 1 year immutable for performance
- **SEO**: Image has proper alt text for accessibility
- **Performance**: WebP format provides best compression/quality ratio
- **CDN**: Vercel automatically serves assets via global CDN

## 🐛 Troubleshooting

### If image doesn't load in production:
1. Verify file exists: `/public/assets/pod-dashboard.webp`
2. Check file permissions (should be readable)
3. Clear Vercel cache: `vercel --prod --force`
4. Check browser console for 404 errors
5. Verify vercel.json is deployed with the build

### If image is too large:
1. Optimize with Squoosh.app (target < 500KB)
2. Reduce dimensions if necessary
3. Adjust WebP quality setting (70-85 is usually optimal)

## 📞 Support

If issues persist:
- Check Vercel deployment logs
- Review browser DevTools Network tab
- Verify public folder is included in build output
