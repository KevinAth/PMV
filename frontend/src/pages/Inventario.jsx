import { useEffect, useState, useRef } from "react";
import Table_items from "../components/ui/Table_items";
import styles from "../styles/inv.module.css";
import CatForm from "../components/common/CatForm";
import ProductForm from "../components/common/ProductForm";
import { GetInventory } from "../routes/UserRoutes";
import { useParams, useSearchParams } from "react-router"
import { Link } from "react-router"
import Paginacion from "../components/common/Paginacion";

export default function Inventario() {
  const [opencat, setOpencat] = useState(false);
  const [openprod, setOpenprod] = useState(false);
  const [datos, setDatos] = useState()
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1)
  console.log(page)

  useEffect(() => {
    const new_page = Number(searchParams.get("page")) || 1
    setPage(new_page)
  }, [searchParams])

  const changePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  useEffect(() => {
    let token = localStorage.getItem("access")
    const Getdata = async () => {
      try {
        const res = await GetInventory(token, page)
        setDatos(res)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
    Getdata()
  }, [searchParams])

  const ref_cat = useRef(null);
  const ref_prod = useRef(null);

  // Cierre automatico de las ventanas al oprimir fuera de estas mismas.
  useEffect(() => {
    function clickAfuera(e) {
      if (opencat && ref_cat.current && !ref_cat.current.contains(e.target)) {
        setOpencat(false);
      }
      if (
        openprod &&
        ref_prod.current &&
        !ref_prod.current.contains(e.target)
      ) {
        setOpenprod(false);
      }
    }
    document.addEventListener("mousedown", clickAfuera);
    return () => document.removeEventListener("mousedown", clickAfuera);
  }, [opencat, openprod]);

  return (
    <div className={styles.contenedor_principal}>
      <div className={styles.addcate_addprod}>
        <div>
          <h2>Inventario</h2>
        </div>
        <div className={styles.addbuttons}>
          <div>
            <button
              className={styles.button_add}
              onClick={() => setOpencat(!opencat)}
            >
              Crear Categoria
            </button>
            <div ref={ref_cat}>
              {opencat && <CatForm setOpencat={setOpencat} />}
            </div>
          </div>
          <div>
            <button
              className={styles.button_add}
              onClick={() => setOpenprod(!openprod)}
            >
              Crear Producto
            </button>
            <div ref={ref_prod}>
              {openprod && <ProductForm setOpenprod={setOpenprod} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main_inv_filter}>
        <div className={styles.inventario}>
          {!datos ? <p>Cargando...</p> : <>
            <table className={styles.table_cont}>
              <thead className={styles.thead}>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">¿Maneja Lotes?</th>
                  <th scope="col">Precio por unidad</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {datos.data.result.map((item) => (
                  <Table_items item={item} key={item.id} />
                ))}
              </tbody>
            </table>
            <div>
              <Paginacion changePage={changePage} page={page} max_page={datos.data.total_pages} next={datos.data.has_next} previous={datos.data.has_previous} />
            </div>
          </>
          }
          <div />
        </div>
      </div>
    </div>
  );
}