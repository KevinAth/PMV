import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import styles from "../../styles/common/addLote.module.css"
import { AddLoteres } from "../../routes/UserRoutes"


export default function AddLote({ id, setOpenLote, addlotes }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const id_is = id
      const token = localStorage.getItem("access")
      await AddLoteres(data, token, id_is)
    } catch (error) {
      console.error(error)
    } finally {
      setOpenLote(false)
      addlotes(id)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.lotediv}>
      <h3 className={styles.titulo}>Ingresar Lote nuevo</h3>

      <div className={styles.campo}>
        <h4 className={styles.label}>Cantidad del lote.</h4>
        <input className={styles.input} type="number" {...register("cantidad_lote")} />
      </div>

      <div className={styles.campo}>
        <h4 className={styles.label}>Ingresar precio del lote.</h4>
        <input className={styles.input} type="number" {...register("precio_lote")} />
      </div>

      <div className={styles.campo}>
        <h4 className={styles.label}>Ingresar fecha de vencimiento.</h4>
        <input className={styles.input} type="date" {...register("vencimiento_lote")} />
      </div>

      <div className={styles.botones}>
        <button className={styles.cancelar} onClick={() => setOpenLote(false)}>Cancelar</button>
        <button className={styles.agregar} type="submit">Agregar</button>
      </div>
    </form>
  )
}