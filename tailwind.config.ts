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
        "grey": "#F5F5F5",
        "custom-black": "#2B2B2B",
        "custom-blue": "#1F37D8",
        "transparent-blue": "#F6F7FF",
        "surface": "#FFFAE6",
        "secondary": "#FF5F00",
        "footer-link": "#E8E8E8",
        "form-black": "#1A1C1F",
        "link-ash": "#666666",
        "grey-2": "#BFBFBF",
      }
    },
  },
  plugins: [],
};
export default config;
