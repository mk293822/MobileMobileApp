import nativewindPreset from "nativewind/preset";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./app/**/*.{tsx,ts,js,jsx}", "./components/**/*.{tsx,ts,js,jsx}"],
	presets: [nativewindPreset],
	theme: {
		extend: {
			colors: {
				primary: "#030014",
				accent: "#AB8BFF",
				secondary: "#151312",
				light: {
					100: "#D6C6FF",
					200: "#A8B5DB",
					300: "#9CA4AB",
				},
				dark: {
					100: "#221F3D",
					200: "#0F0D23",
				},
			},
		},
	},
	plugins: [],
};
