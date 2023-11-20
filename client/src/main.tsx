import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import router from "./router.tsx";
import "./index.css";
import "material-symbols/material-symbols-rounded.woff2";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
        <RouterProvider router={router} />
        <Toaster/>
    </NextUIProvider>
  </React.StrictMode>,
);
