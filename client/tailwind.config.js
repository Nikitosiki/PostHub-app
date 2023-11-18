const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: "'Roboto', sans-serif",
        noto: "'Noto Emoji', sans-serif",
        notocolor: "'Noto Color Emoji', sans-serif",
      },
    },
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
    require('@tailwindcss/typography'),
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          layout: {
            // fontSize: {
            //   tiny: "0.75rem", // text-tiny
            //   small: "0.875rem", // text-small
            //   medium: "1rem", // text-medium
            //   large: "1.125rem", // text-large
            // },
          },
          colors: {
            foreground: "#0E1F2C", // the page text color
            background: {
              DEFAULT: "#FFFFFF",
              50: "#f9fafb",
              100: "#f3f4f6",
              200: "#e5e7eb",
              300: "#d1d5db",
              400: "#9ca3af",
              500: "#6b7280",
              600: "#4b5563",
              700: "#374151",
              800: "#1f2937",
              900: "#111827",
              950: "#030712",
            },
            primary: {
              foreground: "#FFFFFF",
              // DEFAULT: "#4B9CD3",
            },

            // secondary: {
            //   //icons color
            //   foreground: "#75757C",
            //   // DEFAULT: "#FFFFFF",
            // },
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
            background: {
              DEFAULT: "#232730",
              50: "#292c34",
              100: "#32363d",
              200: "#3e424a",
              300: "#494d56",
              400: "#5b5f68",
              500: "#6d727a",
              600: "#7f848c",
              700: "#91969e",
              800: "#a3a8b1",
              900: "#b5bbbc",
              950: "#c7ccce",
            },
            foreground: "#FFF5F1", // the page text color

            primary: {
              foreground: "#FFFFFF",
              // DEFAULT: "#4B9CD3",
            },

            default: {
              50: "#292D36",
              100: "#2F333C",
              200: "#3B3F48",
            },

            // secondary: {
            //   //icons color
            //   foreground: "#81828A",
            //   DEFAULT: "#232730",
            // },
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
