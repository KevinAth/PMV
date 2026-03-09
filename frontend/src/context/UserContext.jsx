import { createContext, useEffect, useState } from "react";
import { GetNoti, VerificarUsuario } from "../routes/UserRoutes";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [notis, setNotis] = useState([]);


  const cargar = async () => {
    const token = localStorage.getItem("access")
    const res = await GetNoti(token)
    setNotis(res.data.result)
  }

  useEffect(() => {
    cargar()
    const interval = setInterval(async () => {
      const token = localStorage.getItem("access")
      const res = await GetNoti(token)
      setNotis(res.data.result)
    }, 20000)

    return () => clearInterval(interval)

  }, [])

  return (
    <UserContext.Provider value={{ notis }}>
      {children}
    </UserContext.Provider>
  );
}
