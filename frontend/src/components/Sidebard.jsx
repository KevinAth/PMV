import logo from "../assets/logo.png";
import "../styles/sidebar.css";
import exit from "../assets/exit.svg";
import { NavLink } from "react-router";
export default function Sidebard() {
  return (
    <aside className="sidebar">
      <ul className="sidebar_list">
        <li className="sidebar_element sidebarelement_logo">
          <img src={logo} alt="" className="logo" />
          <div className="sidebar_hide">
            <p className="sidebar_text">ClearSales</p>
          </div>
        </li>
        <NavLink to={"/panel_inicio/inventario"} className={"NavLinks"}>
          <li className="sidebar_element">
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              transform=""
              id="injected-svg"
              className="sidebar_icon"
            >
              <rect width="8" height="18" x="3" y="3" rx="1.5" ry="1.5"></rect>
              <rect width="8" height="8" x="13" y="3" rx="1.5" ry="1.5"></rect>
              <rect width="8" height="8" x="13" y="13" rx="1.5" ry="1.5"></rect>
            </svg>
            <div className="sidebar_hide">
              <p className="sidebar_text">Productos</p>
            </div>
          </li>
        </NavLink>
        <NavLink to={"/panel_inicio/proveedores"} className={"NavLinks"}>
          <li className="sidebar_element">
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              transform=""
              id="injected-svg"
            >
              <path d="m21.96,7.74s-.02-.05-.03-.07c-.02-.06-.04-.11-.07-.17-.02-.03-.04-.05-.06-.08-.03-.04-.06-.09-.1-.13-.03-.03-.06-.04-.08-.07-.04-.03-.07-.06-.11-.09,0,0,0,0-.01,0,0,0,0,0,0,0L12.49,2.13c-.3-.17-.67-.17-.97,0L2.58,7.1s-.06.02-.09.04c-.31.18-.49.51-.49.86v8c0,.36.2.7.51.87l9,5s.1.04.14.06c.03.01.06.03.09.03.08.02.17.03.25.03s.17-.01.25-.03c.03,0,.06-.02.09-.03.05-.02.1-.03.14-.06l9-5c.32-.18.51-.51.51-.87v-8c0-.09-.01-.18-.04-.26Zm-9.96-3.59l6.94,3.86-2.24,1.25-6.84-3.91,2.14-1.19Zm0,7.71l-6.92-3.86,2.74-1.52,6.84,3.91-2.65,1.47Zm8,3.56l-7,3.89v-5.71l3-1.67v3.08l2-1v-3.19l2-1.11v5.71Z"></path>
            </svg>
            <div className="sidebar_hide">
              <p className="sidebar_text">Proveedores</p>
            </div>
          </li>
        </NavLink>
        <NavLink to={"/panel_inicio/movimientos"} className={"NavLinks"}>
          <li className="sidebar_element">
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              transform=""
              id="injected-svg"
            >
              <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
              <path d="M6 15h6v2H6zM6 10h14v2H6zM6 5h9v2H6z"></path>
            </svg>
            <div className="sidebar_hide">
              <p className="sidebar_text">Movimientos</p>
            </div>
          </li>
        </NavLink>
        <li className="sidebar_element exit_app">
          <svg
            fill="#ffffff"
            viewBox="-2.4 -2.4 28.80 28.80"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            stroke-width="0.00024000000000000003"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="0.048"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M10.385 21.788a.997.997 0 0 0 .857.182l8-2A.999.999 0 0 0 20 19V5a1 1 0 0 0-.758-.97l-8-2A1.003 1.003 0 0 0 10 3v1H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4v1c0 .308.142.599.385.788zM12 4.281l6 1.5v12.438l-6 1.5V4.281zM7 18V6h3v12H7z"></path>
              <path d="M14.242 13.159c.446-.112.758-.512.758-.971v-.377a1 1 0 1 0-2 .001v.377a1 1 0 0 0 1.242.97z"></path>
            </g>
          </svg>
          <div className="sidebar_hide">
            <p className="sidebar_text">Cerrar Sesion</p>
          </div>
        </li>
      </ul>
    </aside>
  );
}
