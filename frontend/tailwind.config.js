 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954", // Spotify green
        dark: "#0f0f0f",
        card: "#181818",
      },
    },
  },
  plugins: [],
}