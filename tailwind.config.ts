import type { Config } from "tailwindcss";
import motion from "tailwindcss-motion";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [motion as any],
} satisfies Config;
