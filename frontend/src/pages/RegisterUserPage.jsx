import "../styles/login.module.css";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { registroUsuario } from "../routes/UserRoutes";

function RegisterUserPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => registroUsuario(data);

  return (
    <div className="contenedor-principal">
      <div className="contenedor-secundario">
        <div className="rframe">
          <h1 className="tittle-1">Crea Cuenta.</h1>
          <form
            action=""
            className="login-frame"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form__group">
              <input
                type="text"
                className="form__field"
                name="username"
                placeholder="User"
                autoComplete="off"
                {...register("usuario")}
              />
              <label htmlFor="username" className="form__label">
                Usuario
              </label>
            </div>
            <div className="form__group">
              <input
                type="text"
                className="form__field"
                name="Email"
                placeholder="Email"
                autoComplete="off"
                {...register("email")}
              />
              <label htmlFor="" className="form__label">
                Correo electronico
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__field"
                name="password"
                placeholder="password"
                {...register("password")}
              />
              <label htmlFor="" className="form__label">
                Contraseña
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__field"
                name="password"
                placeholder="password"
                {...register("password_val")}
              />
              <label htmlFor="" className="form__label">
                Repite contraseña
              </label>
            </div>
            <button className="boton-inicio" type="submit">
              Registrar Usuario
            </button>
            <Link to={"/sign_in"} className="links">
              Inicio de sesion
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserPage;
