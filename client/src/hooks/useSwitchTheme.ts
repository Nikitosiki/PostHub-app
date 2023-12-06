import { useEffect, useState } from "react";

export function useSwitchTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>();

  const changeClassThemeHtml = (value: string) => {
    const elementHtml: HTMLElement | null = document.getElementById("html");

    if (elementHtml) {
      const classListHtml: DOMTokenList | undefined = elementHtml.classList;
      switch (value) {
        case "dark":
          classListHtml.remove("light");
          classListHtml.add(value);
          break;

        case "light":
          classListHtml.remove("dark");
          classListHtml.add(value);
          break;

        default:
          classListHtml.add(value);
          console.log("Error, this theme does not exist!");
          break;
      }
    }
  };

  const changeTheme = (isDark: boolean) => {
    const themeName: string = isDark ? "dark" : "light";

    setIsDarkTheme(isDark);
    changeClassThemeHtml(themeName);
    localStorage.setItem("setting-theme", themeName);
  };

  useEffect(() => {
    const theme: string | null = localStorage.getItem("setting-theme");

    if (theme === "dark") {
      setIsDarkTheme(true);
      changeClassThemeHtml(theme);
    }

    if (theme === "light") {
      setIsDarkTheme(false);
      changeClassThemeHtml(theme);
    }

    if (theme === null) {
      // const isDarkTheme = window.matchMedia(
      //   "(prefers-color-scheme: dark)",
      // ).matches;
      const isDarkTheme = false;
      changeTheme(isDarkTheme);
    }
  }, []);

  return [isDarkTheme, changeTheme] as const;
}
