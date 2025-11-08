import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

export const ValidarUsuario = (data) => axios.post(baseURL + "/valuser/", data);
export const registroUsuario = (data) =>
  axios.post(baseURL + "/resgisteruser/", data);
