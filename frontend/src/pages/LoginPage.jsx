import styles from "../styles/login.module.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ValidarUsuario } from "../routes/UserRoutes";
import { useState } from "react";

function UserPage() {
  const navigate = useNavigate();
  const [message, Setmessage] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await ValidarUsuario(data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/panel_inicio");
    } catch (error) {
      Setmessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.contenedor_principal}>
      <div className={styles.contenedor_secundario}>
        <div className={styles.rframe}>
          <div>
            <img src={logo} alt="<--X--X--X-->" className={styles.logo} />
          </div>
          <div className={styles.message_div}>
            <h1 className={styles.tittle_1}>Inicio de sesion.</h1>
            <p className={styles.message}>{message}</p>
          </div>
          <form
            className={styles.login_frame}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.form__group}>
              <input
                type="text"
                className={styles.form__field}
                placeholder="Name"
                name="username"
                id="username"
                autoComplete="off"
                spellCheck="false"
                {...register("usuario")}
                required
              />
              <label htmlFor="username" className={styles.form__label}>
                Usuario
              </label>
            </div>
            <div className={styles.form__group}>
              <input
                type="password"
                className={styles.form__field}
                placeholder="password"
                name="password"
                id="password"
                {...register("password")}
                required
              />
              <label htmlFor="password" className={styles.form__label}>
                Contraseña
              </label>
              <Link className={styles.links}>¿Olvidaste la contraseña?</Link>
            </div>
            <div></div>
            <button className={styles.boton_inicio} type="submit">
              Ingresar
            </button>
          </form>
        </div>
        <div className={styles.rframe2}>
          <div className={styles.redireccion}>
            <p>¿No tienes una cuenta? </p>
            <Link to={"/sign_up"} className={styles.links}>
              Crea una cuenta.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
