/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: "#F7F4EC",       // Warm off-white
        paper: "#FFFFFF",      // White
        ink: {
          DEFAULT: "#1F2320",  // Dark forest green/black
          soft: "#667068",     // Muted gray-green
        },
        line: "#E1E3DB",       // Soft border
        lime: {
          DEFAULT: "#5FA832",  // Vibrant green (action)
          soft: "#EDF5E8",
        },
        bamboo: {
          DEFAULT: "#D87A29",  // Warm orange (commercial)
          soft: "#FDF1E6",
        },
        vet: {
          DEFAULT: "#D64045",  // Alert red (clinical)
          soft: "#FBECEE",
        },
      },
      fontFamily: {
        display: ["FjallaOne-Regular"],
        body: ["Inter-Regular"],
        mono: ["JetBrainsMono-Regular"],
      },
    },
  },
  plugins: [],
}
