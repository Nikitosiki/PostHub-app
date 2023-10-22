import { useEffect, useState } from "react";

import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./components/ThemeSwitch";
import AuthButton from "./components/AuthButton";
import { useSwitchTheme } from "src/hooks";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<React.Key>("News");
  const [isDarkTheme, setIsDarkTheme] = useSwitchTheme();

  const menuItems = ["News", "Tops", "Tags", "Profile", "Log Out"];
  const navigate = useNavigate();

  //   <header>
  //   <Link to="/">home</Link>
  //   <Link to="/post">post</Link>
  //   <Link to="/nikita">nikita</Link>
  // </header>

  const toSelectedTab = (value: React.Key) => {
    setSelectedTab(value);
    switch (value) {
      case "News":
        navigate("/news");
        break;

      case "Tops":
        navigate("/tops");
        break;

      case "Tags":
        navigate("/tags");
        break;

      case "Profile":
        navigate("/profile");
        break;

      default:
        navigate("/");
        break;
    }
  };

  return (
    <NavbarUI
      onMenuOpenChange={setIsMobileMenuOpen}
      disableAnimation
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">PostHub</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Tabs
            key="underlined"
            variant="underlined"
            color="primary"
            selectedKey={selectedTab}
            onSelectionChange={toSelectedTab}
          >
            <Tab key="News" title="News" className="text-base" />
            <Tab key="Tops" title="Tops" className="text-base" />
            <Tab key="Tags" title="Tags" className="text-base" />
          </Tabs>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch
            isSelected={isDarkTheme}
            onValueChange={setIsDarkTheme}
          />
        </NavbarItem>
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 0
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
}
