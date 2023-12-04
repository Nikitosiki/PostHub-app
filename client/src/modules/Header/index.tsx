import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

import ThemeSwitch from "./components/ThemeSwitch";
import AuthButton from "./components/AuthButton";
import { useSwitchTheme } from "src/hooks";
import { useStateTabs } from "./hooks/useStateTabs";
import { MenuItem } from "./types/MenuItem";
import { useAuth } from "src/contexts";
import UserButton from "./components/UserButton";
import SearchButton from "./components/SearchButton";

import {
  NavigateCreatePostPage,
  NavigateHotsPage,
  NavigateNewsPage,
  NavigateTagsPage,
} from "src/paths";

const menuItems: MenuItem[] = [
  {
    name: "News",
    path: NavigateNewsPage(),
  },
  {
    name: "Hots",
    path: NavigateHotsPage(),
  },
  {
    name: "Tags",
    path: NavigateTagsPage(),
  },
];

const mobileMenuItems: MenuItem[] = menuItems.concat([
  // {
  //   name: "Create",
  //   path: NavigateCreatePostPage(),
  // },
  // {
  //   name: "Profile",
  //   path: NavigateProfilePage(),
  // },
  // {
  //   name: "Log Out",
  //   path: "/",
  // },
]);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTab, toSelectedTab] = useStateTabs(menuItems);
  const [isDarkTheme, setIsDarkTheme] = useSwitchTheme();
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const { user } = useAuth();

  return (
    <NavbarUI
      isMenuOpen={isMobileMenuOpen}
      onMenuOpenChange={setIsMobileMenuOpen}
      isBordered
      shouldHideOnScroll={!isDesktop}
      // isBlurred={false}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/news" className="flex items-center justify-center gap-4">
            <img className="w-10" src="/logo.png" alt="Site logo"></img>
            <p className="font-bold text-inherit">PostHub</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
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
        <SearchButton>
          <span className="material-symbols-rounded p-1">search</span>
        </SearchButton>
        {user && (
          <Link to={NavigateCreatePostPage()}>
            <span className="material-symbols-rounded p-1 pb-0">
              stylus_note
            </span>
          </Link>
        )}
        {user ? <UserButton /> : <AuthButton />}
        {!user && (
          <ThemeSwitch
            isSelected={isDarkTheme}
            onValueChange={setIsDarkTheme}
          />
        )}
      </NavbarContent>

      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              to={item.path}
              className={`text-lg ${
                item.name === selectedTab
                  ? "text-primary"
                  : // : index === mobileMenuItems.length - 1
                    // ? "text-danger"
                    "text-foreground"
              }`}
              onClick={() => {
                toSelectedTab(item.name);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
};

export default Header;
