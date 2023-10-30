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
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import ThemeSwitch from "./components/ThemeSwitch";
import AuthButton from "./components/AuthButton";
import { useSwitchTheme } from "src/hooks";
import { SearchIcon } from "./components/SearchIcon";

const menuItems = [
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Tops",
    path: "/tops",
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

type MenuItem =
  | {
      name: string;
      path: string;
    }
  | undefined;

const getSelectedTab = (location: Location): string => {
  const link: string = location.pathname;
  const clearLink: string = link.substring(0, link.indexOf("/", 1));
  const name: MenuItem = menuItems.find((value) => {
    return value.path === clearLink;
  });
  if (name) return name.name;
  return menuItems[0].name;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<React.Key>(
    getSelectedTab(location),
  );
  const [isDarkTheme, setIsDarkTheme] = useSwitchTheme();

  // <header>
  //   <Link to="/">home</Link>
  //   <Link to="/post">post</Link>
  //   <Link to="/nikita">nikita</Link>
  // </header>

  const toSelectedTab = (name: React.Key) => {
    setSelectedTab(name);
    const path: MenuItem = menuItems.find((value) => {
      return value.name === name;
    });
    if (path) navigate(path.path);
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
          <div className="flex flex-wrap items-center justify-center gap-5">
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
            <Tab key="News" title="News" className="text-base" />
            <Tab key="Tops" title="Tops" className="text-base" />
            <Tab key="Tags" title="Tags" className="text-base" />
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
