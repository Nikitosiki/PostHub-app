const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // fontSize: {
    //   sm: "1rem", // 0.8
    //   base: "1.25rem", // 1
    //   xl: "1.5rem", // 1.25
    //   "2xl": "1.563rem", // 1.563
    //   "3xl": "1.953rem", // 1.953
    //   "4xl": "2.441rem", // 2.441
    //   "5xl": "3.052rem", // 3.052
    // },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#FFFFFF", // the page background color
            foreground: "#0E1F2C", // the page text color

            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#4B9CD3",
            },

            secondary: {
              //icons color
              foreground: "#75757C",
              DEFAULT: "#FFFFFF",
            },
            // secondary: "#",
            // default: {
            //   foreground: "#0E1F2C", // "dark blue"
            //   DEFAULT: "#006FEE", // "blue"
            // },

            // // success: "",
            // warning: "#4B9CD3",
            // // danger: "",

            // // divider: "", // used for divider and single line border
            // overlay: "#2A3439", // used for modal, popover, etc.
            // // focus: "", // used for focus state outline

            // content1: "#FFFFFF", // used for card, modal, popover, etc.
          },
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#232730", // the page background color
            foreground: "#FFF5F1", // the page text color

            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#4B9CD3",
            },

            secondary: {
              //icons color
              foreground: "#81828A",
              DEFAULT: "#232730",
            },
            // secondary: "#",
            // default: {
            //   foreground: "#ececee",
            //   DEFAULT: "#006FEE",
            // },

            // // success: "",
            // warning: "#4B9CD3",
            // // danger: "",

            // // divider: "", // used for divider and single line border
            // overlay: "#2A3439", // used for modal, popover, etc.
            // // focus: "", // used for focus state outline

            // // content1: "#272E35", // used for card, modal, popover, etc.
          },
        },
      },
    }),
  ],
};
