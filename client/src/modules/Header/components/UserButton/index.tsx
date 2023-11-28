import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useSwitchTheme } from "src/hooks";
import { useAuth } from "src/contexts";

const UserButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useSwitchTheme();
  const { user, logOut } = useAuth();

  return (
    <>
      <Dropdown
        placement="bottom-end"
        classNames={{
          content: "border-divider bg-background",
        }}
      >
        <DropdownTrigger>
          <Button
            color="primary"
            variant="light"
            className="min-w-[3rem] justify-end px-2 text-foreground"
          >
            <User
              name={user?.name}
              avatarProps={{
                src: user?.image_url ?? "",
                size: "sm",
                isBordered: true,
                color: "primary",
              }}
              classNames={{
                base: "gap-0",
                name: "hidden max-w-[20rem] sm:block sm:pl-4 sm:max-w-[10rem] truncate",
              }}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          className="p-2"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-600",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection
            aria-label="Profile"
            showDivider
            dividerProps={{
              className: "h-[1px] mt-1",
            }}
          >
            <DropdownItem key="user" className="max-w-[15rem] text-default-500">
              <Link to="/profile">
                <p className="whitespace-normal">{user?.name}</p>
              </Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection
            aria-label="Actions"
            showDivider
            dividerProps={{
              className: "h-[1.5px] mt-1",
            }}
          >
            <DropdownItem key="create">
              <Link to="/post/create">
                <p>Create Post</p>
              </Link>
            </DropdownItem>
            <DropdownItem
              key="theme"
              closeOnSelect={false}
              onClick={() => {
                setIsDarkTheme(!isDarkTheme);
              }}
            >
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <span className="material-symbols-rounded">
                  {isDarkTheme ? "dark_mode" : "light_mode"}
                </span>
              </div>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to="/profile/settings">
                <p>Settings</p>
              </Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback" className="mb-0">
            <DropdownItem key="logout" onClick={logOut}>
              <p className="text-danger">Log Out</p>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserButton;
