const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        primary: "#28A745",
        secondary:'#304D30',
        offer:"rgba(40,167,69,0.3)",
        delivery:"rgba(244,210,120,0.3)",
        doctor: "rgba(111,214,0,0.6)",
        health: "#EDCFFC",
        'primary-light': '#6cb2eb', // Lighter shade of primary color
        'primary-dark': '#2779bd'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #28A745 0%, #4CAF50 50%, #2C6B40 100%)',
      },
      height:{
        custom: '50rem'
      },
      spacing:{
        '144': '36rem',
        '152': '38rem',
        '160': '40rem',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem', // Custom 1440px
        // Add more custom sizes as needed
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
