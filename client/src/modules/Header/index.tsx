import { useState } from "react";

import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Tabs,
  Tab,
} from "@nextui-org/react";
import ThemeSwitch from "./components/ThemeSwitch";
import AuthButton from "./components/AuthButton";
import { useSwitchTheme } from "src/hooks";
import { useStateTabs } from "./hooks/useStateTabs";

const menuItems = [
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Hots",
    path: "/hots",
  },
  {
    name: "Tags",
    path: "/tags",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Log Out",
    path: "/",
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTab, toSelectedTab] = useStateTabs(menuItems);
  const [isDarkTheme, setIsDarkTheme] = useSwitchTheme();

  // <header>
  //   <Link to="/">home</Link>
  //   <Link to="/post">post</Link>
  //   <Link to="/nikita">nikita</Link>
  // </header>

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
          <div className="flex items-center justify-center gap-4">
            <img className="w-10" src="/logo.png" alt="Site logo"></img>
            <p className="font-bold text-inherit">PostHub</p>
          </div>
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
            <Tab
              key="News"
              title={
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-rounded">
                    release_alert
                  </span>
                  <span>News</span>
                </div>
              }
              className="text-base"
            />
            <Tab
              key="Hots"
              title={
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-rounded mb-1">
                    local_fire_department
                  </span>
                  <span>Hots</span>
                </div>
              }
              className="text-base"
            />
            <Tab
              key="Tags"
              title={
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-rounded">style</span>
                  <span>Tags</span>
                </div>
              }
              className="text-base"
            />
          </Tabs>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <AuthButton />
        <ThemeSwitch isSelected={isDarkTheme} onValueChange={setIsDarkTheme} />
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
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
}
