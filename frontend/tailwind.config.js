const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#28A745",
        secondary: '#304D30',
        offer: "rgba(40,167,69,0.3)",
        delivery: "rgba(244,210,120,0.3)",
        doctor: "rgba(111,214,0,0.6)",
        health: "#EDCFFC",
        light: "#2779bd",
        'primary-light': '#6cb2eb',
        'primary-dark': '#2779bd',
        gradient: 'linear-gradient(to right, #34D399, #22C55E, #16A34A)'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #34D399, #22C55E, #16A34A)',
      },
      height: {
        custom: '50rem',
      },
      spacing: {
        '144': '36rem',
        '152': '38rem',
        '160': '40rem',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem', // Custom 1440px
      },
      zIndex: {
        'max': '9999', // Add custom z-index values
        'high': '1000',
        'medium': '500',
        'low': '100',
      },
      // Add custom font sizes here
      fontSize: {
        'xxs': '0.50rem',   // Extra small font
        '3xl': '1.875rem',  // 3x large font (for example)
        '4.5xl': '2.5rem',  // Custom font size between 4xl and 5xl
      }
    },
    fontFamily: {
      'body': ["Poppins", "sans-serif"]
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}
