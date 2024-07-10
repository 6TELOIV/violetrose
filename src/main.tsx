import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/home/layout.tsx"),
    children: [
      {
        path: "",
        lazy: () => import("./pages/home/index.tsx"),
      },
      {
        path: "about",
        lazy: () => import("./pages/home/about.tsx"),
      },
      {
        path: "links",
        lazy: () => import("./pages/home/links.tsx"),
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
