import "../styles/login.css";
import logo from "../assets/logo.png";
import { Link } from "react-router";
function UserPage() {
  return (
    <div className="contenedor-principal">
      <div className="contenedor-secundario">
        <div className="rframe">
          <div>
            <img src={logo} alt="----" className="logo" />
          </div>
          <h1 className="tittle-1">Inicio de sesion.</h1>
          <form className="login-frame">
            <div className="form__group">
              <input
                type="text"
                className="form__field"
                placeholder="Name"
                name="username"
                id="username"
                autoComplete="off"
                spellCheck="false"
              />
              <label htmlFor="username" className="form__label">
                Usuario
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__field"
                placeholder="password"
                name="password"
                id="password"
              />
              <label htmlFor="password" className="form__label">
                Contraseña
              </label>
            </div>
            <button className="boton-inicio" type="submit">
              Ingresar
            </button>
          </form>
        </div>
        <div className="rframe2">
          <p>
            ¿No tienes cuenta?<Link to={"/"}>aaaa</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UserPage;
