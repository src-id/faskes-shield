import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        clinical: {
          950: "#041512",
          900: "#06231e",
          800: "#0d3b33",
          700: "#135449",
          600: "#0d9488",
          500: "#14b8a6",
          400: "#2dd4bf",
        }
      },
    },
  },
  plugins: [],
};

export default config;
