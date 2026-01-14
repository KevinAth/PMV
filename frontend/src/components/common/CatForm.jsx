import { CrearCat } from "../../routes/UserRoutes";
import styles from "../../styles/common/addForm.module.css";
import { useForm } from "react-hook-form";

export default function CatForm({ setOpencat }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access");
      const response = await CrearCat(data, token);
      alert(response.data.message);
      Setopencat(false)
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className={styles.div_principal}>
      <div className={styles.header_tittle}>
        <h3 className={styles.titulo}>Crear Categoria</h3>
        <div className={styles.cerrar} onClick={() => setOpencat(false)}>
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
      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.lavel_input}>Ingrese la Categoria</label>
        <input className={styles.inputForm} {...register("nombre")} />
        <div className={styles.botones}>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}
