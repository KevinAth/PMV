import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";
import { GetVariables } from "../../routes/UserRoutes";
import { Range, getTrackBackground } from "react-range";
import styles from "../../styles/common/filters.module.css";

export default function Filtros({ setSearchParams, opencat }) {
  const { control, handleSubmit, reset } = useForm();

  const [cat, setCat] = useState([]);
  const [prov, setProv] = useState([]);

  const getDatos = async () => {
    try {
      const token = localStorage.getItem("access");
      const datos = await GetVariables(token);
      setCat(datos.data.categorias);
      setProv(datos.data.proveedores);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDatos();
  }, []);

  useEffect(() => {
    getDatos();
  }, [opencat]);

  const [values, setValues] = useState([0, 100000]);
  const [stock, setStock] = useState([0, 3000]);

  const MINStock = 0;
  const MAXStock = 3000;

  const MINvalor = 0;
  const MAXvalor = 100000;

  const categoriaOptions = cat.map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  const proveedorOptions = prov.map((p) => ({
    value: p.id,
    label: p.nombre,
  }));

  const onSubmit = (data) => {
    const nuevosParams = {
      page: 1,
      categoria: data.categoria?.value || "",
      proveedor: data.proveedor?.value || "",
      precio_min: values[0],
      precio_max: values[1],
      stock_min: stock[0],
      stock_max: stock[1],
    };

    setSearchParams(nuevosParams);
  };

  const limpiarFiltros = () => {
    reset({
      categoria: null,
      proveedor: null,
    });

    setValues([0, 200000]);
    setStock([0, 5000]);

    setSearchParams({ page: 1 });
    window.location.reload();
  };

  return (
    <div className={styles.main_contenedor}>
      <div>
        <h3 className={styles.titulo}>Categoría</h3>
        <Controller
          name="categoria"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className={styles.options}
              options={categoriaOptions}
              placeholder="Selecciona categoría"
              maxMenuHeight={160}
              onChange={(option) => field.onChange(option)}
            />
          )}
        />
      </div>

      <div>
        <h3 className={styles.titulo}>Proveedor</h3>
        <Controller
          name="proveedor"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className={styles.options}
              options={proveedorOptions}
              placeholder="Selecciona proveedor"
              maxMenuHeight={160}
              onChange={(option) => field.onChange(option)}
            />
          )}
        />
      </div>

      <div className={styles.contenedor}>
        <h3 className={styles.titulo}>Filtrar por precio</h3>

        <div>
          <span>Min: ${values[0]} </span>
          <span> - Max: ${values[1]}</span>
        </div>

        <Range
          draggable={false}
          values={values}
          step={1000}
          min={MINvalor}
          max={MAXvalor}
          onChange={(vals) => setValues(vals)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className={styles.track}
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#22c55e", "#ccc"],
                  min: MINvalor,
                  max: MAXvalor,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={styles.thumb} />
          )}
        />
      </div>

      <div className={styles.contenedor}>
        <h3 className={styles.titulo}>Filtrar por stock</h3>

        <div>
          <span>Min: {stock[0]} </span>
          <span> - Max: {stock[1]}</span>
        </div>

        <Range
          draggable={false}
          values={stock}
          step={50}
          min={MINStock}
          max={MAXStock}
          onChange={(vals) => setStock(vals)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className={styles.track}
              style={{
                background: getTrackBackground({
                  values: stock,
                  colors: ["#ccc", "#22c55e", "#ccc"],
                  min: MINStock,
                  max: MAXStock,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={styles.thumb} />
          )}
        />
      </div>

      <div className={styles.div_button}>
        <button
          onClick={handleSubmit(onSubmit)}
          className={styles.button_buscar}
        >
          Buscar
        </button>
        <button onClick={limpiarFiltros} className={styles.button_limpiar}>
          Limpiar
        </button>
      </div>
    </div>
  );
}