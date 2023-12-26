import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useReload = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reload = useCallback(() => {
    navigate(location);
  }, []);

  return { reload };
};
