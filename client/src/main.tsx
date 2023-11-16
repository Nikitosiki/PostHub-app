import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";
import "material-symbols/material-symbols-rounded.woff2";
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
);