import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

export const ValidarUsuario = (data) => axios.post(baseURL + "/valuser/", data);
export const registroUsuario = (data) =>
  axios.post(baseURL + "/resgisteruser/", data);

export const VerificarUsuario = (token) =>
  axios.get(baseURL + "/uservalidate/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const CrearCat = (data, token) =>
  axios.post(baseURL + "/crearcat/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const CrearProd = (data, token) =>
  axios.post(baseURL + "/createprod/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const GetVariables = (token) =>
  axios.get(baseURL + "/obtenervar/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

// Obtener los productos del inventario con paginador

export const GetInventory = (token,page) => axios.get(baseURL + `/obtenerprodxpag/${page}/` , {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
