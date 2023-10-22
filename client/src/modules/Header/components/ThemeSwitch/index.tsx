import { useEffect } from "react";
import { useSwitch, VisuallyHidden, SwitchProps } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export default function ThemeSwitch(props: SwitchProps) {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: ["h-8 w-8", "flex items-center justify-center"],
        })}
      >
        {isSelected ? <SunIcon /> : <MoonIcon />}
      </div>
    </Component>
  );
}
