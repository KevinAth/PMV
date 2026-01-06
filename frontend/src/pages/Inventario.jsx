import { useEffect, useState, useRef } from "react";
import Table_items from "../components/ui/Table_items";
import styles from "../styles/inv.module.css";
import CatForm from "../components/common/CatForm";
import ProductForm from "../components/common/ProductForm";
import { useParams, useSearchParams } from "react-router"

export default function Inventario() {
  const [opencat, Setopencat] = useState(false);
  const [openprod, Setopenprod] = useState(false);

  const ref_cat = useRef(null);
  const ref_prod = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = 1
  
  useEffect(() => {
    setSearchParams("?page=" + page)
  }, [])

  useEffect(() => {
    function clickAfuera(e) {
      if (opencat && ref_cat.current && !ref_cat.current.contains(e.target)) {
        Setopencat(false);
      }

      if (
        openprod &&
        ref_prod.current &&
        !ref_prod.current.contains(e.target)
      ) {
        Setopenprod(false);
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
              onClick={() => Setopencat(!opencat)}
            >
              Crear Categoria
            </button>
            <div ref={ref_cat}>
              {opencat && <CatForm Setopencat={Setopencat} />}
            </div>
          </div>
          <div>
            <button
              className={styles.button_add}
              onClick={() => Setopenprod(!openprod)}
            >
              Crear Producto
            </button>
            <div ref={ref_prod}>
              {openprod && <ProductForm Setopenprod={Setopenprod} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main_inv_filter}>
        <div className={styles.filters}></div>
        <div className={styles.inventary}>
          <Table_items />
        </div>
      </div>
    </div>
  );
}