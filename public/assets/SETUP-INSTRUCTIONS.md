# Setup Instructions for Production Deployment

## Required Image: pod-dashboard.webp

To complete the production deployment, you need to replace the placeholder `pod-dashboard.webp` file with the actual dashboard screenshot.

### Steps to Add the Image:

1. **Export the Dashboard Screenshot**
   - Take the uploaded POD dashboard screenshot image
   - Convert it to WebP format (use tools like Squoosh.app or ImageMagick)
   - Recommended dimensions: 1920x1080 or higher for crisp display
   - Optimize for web (target ~200-500KB file size)

2. **Save to This Directory**
   - Save the optimized image as: `/public/assets/pod-dashboard.webp`
   - Overwrite the existing placeholder file

3. **Verify the Image**
   - The image should be accessible at: `https://yourdomain.com/assets/pod-dashboard.webp`
   - The DashboardMockup component is already configured to use this path

### Command Line Instructions (if using ImageMagick):

```bash
# Convert PNG to WebP with optimization
magick input-dashboard.png -quality 85 -define webp:method=6 /public/assets/pod-dashboard.webp
```

### Online Tools:

- **Squoosh**: https://squoosh.app/ (drag and drop, export as WebP)
- **CloudConvert**: https://cloudconvert.com/png-to-webp
- **TinyPNG**: https://tinypng.com/ (then convert to WebP)

### Current Implementation:

The image is referenced in:
- `/src/app/components/DashboardMockup.tsx` - Line ~33
- Used on Home page (hero section)
- Used on Projects page (POD project showcase)

All image paths use the standard format: `src="/assets/pod-dashboard.webp"`

This ensures compatibility with:
- ✅ Vite development server
- ✅ Vercel production builds
- ✅ Static file hosting
- ✅ CDN caching

### Testing Locally:

After adding the image, test with:
```bash
npm run dev
```

The image should appear in the laptop mockup on the home page.

### Deployment:

Once the image is added, deploy to Vercel:
```bash
vercel --prod
```

The image will be automatically included in the deployment and served from the `/assets` path.
