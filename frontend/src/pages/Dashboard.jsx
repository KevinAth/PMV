import { Outlet } from "react-router";
import Sidebard from "../components/sidebard";
import "../styles/main.css";

export default function Dashboard() {
  return (
    <div className="contenedor_main">
      <div className="contenedor_sidebar">
        <Sidebard />
      </div>
      <div className="contenido_principal">
        <Outlet />
      </div>
    </div>
  );
}
