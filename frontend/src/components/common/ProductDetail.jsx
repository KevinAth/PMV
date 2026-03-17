import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router"
import { DeleteLote, DeleteProd, GetLotes, GetProductXid } from "../../routes/UserRoutes"
import styles from "../../styles/prodetails.module.css"
import AddLote from "./AddLote"
import AddMov from "./addmov"
import PutProduct from "./PutProduct"

export default function ProductDetail() {
  let { id } = useParams()
  let [datos, setDatos] = useState([])
  let [openLote, setOpenLote] = useState(false)
  let [datosLote, setDatosLote] = useState([])
  let [openMod, setOpenMod] = useState(false)
  let [openele, setOpenEle] = useState(false)
  let [openeleLote, setOpenEleLote] = useState(false)
  let navigate = useNavigate()

  const addlotes = async (id) => {
    const token = localStorage.getItem('access')
    const res = await GetLotes(token, id)
    setDatosLote(res.data.result)
  }
  const getproduct = async (token, id) => {
    const res = await GetProductXid(token, id)
    setDatos(res.data.result)
  }
  const deletelote = async (id_lote) => {
    try {
      const token = localStorage.getItem("access")
      const res = await DeleteLote(token, id_lote)
    } finally {
      setOpenEleLote(false)
    }
  }
  const deleteprod = async () => {
    try {
      const token = localStorage.getItem("access")
      const res = await DeleteProd(token, id)

    } finally {
      navigate("/panel_inicio/inventario")
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('access')
    getproduct(token, id)
    addlotes(id)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("access")
    getproduct(token, id)
    addlotes(id)
  }, [id, openLote, openMod, openeleLote])

  const ref_lot = useRef(null)
  const ref_mod = useRef(null)

  useEffect(() => {
    function clickAfuera(e) {
      if (openLote && ref_lot.current && !ref_lot.current.contains(e.target)) {
        setOpenLote(false);
      }
      if (openMod && ref_mod.current && !ref_mod.current.contains(e.target)) {
        setOpenMod(false);
      }
    }
    document.addEventListener("mousedown", clickAfuera);
    return () => document.removeEventListener("mousedown", clickAfuera);
  }, [openLote, openMod]);

  let lote = ""
  if (datos.maneja_lote == true) {
    lote = "Si"
  } else {
    lote = "No"
  }

  return (<>
    <div className={styles.main_cont}>
      <section className={styles.info_producto}>

        <div className={styles.img_wrapper}>
          <img
            src={`http://127.0.0.1:8000/${datos.imagen}`}
            alt={datos.nombre}
            className={styles.img}
          />
          <h4>Opciones de Manejo</h4>
          <div className={styles.button_wrapper}>
            <button className={styles.elimincar_boton} onClick={() => setOpenEle(!openele)}
            >Eliminar
            </button>
            {openele && <div className={styles.wrapper_elinoti}>
              <h3>¿Eliminar Producto?</h3>
              <div className={styles.boton_div}>
                <button className={styles.boton_no} onClick={() => setOpenEle(false)}>No</button>
                <button className={styles.boton_si} onClick={() => deleteprod()}>Si</button>
              </div>
            </div>}
            <div ref={ref_mod}>
              <button className={styles.modificar_boton}
                onClick={() => setOpenMod(!openMod)}>
                Modificar
              </button>
              {openMod && <PutProduct setOpenMod={setOpenMod} datos={datos} id={id} />}
            </div>
          </div>
        </div>

        <div className={styles.datos_producto}>

          <div className={styles.campo}>
            <h3>Nombre</h3>
            <span>{datos.nombre}</span>
          </div>

          <div className={styles.campo}>
            <h3>Categoría</h3>
            <span>{datos.categoria}</span>
          </div>

          <div className={styles.campo}>
            <h3>Proveedor</h3>
            <span>{datos.proveedor}</span>
          </div>

          <div className={styles.stock}>
            <div className={styles.campo}>
              <h3>Stock actual</h3>
              <span>{datos.stock_actual != 0 ? datos.stock_actual : " —"}</span>
            </div>

            <div className={styles.campo}>
              <h3>Stock mínimo</h3>
              <span>{datos.stock_minimo}</span>
            </div>
          </div>
          <div className={styles.campo_precio}>
            <h3>Precio de Venta c/u</h3>
            <span>{datos.precio != 0 ?
              new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(datos.precio_venta)
              : " —"}</span>
            <h3>Precio de compra</h3>
            <span>{datos.precio != 0 ?
              new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(datos.precio_compra)
              : " —"}</span>
          </div>
        </div>
      </section>
      <div>

      </div>
      <section className={styles.descripcion}>
        <h3>Descripción del producto</h3>
        <p>{datos.descripcion || "Sin descripción"}</p>
      </section>
      <section className={styles.contenedor_lotes}>
        <div className={styles.contenedorLoteL}>
          <h3>Lotes del producto</h3>
          <button onClick={() => setOpenLote(true)} className={styles.botonSubmit} >Agregar lote</button>
        </div>
        <div ref={ref_lot}>
          {openLote && <AddLote id={id} setOpenLote={setOpenLote} addlotes={addlotes} />}
        </div>
        <div className={styles.tabla_div}>
          <div className={styles.tabla_scroll}>
            <table className={styles.tabla_lotes}>
              <thead>
                <tr>
                  <th scope="col">Nombre de lote</th>
                  <th scope="col">Precio lote</th>
                  <th scope="col">Fecha de creación</th>
                  <th scope="col">Fecha de vencimiento</th>
                  <th scope="col">Cantidad Ingresada</th>
                  <th scope="col">Cantidad restante</th>
                  <th scope="col">Opt.</th>
                </tr>
              </thead>
              <tbody key={lote.id}>
                {datosLote.map((lote) => (
                  <tr key={lote.id}>
                    <th scope="row" className={styles.lote_id}>Lote #{lote.id}</th>
                    <td className={styles.precio}>{new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(lote.precio_lote)}</td>
                    <td>{lote.fecha_ingreso}</td>
                    <td>{lote.fecha_vencimiento}</td>
                    <td>{lote.cantidad_ingresada}</td>
                    <td className={
                      lote.cantidad_actual > 0
                        ? "cantidad_disponible"
                        : "cantidad_agotada"
                    }>{lote.cantidad_actual}</td>
                    <td>
                      <div className={styles.lotedelete} onClick={() => setOpenEleLote(!openeleLote)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26">
                          <path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531 5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625 C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125 4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906 8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22 L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z"></path>
                        </svg>
                      </div>
                      {openeleLote && <div className={styles.wrapper_elinoti}>
                        <h3>¿Eliminar Lote?</h3>
                        <div className={styles.boton_div}>
                          <button className={styles.boton_no} onClick={() => setOpenEleLote(false)}>No</button>
                          <button className={styles.boton_si} onClick={() => deletelote(lote.id)}>Si</button>
                        </div>
                      </div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section >
    </div >

  </>)
} 