/* jshint esversion: 11 */

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const config = {
	plugins: [tailwindcss(), autoprefixer({ cascade: true })]
}

module.exports = config
