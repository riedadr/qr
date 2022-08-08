/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				draculaBg: "#282a36",
				draculaCurrent: "#44475a",
				draculaFg: "#f8f8f2",
				draculaComment: "#6272a4",
				draculaCyan: "#8be9fd",
				draculaGreen: "#50fa7b",
				draculaOrange: "#ffb86c",
				draculaPink: "#ff79c6",
				draculaPurple: "#bd93f9",
				draculaRed: "#ff5555",
				draculaYellow: "#f1fa8c",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
