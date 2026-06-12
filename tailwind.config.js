/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy':     '#07111f',
        'midnight-blue': '#0d1b2a',
        'gold':          '#d6b56d',
        'gold-bright':   '#e8cc85',
        'soft-white':    '#f8f5ef',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.9s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.9s ease-out forwards',
        'scale-in':   'scaleIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
