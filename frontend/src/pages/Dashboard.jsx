import { Outlet } from "react-router";
import Sidebard from "../components/layout/Sidebard";
import Header from "../components/layout/Header";
import styles from "../styles/main.module.css";

export default function Dashboard() {
  return (
    <div className={styles.contenedor_main}>
      <div className={styles.contenedor_sidebar}>
        <Sidebard />
      </div>
      <div className={styles.contenido_principal}>
        <div className={styles.header_div}>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
