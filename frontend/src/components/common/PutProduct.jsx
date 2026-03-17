import { useForm, Controller } from "react-hook-form";
import styles from "../../styles/common/addForm.module.css";
import { CrearProd, GetVariables, ModiProd } from "../../routes/UserRoutes";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function PutProduct({ setOpenMod, datos, id }) {
  const { register, handleSubmit, control } = useForm();

  const [cat, setCat] = useState([]);
  const [prov, setProv] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDatos = async () => {
      try {
        const token = localStorage.getItem("access");
        const datos = await GetVariables(token);
        setCat(datos.data.categorias);
        setProv(datos.data.proveedores);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDatos();
  }, []);

  const submitForm = async (data) => {
    try {
      const token = localStorage.getItem("access");

      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      formData.append("categoria", data.categoria.value);
      formData.append("proveedor", data.proveedor.value);
      formData.append("stock_minimo", data.stock_minimo);
      formData.append("maneja_lote", data.maneja_lote);
      formData.append("imagen", data.imagen[0]);

      const response = await ModiProd(token, id, formData);
    } catch (error) {
      console.error(error);
    } finally {
      setOpenMod(false)
    }
  };
  const booleanOptions = [{
    value: "true",
    label: "Si",
  },
  {
    value: "false",
    label: "No"
  }];

  const categoriaOptions = cat.map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  const proveedorOptions = prov.map((p) => ({
    value: p.id,
    label: p.nombre,
  }));

  return loading ? (
    <div className={styles.cargando}>
      <h2>Cargando...</h2>
    </div>
  ) : (
    <div className={styles.div_principal}>
      <div className={styles.header_tittle}>
        <h3 className={styles.titulo}>Modificar Producto</h3>
        <div className={styles.cerrar} onClick={() => setOpenMod(false)}>
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
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
            <label>Nombre del Producto</label>
            <input
              type="text"
              className={styles.inputForm}
              defaultValue={datos.nombre}
              {...register("nombre")}
            />

            <label>Descripción</label>
            <textarea
              maxLength={240}
              defaultValue={datos.descripcion}
              className={styles.inputForm}
              {...register("descripcion")}
            />

            <label>Categoría</label>
            <Controller
              name="categoria"
              control={control}
              render={({ field }) => (
                <Select
                  className={styles.select}
                  {...field}
                  options={categoriaOptions}
                  placeholder="Selecciona categoría"
                  maxMenuHeight={160}
                  onChange={(option) => field.onChange(option)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              )}
            />
            <label>Proveedor</label>
            <Controller
              name="proveedor"
              control={control}
              render={({ field }) => (
                <Select
                  className={styles.select}
                  {...field}
                  options={proveedorOptions}
                  placeholder="Selecciona proveedor"
                  maxMenuHeight={160}
                  onChange={(option) => field.onChange(option)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              )}
            />
          </div>
          <div className={styles.content_div}>

            <label>Stock mínimo</label>
            <input
              type="number"
              min={0}
              defaultValue={datos.stock_minimo}
              className={styles.inputForm}
              {...register("stock_minimo")}
            />
            <label>¿Maneja lote?</label>
            <Controller
              name="lote"
              control={control}
              render={({ field }) => (
                <Select
                  className={styles.select}
                  {...field}
                  options={booleanOptions}
                  placeholder="Selecciona una opción."
                  maxMenuHeight={160}
                  onChange={(option) => field.onChange(option)}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              )}
            />
            <label>Imagen</label>
            <input type="file" {...register("imagen")} />
          </div>
        </div>

        <div className={styles.botones}>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}