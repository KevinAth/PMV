import "../styles/login.css";
import { Link } from "react-router";

function RegisterUserPage() {
  return (
    <div className="contenedor-principal">
      <div className="contenedor-secundario">
        <div className="rframe">
          <h1 className="tittle-1">Crea Cuenta.</h1>
          <form action="" className="login-frame">
            <div className="form__group">
              <input
                type="text"
                className="form__field"
                name="username"
                placeholder="User"
                autoComplete="off"
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
              />
              <label htmlFor="" className="form__label">
                Repite contraseña
              </label>
            </div>
            <button className="boton-inicio">Registrar Usuario</button>
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
