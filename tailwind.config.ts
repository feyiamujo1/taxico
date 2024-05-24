import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-ash": "#ECECEC",
        "dark-ash": "#444444",
        "custom-black": "#2B2B2B",
        "custom-blue": "#1F37D8",
        "surface": "#FFFAE6",
        "secondary": "#FF5F00",
        "footer-link": "#E8E8E8",
      }
    },
  },
  plugins: [],
};
export default config;
