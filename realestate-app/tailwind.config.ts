import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f766e",
          600: "#0d5f59",
          700: "#0b4a45"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;