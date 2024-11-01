/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./components/**/*.{html,js,vue,ts,md}",
    "./content/**/*.{html,js,vue,ts,md}",
    "./content/.vitepress/**/*.{html,js,vue,ts,md}",
  ],
  plugins: [typography],
};
