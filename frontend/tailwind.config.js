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
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
