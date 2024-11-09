module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',      // Purple
        accent: '#EC4899',       // Pink
        background: '#F3F4F6',   // Light Gray
        text: '#1E40AF',         // Dark Blue
        secondary: '#FCE7F3',    // Light Pink
      },
    },
  },
  plugins: [],
};
