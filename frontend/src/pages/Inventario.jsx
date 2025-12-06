import { useState } from "react";
import Table_items from "../components/ui/Table_items";
import styles from "../styles/inv.module.css";
import CatForm from "../components/common/CatForm";
import ProductForm from "../components/common/ProductForm";

export default function Inventario() {
  const [opencat, Setopencat] = useState(false);
  const [openprod, Setopenprod] = useState(false);

  return (
    <div className={styles.contenedor_principal}>
      <div className={styles.addcate_addprod}>
        <div>
          <h2>Inventario</h2>
        </div>
        <div className={styles.addbuttons}>
          <div>
            <button className={styles.button_add} onClick={()=> Setopencat(true)}>
              Crear Categortia
            </button>
            {opencat && <CatForm Setopencat={Setopencat}/>}
          </div>
          <div>
            <button className={styles.button_add} onClick={()=> Setopenprod(true)}>
              Crear Producto
            </button>
            {openprod && <ProductForm />}
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
