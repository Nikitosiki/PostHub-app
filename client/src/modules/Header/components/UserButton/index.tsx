import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "src/contexts/Auth/AuthContext";

const UserButton = () => {
  const { user, logOut } = useContext(AuthContext);

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
            className="justify-end px-2 text-foreground"
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
                name: "hidden sm:block sm:pl-4 sm:max-w-[10rem] truncate",
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
            <DropdownItem key="user" className="text-default-500">
              {user?.name}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection
            aria-label="Actions"
            showDivider
            dividerProps={{
              className: "h-[1.5px] mt-1",
            }}
          >
            <DropdownItem key="create">Create Post</DropdownItem>
            <DropdownItem key="theme">Theme:</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback" className="mb-0">
            <DropdownItem key="logout" onClick={logOut}>
              <span className="text-danger">Log Out</span>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserButton;
