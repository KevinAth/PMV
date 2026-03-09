import AddProv from "../components/common/AddProv"
import { GetProvers } from "../routes/UserRoutes"
import styles from "../styles/provee.module.css"
import { useState, useEffect, useRef } from 'react'

export default function Proveedores() {
  const [openProv, setOpenProv] = useState(false)
  const ref_prov = useRef(null)
  const [proveedores, setProveedores] = useState([])

  const Getprov = async () => {
    const token = localStorage.getItem("access")
    const res = await GetProvers(token)
    setProveedores(res.data.result)
  }
  useEffect(() => {
    Getprov()
  }, [])

  useEffect(() => {
    function clickAfuera(e) {
      if (openProv && ref_prov.current && !ref_prov.current.contains(e.target)) {
        setOpenProv(false);
      }
    }
    document.addEventListener("mousedown", clickAfuera);
    return () => document.removeEventListener("mousedown", clickAfuera);
  }, [openProv]);

  return (
    <div className={styles.contenedor_principal_prov}>
      <div className={styles.contenedor_label}>
        <h2>Proveedores</h2>

        <div ref={ref_prov}>
          <button onClick={() => setOpenProv(true)}>
            Añadir Proveedor
          </button>

          {openProv && <AddProv setOpenProv={setOpenProv} Getprov={Getprov} />}
        </div>
      </div>

      <div className={styles.grid_proveedores}>
        {proveedores.map((p) => (
          <div key={p.id} className={styles.card_proveedor}>

            <div className={styles.nombre_proveedor}>
              {p.nombre}
            </div>

            <p className={styles.info_proveedor}>
              📞 {p.telefono}
            </p>

            <p className={styles.info_proveedor}>
              📍 {p.direccion}
            </p>

            <p className={styles.info_proveedor}>
              ✉ {p.email}
            </p>

            <p className={styles.info_proveedor}>
              {p.acerca}
            </p>

          </div>
        ))}
      </div>

    </div>
  )
}