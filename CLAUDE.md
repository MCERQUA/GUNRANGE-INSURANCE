# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gun Range Insurance website built with Astro 5.11.0, React 18, and Tailwind CSS. Features a 360° panoramic background with multiple viewer implementations and professional insurance industry theming.

## Development Commands

- `npm run dev` - Start development server (http://localhost:4321)
- `npm run build` - Build for production 
- `npm run preview` - Preview production build locally
- `npm start` - Alias for `npm run dev`

**No testing framework configured** - This is a production marketing website without test coverage.

## Architecture

### Tech Stack
- **Framework**: Astro (Static Site Generator) with React integration
- **Styling**: Tailwind CSS with custom gun range/tactical theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify with configured headers and caching

### Key Components

**360° Panorama Viewers** (`src/components/ui/`):
- `PanoramaViewer.tsx` - Main interactive viewer with mouse/touch controls
- `CSS360Viewer.tsx` - Pure CSS implementation
- `HorizontalPanorama.tsx` - Horizontal scrolling version
- `SimplePanoramaViewer.tsx` - Simplified implementation

**Page Sections** (`src/components/sections/`):
- `HeroSection.astro` - Landing hero with panorama background
- `CoverageSection.astro` - Insurance coverage details
- `ServicesSection.astro` - Service offerings  
- `ContactSection.astro` - Contact information

**Layout**: `BaseLayout.astro` - Main layout template with SEO meta tags

### File Structure
```
src/
├── components/
│   ├── sections/     # Page sections (Astro components)
│   └── ui/           # Interactive UI components (React/TSX)
├── layouts/          # Page layouts
├── pages/            # Routes (index.astro + test pages)
└── styles/           # Global CSS
```

## Custom Theme

Comprehensive gun range/tactical color palette defined in `tailwind.config.mjs`:
- Professional grays: `gunmetal`, `steel`, `silver`, `tactical-black`
- Accent reds: `target-red`, `crimson`, `blood-red`
- Secondary: `safety-orange`, `brass`, `copper`
- Custom animations: `float`, `glow`, `slide-up`, `fade-in`

## Critical Dependencies

**Panorama Image**: Requires `public/images/RANGE-360.jpg` for 360° background functionality.

**Note**: README mentions Three.js but it's not in dependencies - panorama viewers use custom DOM manipulation instead.

## Deployment

Configured for Netlify with `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Security headers and caching optimizations included
- No environment variables required

## Development Notes

- Multiple panorama viewer implementations suggest experimental development
- TypeScript support enabled
- Mobile-responsive design with touch interaction support
- Professional insurance industry styling and content