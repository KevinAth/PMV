import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import App from "./App.jsx";
import RegisterUserPage from "./pages/RegisterUserPage.jsx";
import UserPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import Inventario from "./pages/Inventario.jsx";
import Proveedores from "./pages/Proveedores.jsx";
import Movimientos from "./pages/Movimientos.jsx";
import UserProvider from "./context/UserContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => redirect("/sign_in"),
  },
  {
    path: "/sign_in",
    element: <UserPage />,
  },
  {
    path: "/sign_up",
    element: <RegisterUserPage />,
  },
  {
    path: "/panel_inicio",
    element: <Dashboard />,
    children: [
      {
        index: true,
        loader: () => redirect("inventario")
      },
      {
        path: "inventario",
        element: <Inventario />,
      },
      {
        path: "proveedores",
        element: <Proveedores />,
      },
      {
        path: "movimientos",
        element: <Movimientos />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
