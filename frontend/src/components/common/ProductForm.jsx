import { useForm } from "react-hook-form";
import styles from "../../styles/common/addForm.module.css";
import { CrearProd } from "../../routes/UserRoutes";

export default function ProductForm({ Setopenprod }) {
  const { register, handleSubmit } = useForm();

  const submitForm = async (data) => {
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      formData.append("categoria", data.categoria);
      formData.append("proveedor", data.proveedor);
      formData.append("precio_venta", data.precio_venta);
      formData.append("stock_minimo", data.stock_minimo);
      formData.append("maneja_lote", data.maneja_lote);
      formData.append("imagen", data.imagen[0]);
      const response = await CrearProd(formData, token);
      console.log("Salio bien", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.div_principal}>
      <div className={styles.header_tittle}>
        <h3 className={styles.titulo}>Crear Producto</h3>
        <div className={styles.cerrar} onClick={() => Setopenprod(false)}>
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
      <form
        className={styles.formulario_prod}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className={styles.div_secundario}>
          <div className={styles.content_div}>
            <label htmlFor="">Nombre del Producto.</label>
            <input
              type="text"
              className={styles.inputForm}
              {...register("nombre")}
            />
            <label htmlFor="">Descripción del producto.</label>
            <textarea
              maxLength={240}
              className={styles.inputForm}
              {...register("descripcion")}
            ></textarea>
            <label htmlFor="">Categoria.</label>
            <select name="select" {...register("categoria")}>
              <option value="68ef4afb-09c6-469e-800e-42f314126cff">
                valor1
              </option>
              <option value="69794c9e-a4da-4c45-969c-e9e0f767cecf">
                valor3
              </option>
              <option value="value3">valor2</option>
            </select>
            <label htmlFor="">Proveedor.</label>
            <select name="select" {...register("proveedor")}>
              <option value="550e8400-e29b-41d4-a716-446655440000">
                valor1
              </option>
              <option value="value2">valor3</option>
              <option value="value3">valor2</option>
            </select>
          </div>
          <div className={styles.content_div}>
            <label htmlFor="">Precio de venta.</label>
            <input
              type="number"
              min={0}
              className={styles.inputForm}
              {...register("precio_venta")}
            />
            <label htmlFor="">Stock minimo.</label>
            <input
              type="number"
              min={0}
              className={styles.inputForm}
              {...register("stock_minimo")}
            />

            <label htmlFor="">¿Maneja lote de productos?</label>
            <select name="" {...register("maneja_lote")}>
              <option value="True">Si</option>
              <option value="False">No</option>
            </select>
            <label htmlFor="">Imagen del producto.</label>
            <input type="file" name="imagen" {...register("imagen")} />
          </div>
        </div>
        <div className={styles.botones}>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}
