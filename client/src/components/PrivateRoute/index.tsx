import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "src/contexts";

const PrivateRoute: FC<{ element: ReactNode }> = ({element}) => {
  const { user, onOpenAuth } = useAuth();

  useEffect(() => {
    if (!user) {
      onOpenAuth();
    }
  }, []);

  return element;
};

export default PrivateRoute;
