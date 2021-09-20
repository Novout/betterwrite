module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
     'raleway': ['Raleway', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      height: theme => ({
        "editor": "95vh",
      }),
    },
  },
  variants: ["hover", "focus", "active", "dark", "responsive"],
  plugins: [],
};
