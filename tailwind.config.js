/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.hbs","partials/*.hbs"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
