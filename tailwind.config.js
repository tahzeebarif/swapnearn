export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1b5e3b', dark: '#12432a', light: '#e8f5ed' },
        accent: '#c8a24a',
        sale: '#d93f3f',
        cream: '#f2ede3',
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      aspectRatio: { '4/5': '4 / 5' },
      keyframes: {
        /* existing */
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'none' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },

        /* new — hero floating blobs */
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.94)' },
        },
        /* gentle float for decorative shapes */
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        /* shimmer sweep on cards */
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        /* spin-slow for logo ring */
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        /* pulse ring */
        ringPulse: {
          '0%,100%': { transform: 'scale(1)', opacity: 0.6 },
          '50%': { transform: 'scale(1.15)', opacity: 0 },
        },
        /* counter ticker */
        countUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .5s ease both',
        marquee: 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        blob: 'blob 8s ease-in-out infinite',
        'blob-delay': 'blob 8s ease-in-out 2.5s infinite',
        'blob-delay2': 'blob 8s ease-in-out 5s infinite',
        floatY: 'floatY 4s ease-in-out infinite',
        'floatY-slow': 'floatY 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        spinSlow: 'spinSlow 12s linear infinite',
        ringPulse: 'ringPulse 2s ease-out infinite',
        countUp: 'countUp 0.5s ease both',
      },
    },
  },
  plugins: [],
};
