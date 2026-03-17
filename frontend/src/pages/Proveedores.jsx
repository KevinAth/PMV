import AddProv from "../components/common/AddProv"
import { DeleteProves, GetProvers } from "../routes/UserRoutes"
import styles from "../styles/provee.module.css"
import { useState, useEffect, useRef } from 'react'
import editar from "../assets/editar.svg"
import eliminar from "../assets/eliminar.svg"
import PutProv from "../components/common/PutProver"

export default function Proveedores() {
  const [openProv, setOpenProv] = useState(false)
  const [openModProv, setOpenModProv] = useState(null)
  const [openEliProv, setOpenEliProv] = useState(null)
  const ref_prov = useRef(null)
  const [proveedores, setProveedores] = useState([])


  const Getprov = async () => {
    const token = localStorage.getItem("access")
    const res = await GetProvers(token)
    setProveedores(res.data.result)
  }

  const DeleteProv = async (id) => {
    try {
      const token = localStorage.getItem("access")
      const res = await DeleteProves(token, id)
      Getprov()
    } finally {
      setOpenEliProv(null)
    }

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

          {openProv && <AddProv setOpenProv={setOpenProv} Getprov={Getprov} data />}
        </div>
      </div>

      <div className={styles.grid_proveedores}>
        {proveedores.map((p) => (
          <div key={p.id} className={styles.card_proveedor}>
            <div className={styles.prov_wrapper}>
              <div className={styles.nombre_proveedor}>
                {p.nombre}
              </div>
              <div className={styles.optprov_cont}>
                <div onClick={() => setOpenModProv(p.id)} className={styles.ediprov}>
                  <img src={editar}></img>
                </div>
                <div className={styles.eliprov} onClick={() => setOpenEliProv(p.id)}>
                  <img src={eliminar}></img>
                </div>
              </div>
            </div>
            {openEliProv == p.id && <div className={styles.wrapper_elinoti}>
              <h3>¿Eliminar Proveedor?</h3>
              <div className={styles.boton_div}>
                <button className={styles.boton_no} onClick={() => setOpenEliProv(null)}>No</button>
                <button className={styles.boton_si} onClick={() => DeleteProv(p.id)}>Si</button>
              </div>
            </div>}
            {openModProv == p.id && <PutProv setOpenModProv={setOpenModProv} Getprov={Getprov} p={p} />}
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