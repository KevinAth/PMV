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

export const GetInventory = (token, page) => axios.get(baseURL + `/obtenerprodxpag/${page}/`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})

export const GetProductXid = (token, id) => axios.get(baseURL + `/getprodxid/${id}/`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})

export const AddLoteres = (data, token, id) => axios.post(baseURL + `/addlote/${id}/`, data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const GetLotes = (token, id) => axios.get(baseURL + `/addlotes/${id}/`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
})

export const AddProvers = (token, data) => axios.post(baseURL + "/addprov/", data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const GetProvers = (token) => axios.get(baseURL + "/getprov/", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const GetNoti = (token) => axios.get(baseURL + "/getnoti/",{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
