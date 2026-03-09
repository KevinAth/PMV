import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import { GetLotes, GetProductXid } from "../../routes/UserRoutes"
import styles from "../../styles/prodetails.module.css"
import AddLote from "./AddLote"

export default function ProductDetail() {
  let { id } = useParams()
  let [datos, setDatos] = useState([])
  let [openLote, setOpenLote] = useState(false)
  let [datosLote, setDatosLote] = useState([])


  const addlotes = async (id) => {
    const token = localStorage.getItem('access')
    const res = await GetLotes(token, id)
    setDatosLote(res.data.result)
  }
  const getproduct = async (token, id) => {
    const res = await GetProductXid(token, id)
    setDatos(res.data.result)
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
  }, [id, openLote])

  const ref_lot = useRef(null)

  useEffect(() => {
    function clickAfuera(e) {
      if (openLote && ref_lot.current && !ref_lot.current.contains(e.target)) {
        setOpenLote(false);
      }
    }
    document.addEventListener("mousedown", clickAfuera);
    return () => document.removeEventListener("mousedown", clickAfuera);
  }, [openLote]);

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
            <h3>Precio</h3>
            <span>{datos.precio != 0 ?
              new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(datos.precio_venta)
              : " —"}</span>
          </div>

        </div>
      </section>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

  </>)
} 