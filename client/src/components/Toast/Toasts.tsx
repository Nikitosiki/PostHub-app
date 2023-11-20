import { useEffect } from "react";
import { default as hotToast } from "react-hot-toast";
import { useSwitchTheme } from "src/hooks";

export enum TostType {
  success = 0,
  error = 1,
}

export const useToast = () => {
  const [isDarkTheme] = useSwitchTheme();

  return (type: TostType, text: string): void => {
    const background = isDarkTheme ? "#000" : "#fff";
    const color = isDarkTheme ? "#fff" : "#000";

    const props = {
      style: {
        borderRadius: "10px",
        background: background,
        color: color,
      },
    };

    switch (type) {
      case 0:
        hotToast.success(text, props);
        break;
      case 1:
        hotToast.error(text, props);
        break;
      default:
        hotToast(text, props);
        break;
    }
  };
};
