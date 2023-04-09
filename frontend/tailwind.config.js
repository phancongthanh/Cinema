/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        up: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, -0.5rem)' },
        },
        down: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, 0.5rem)' },
        },
      },
    },
  },
  plugins: [],
}
