import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wiah: {
          dark: '#0D1117',
          black: '#1A1A1A',
          mid: '#6B7280',
          light: '#F5F5F5',
          border: '#E5E7EB',
          red: '#E63946',
          amber: '#F4A261',
          green: '#2A9D8F',
          blue: '#264653',
        },
      },
      fontFamily: {
        editorial: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
