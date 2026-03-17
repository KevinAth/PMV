import { AddProvers } from "../../routes/UserRoutes"
import styles from "../../styles/common/Addprov.module.css"
import { useForm } from "react-hook-form"

export default function AddMov({ setOpenMov, datos, datosLote }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access")
      const res = await AddProvers(token, data)
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setOpenProv(false)
      Getprov()
    }
  }

  return (
    <div className={styles.div_principal}>
      <div className={styles.header_tittle}>
        <h3 className={styles.titulo}>Registrar Movimiento</h3>
      </div>

      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.div_secundario}>

          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Lote</label>
            <select className={styles.inputForm} {...register("lote")}>
              {datosLote.map((lote) => (
                <option key={lote.id}>
                  Lote {lote.id}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Tipo de Movimiento</label>
            <select className={styles.inputForm} {...register("tipo_movimiento")}>
              <option value="salida">Salida</option>
              <option value="ajuste">Ajuste</option>
            </select>
          </div>

          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Cantidad</label>
            <input
              type="number"
              className={styles.inputForm}
              {...register("cantidad")}
            />
          </div>

        </div>

        <div className={styles.content_div}>
          <label className={styles.lavel_input}>Motivo del movimiento</label>
          <textarea
            className={styles.inputForm}
            {...register("motivo")}
          ></textarea>
        </div>

        <div className={styles.botones}>
          <button type="button" onClick={() => setOpenMov(false)}>
            Cancelar
          </button>
          <button type="submit">Confirmar</button>
        </div>

      </form>
    </div>
  )
}