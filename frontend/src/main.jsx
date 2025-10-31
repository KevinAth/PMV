import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import App from "./App.jsx";
import RegisterUserPage from "./pages/RegisterUserPage.jsx";
import UserPage from "./pages/LoginPage.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
