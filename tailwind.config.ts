import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/scenes/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animationDuration: {
				'2s': '2s',
			},
			backgroundImage: {
				vignette:
					'radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 40%, rgba(59, 55, 119, .1) 70%, rgba(59, 55, 119, .4) 100%)',
			},
			animation: {
				shake: 'shake 1s linear infinite',
				'shake-horizontal': 'shake-horizontal 1s linear infinite',
				'spin-slow': 'spin 10s linear infinite',
			},
			keyframes: {
				shake: {
					'0%': {
						transform: 'translateY(0rem)',
					},
					'25%': {
						transform: 'translateY(-1px)',
					},
					'75%': {
						transform: 'translateY(1px)',
					},
					'100%': {
						transform: 'translateY(0rem)',
					},
				},
				'shake-horizontal': {
					'0%': {
						transform: 'translateX(0rem)',
					},
					'25%': {
						transform: 'translateX(-3px)',
					},
					'75%': {
						transform: 'translateX(3px)',
					},
					'100%': {
						transform: 'translateX(0rem)',
					},
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

export default config
