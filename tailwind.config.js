// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  // v4 doesn’t require content globs, but keeping them is fine:
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  theme: { extend: {} },
  plugins: [],
});
