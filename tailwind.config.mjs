/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Gun Range Insurance Professional Colors
        'gunmetal': '#2C3E50',
        'steel': '#34495E',
        'silver': '#95A5A6',
        'target-red': '#DC2626',     // Changed to a deeper red
        'crimson': '#991B1B',        // Deep crimson
        'blood-red': '#7F1D1D',      // Even darker red
        'safety-orange': '#F39C12',
        'tactical-black': '#1A1A1A',
        'smoke': '#ECF0F1',
        'brass': '#B8860B',
        'copper': '#B87333',
        'powder-blue': '#3498DB',
        
        // From Northern Legacy (for compatibility with MetalMenuBar)
        'charcoal': '#1F2937',
        'midnight': '#0F172A',
        'forest-green': '#10B981',
        'slate-blue': '#475569',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(231, 76, 60, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(231, 76, 60, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
