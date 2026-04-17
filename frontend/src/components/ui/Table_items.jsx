import styles from "../../styles/inv.module.css";
import { useNavigate } from "react-router"
export default function Table_items({ item }) {
  const navigate = useNavigate()
  let lote = ""
  if (item.maneja_lote == true) {
    lote = "Si"
  } else {
    lote = "No"
  }
  function Recorte(descripcion) {
    return descripcion.length > 30 ? descripcion.slice(0, 25) + "..." : descripcion
  }
  return <tr className={styles.item_table} onClick={() => navigate(`/panel_inicio/details/${item.id}`)}>
    <th scope="row" className={styles.col_nombre}>{item.nombre}</th>
    <td className={styles.col_descripcion}>{Recorte(item.descripcion)}</td>
    <td>{item.categoria}</td>
    <td>{item.proveedor}</td>
    <td>{item.stock_actual}</td>
    <td>$ {item.precio_venta}</td>
  </tr>
}