# Gun Range Insurance Website

A modern, responsive website for gun range insurance services built with Astro, React, and Three.js, featuring an immersive 360° panoramic background.

## Features

- 🎯 360° HDR panoramic background using Three.js
- 🎨 Modern glassmorphism design with gun range themed colors
- 📱 Fully responsive layout
- ⚡ Built with Astro for optimal performance
- 🎭 Smooth animations with Framer Motion
- 🔧 TypeScript support
- 🎪 Tailwind CSS for styling

## Prerequisites

- Node.js 18+ and npm
- The 360° panorama image file (RANGE-360.jpg)

## Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd E:\1-ECHO-WORKING-FOLDER\LOCAL-FILES\gun-range-insurance-website
   ```

2. **Copy the 360° panorama image:**
   The image should be placed at:
   ```
   E:\1-ECHO-WORKING-FOLDER\LOCAL-FILES\gun-range-insurance-website\public\images\RANGE-360.jpg
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:4321`

## Project Structure

```
gun-range-insurance-website/
├── public/
│   └── images/
│       └── RANGE-360.jpg              # 360° background image
├── src/
│   ├── components/
│   │   ├── sections/                  # Page sections
│   │   └── ui/                        # UI components
│   │       ├── MetalMenuBar.tsx       # Navigation menu
│   │       └── PanoramaViewer.tsx     # 360° viewer
│   ├── layouts/
│   │   └── BaseLayout.astro           # Main layout
│   ├── pages/
│   │   └── index.astro                # Home page
│   └── styles/
│       └── global.css                 # Global styles
├── astro.config.mjs                   # Astro configuration
├── tailwind.config.mjs                # Tailwind configuration
└── package.json                       # Project dependencies
```

## Customization

### Colors
The color scheme is defined in `tailwind.config.mjs`:
- `gunmetal`: Professional dark blue-gray
- `steel`: Medium gray-blue
- `target-red`: Accent red for CTAs
- `safety-orange`: Secondary accent
- `tactical-black`: Dark backgrounds

### Navigation
Edit the navigation items in `src/components/ui/MetalMenuBar.tsx`

### Content
Modify the section components in `src/components/sections/`

## Deployment

### Netlify Deployment

#### Option 1: Deploy with Git (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository: `MCERQUA/GUNRANGE-INSURANCE`
   - Build settings will be auto-configured from `netlify.toml`
   - Click "Deploy site"

3. **Upload the 360° image:**
   - After deployment, go to your Netlify site settings
   - Navigate to "Deploys" → "Deploy settings" → "Environment"
   - Or use Netlify's drag-and-drop deploy for the image file

#### Option 2: Manual Deploy (Quick Test)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Drag and drop:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag your `dist` folder to the browser

### Environment Variables (if needed)

No environment variables are required for this project.

### Post-Deployment

1. **Custom Domain:**
   - Go to "Domain settings" in Netlify
   - Add your custom domain

2. **HTTPS:**
   - Automatically enabled by Netlify

3. **Performance:**
   - The 360° image (RANGE-360.jpg) is large
   - Consider optimizing it or using a CDN

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- [Astro](https://astro.build/) - Web framework
- [React](https://reactjs.org/) - UI components
- [Three.js](https://threejs.org/) - 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Gun Range Insurance. All rights reserved.
#   G U N R A N G E - I N S U R A N C E  
 