/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ivory: {
					100: '#FCFBF8',
					200: '#F9F8F5',
					500: '#C5BDA8',
					700: '#8C6945'
				},
				carbon: {
					700: '#1C1F21',
					900: '#090A0C'
				}
			},
			fontFamily: {
				grenze: ['Grenze', 'Georgia', 'Times New Roman', 'Times', 'serif'],
				mono: ["JetBrains Mono Variable", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
			}
		}
	},
	plugins: [],
}
