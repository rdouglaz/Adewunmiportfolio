# Assets Directory

This directory contains static assets that are served directly in production builds.

## Required Images

### pod-dashboard.webp
- **Purpose**: Screenshot of the POD Property Operations Dashboard
- **Format**: WebP (optimized for web)
- **Recommended dimensions**: 1920x1080 or higher
- **Source**: Export from the uploaded dashboard screenshot
- **Usage**: Used in the DashboardMockup component on Home and Projects pages

## Adding Images

1. Place your image files in this directory
2. Reference them in your components using `/assets/filename.ext`
3. Example: `<img src="/assets/pod-dashboard.webp" alt="Description" />`

## Optimization Tips

- Use WebP format for better compression and quality
- Optimize images before uploading (use tools like Squoosh or ImageOptim)
- Consider responsive images for different screen sizes
- Use lazy loading for images below the fold

## Vercel Deployment

All files in the `/public` directory are automatically served at the root path in Vercel deployments.
No special configuration is needed.
