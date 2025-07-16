# Large Files Notice

The 360° panorama image (`RANGE-360.jpg`) is not included in this repository due to its large file size.

## For Deployment:

### Option 1: Netlify Large Media (Recommended)
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify lm:setup`
3. Track the image: `git lfs track "public/images/*.jpg"`
4. Add and commit: `git add . && git commit -m "Track large files"`

### Option 2: External CDN
Upload the image to a CDN like:
- Cloudinary
- Imgix
- AWS S3

Then update the image path in `src/layouts/BaseLayout.astro`:
```javascript
"panorama": "https://your-cdn.com/RANGE-360.jpg",
```

### Option 3: Manual Upload
After deploying to Netlify:
1. Use Netlify's web interface to upload the file
2. Or use Netlify CLI: `netlify deploy --dir=public/images`

## Image Optimization

Consider optimizing the 360° image:
- Target size: Under 2MB
- Format: Progressive JPEG
- Resolution: 4096x2048 or lower
- Tools: TinyJPG, ImageOptim, or Squoosh
