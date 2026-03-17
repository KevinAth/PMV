import { AddProvers, ModiProvs } from "../../routes/UserRoutes"
import styles from "../../styles/common/Addprov.module.css"
import { useForm } from "react-hook-form"

export default function PutProv({ setOpenModProv, Getprov, p }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access")
      const res = await ModiProvs(token, p.id, data)
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setOpenModProv(null)
      Getprov()
    }
  }

  return (
    <div className={styles.div_principal}>
      <div className={styles.header_tittle}>
        <h3 className={styles.titulo}>Modificar Proveedor.</h3>
      </div>
      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.div_secundario}>
          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Nombre</label>
            <input className={styles.inputForm} defaultValue={p.nombre} {...register("nombre")} />
          </div>
          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Teléfono</label>
            <input className={styles.inputForm} defaultValue={p.telefono} {...register("telefono")} />
          </div>
          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Dirección</label>
            <input className={styles.inputForm} defaultValue={p.direccion} {...register("direccion")} />
          </div>
          <div className={styles.content_div}>
            <label className={styles.lavel_input}>Correo Electrónico</label>
            <input className={styles.inputForm} defaultValue={p.email} {...register("email")} />
          </div>
        </div>
        <div className={styles.content_div}>
          <label className={styles.lavel_input}>Acerca del proveedor</label>
          <textarea className={styles.inputForm} defaultValue={p.acerca} {...register("acerca")}></textarea>
        </div>
        <div className={styles.botones}>
          <button type="button" onClick={() => setOpenModProv(null)}>Cancelar</button>
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  )
}