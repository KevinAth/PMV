import styles from "../styles/login.module.css";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { registroUsuario } from "../routes/UserRoutes";
import { useState } from "react";

function RegisterUserPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [message, SetMessage] = useState("  ");

  const onSubmit = async (data) => {
    try {
      const response = await registroUsuario(data);
      navigate("/sign_in");
    } catch (error) {
      SetMessage(error.response.data.message);
    }
  };
  return (
    <div className={styles.contenedor_principal}>
      <div className={styles.contenedor_secundario}>
        <div className={styles.rframe}>
          <div className={styles.message_div}>
            <h1 className={styles.tittle_1}>Crea Cuenta.</h1>
            <p className={styles.message}>{message || "\u00A0"}</p>
          </div>
          <form
            action=""
            className={styles.login_frame}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.form__group}>
              <input
                type="text"
                className={styles.form__field}
                name="username"
                id="username"
                placeholder="User"
                autoComplete="off"
                {...register("usuario")}
              />
              <label htmlFor="username" className={styles.form__label}>
                Usuario
              </label>
            </div>
            <div className={styles.form__group}>
              <input
                type="email"
                className={styles.form__field}
                name="Email"
                id="Email"
                placeholder="Email"
                autoComplete="off"
                {...register("email")}
              />
              <label htmlFor="" className={styles.form__label}>
                Correo electronico
              </label>
            </div>
            <div className={styles.form__group}>
              <input
                type="password"
                className={styles.form__field}
                name="password"
                id="password"
                placeholder="password"
                {...register("password")}
              />
              <label htmlFor="" className={styles.form__label}>
                Contraseña
              </label>
            </div>
            <div className={styles.form__group}>
              <input
                type="password"
                className={styles.form__field}
                name="password_val"
                id="password_val"
                placeholder="password_val"
                {...register("password_val")}
              />
              <label htmlFor="" className={styles.form__label}>
                Repite contraseña
              </label>
            </div>
            <button className={styles.boton_inicio} type="submit">
              Registrar Usuario
            </button>
            <Link to={"/sign_in"} className={styles.links}>
              Inicio de sesion
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserPage;
