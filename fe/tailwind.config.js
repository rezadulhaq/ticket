import daisyui from 'daisyui';
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          DEFAULT: '#1B42B6',
          50: 'rgba(27, 66, 182, 0.5)',
        },
      },
      fontFamily: {
        custom: ['CustomFont', 'CircularStd', 'sans-serif'],
        customText: ['CircularStd', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'desktop': "url('https://ik.imagekit.io/x6p94nrv0m/LANDING%20PAGE%20-%20DESKTOP%20(1).png?updatedAt=1720113947735')",
        'mobile': "url('https://ik.imagekit.io/x6p94nrv0m/LOGIN%20PAGE%20-%20MOBILE%20(1).png?updatedAt=1720975715840')",
        'mobileTicket': "url('https://ik.imagekit.io/x6p94nrv0m/CHOOSE%20TICKET%20PAGE%20-%20MOBILE.png?updatedAt=1720980514562')",
        'desktopTicket': "url('https://ik.imagekit.io/x6p94nrv0m/CHOOSE%20TICKET%20PAGE%20-%20DESKTOP.png?updatedAt=1720551963335')",
        'desktopInvoice': "url('https://ik.imagekit.io/x6p94nrv0m/INVOICE%20-%20DESKTOP.png?updatedAt=1720784842414')",
        'mobileInvoice' : "url('https://ik.imagekit.io/x6p94nrv0m/summary%20page%20-%20verrys%20(1).png?updatedAt=1721237202236')"
      }),
    },
  },
  plugins: [
    daisyui,
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.border-gradient': {
          border: '20px solid',
          'border-image': 'linear-gradient(45deg, #F8D3C4, #9FB7F3) 1',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
  daisyui: {
    darkTheme: false,
  },
};
