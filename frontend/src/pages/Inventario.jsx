import { useEffect, useState, useRef } from "react";
import Table_items from "../components/ui/Table_items";
import styles from "../styles/inv.module.css";
import CatForm from "../components/common/CatForm";
import ProductForm from "../components/common/ProductForm";
import { GetInventory } from "../routes/UserRoutes";
import { useParams, useSearchParams } from "react-router"
import { Link } from "react-router"
import Paginacion from "../components/common/Paginacion";
import Filtros from "../components/ui/Filtros";

export default function Inventario() {
  const [opencat, setOpencat] = useState(false);
  const [openprod, setOpenprod] = useState(false);
  const [datos, setDatos] = useState()
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1)

  useEffect(() => {
    const new_page = Number(searchParams.get("page")) || 1
    setPage(new_page)
  }, [searchParams])

  const changePage = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = newPage;
    setSearchParams(params);
  };

  const filtros = Object.fromEntries(
    Object.entries({
      categoria: searchParams.get("categoria"),
      proveedor: searchParams.get("proveedor"),
      precio_min: searchParams.get("precio_min"),
      precio_max: searchParams.get("precio_max"),
      stock_min: searchParams.get("stock_min"),
      stock_max: searchParams.get("stock_max"),
    }).filter(([_, v]) => v !== null && v !== "" && v !== "null")
  );

  const Getdata = async () => {
    try {
      let token = localStorage.getItem("access");
      const params = new URLSearchParams({
        ...filtros
      }).toString();
      const res = await GetInventory(token, page, params);
      setDatos(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Getdata()
  }, [searchParams, openprod])

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
              {openprod && <ProductForm setOpenprod={setOpenprod} Getdata={Getdata} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main_inv_filter}>
        <div>
          <Filtros setSearchParams={setSearchParams} />
        </div>
        <div className={styles.inventario}>
          {!datos ? <p>No hay productos disponibles.</p> : <>
            <table className={styles.table_cont}>
              <thead className={styles.thead}>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Stock total</th>
                  <th scope="col">Precio por unidad</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {datos.data.result.map((item) => (
                  <Table_items item={item} key={item.id} />
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              {datos.data.conunt >= 1 && <Paginacion page={page} max_page={datos.data.total_pages} searchParams={searchParams} setSearchParams={setSearchParams} />}
            </div>
          </>
          }
          <div />
        </div>
      </div>
    </div>
  );
}