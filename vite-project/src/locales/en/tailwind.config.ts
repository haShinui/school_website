/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include your React component files
  ],
  darkMode: 'class',  // Enables toggling dark mode via the 'dark' class
  theme: {
    extend: {
      colors: {
        'yellow-300': '#FFC187', // Sun/Moon color
        'gray-200': '#dee5f3',   // Light theme background color
        'gray-500': '#565c6b',   // Dark theme moon color
        'dark-bg': '#535c72',    // Dark background color for body
        'light-bg': '#cde7ff',   // Light background color for body
        'hover-blue-dark': '#6495ED',  // Hover color in dark mode
      },
      boxShadow: {
        sun: '0px 0px 11.7px 0px #FFC187, 0px 0px 20px 0px #ffc18768, -2px -2px 5px 0px #ffab5c inset',
        moon: '0px 0px 51.7px 0px #dee5f3',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition effect
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Custom slow spin animation for any visual element
        'bounce-slow': 'bounce 3s infinite',   // Slow bounce for fun effects
      },
    },
  },
  plugins: [],
}
