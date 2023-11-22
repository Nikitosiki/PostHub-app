import { FC } from "react";
import { useSwitch, VisuallyHidden, SwitchProps } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const ThemeSwitch: FC<SwitchProps> = (props) => {
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
          class: ["h-10 w-10", "flex items-center justify-center", "mr-0"],
        })}
      >
        {isSelected ? <MoonIcon /> : <SunIcon />}
      </div>
    </Component>
  );
};

export default ThemeSwitch;
