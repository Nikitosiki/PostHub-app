import { useState } from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { MenuItem } from "../types/MenuItem";

export function useStateTabs(menuItems: MenuItem[]) {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedTab = (location: Location): string => {
    function getBaseTag(url: string) {
      const parts = url.split("/");
      return `/${parts[1]}`; // Возвращает первый сегмент после разделения
    }

    const clearLink: string = getBaseTag(location.pathname);

    const name: MenuItem | undefined = menuItems.find((value) => {
      return value?.path === clearLink;
    });

    if (name) return name.name;
    return menuItems[0]?.name ?? "News";
  };

  const [selectedTab, setSelectedTab] = useState<React.Key>(
    getSelectedTab(location),
  );

  const toSelectedTab = (name: React.Key) => {
    setSelectedTab(name);
    const path: MenuItem | undefined = menuItems.find((value) => {
      return value?.name === name;
    });
    if (path) navigate(path.path);
  };

  return [selectedTab, toSelectedTab] as const;
}
