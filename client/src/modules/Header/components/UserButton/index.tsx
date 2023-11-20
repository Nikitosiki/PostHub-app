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

const disabledKeys = ["user"];

const UserButton = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <Dropdown
      radius="sm"
      classNames={{
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Button
          color="primary"
          variant="light"
          className="hidden p-0 text-foreground sm:block"
        >
          <User
            name={user?.name}
            avatarProps={{
              src: user?.image_url ?? "",
              size: "sm",
            }}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={disabledKeys}
        aria-label="Custom item styles"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
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
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="user"
            textValue="user"
            className="opacity-100"
          >
            <User
              name={user?.name}
              avatarProps={{
                src: user?.image_url ?? "",
                size: "sm",
              }}
            />
          </DropdownItem>
          <DropdownItem key="profile" textValue="profile">
            {/* <Link href={`/user/${user?.uid}`}>
              <div>Profile</div>
            </Link> */}
          </DropdownItem>
          <DropdownItem key="settings" textValue="settings">
            Settings
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="logout" textValue="logout" onClick={logOut}>
            <span className="text-danger">Log Out</span>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserButton;
