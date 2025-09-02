import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [
		react()
	],
	  base: 'https://neil-scrimba-frontend-career-path.netlify.app/component-library/dist/'
})