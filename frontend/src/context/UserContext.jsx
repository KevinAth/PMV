import { createContext, useEffect, useState } from "react";
import { VerificarUsuario } from "../routes/UserRoutes";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, SetUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    
    VerificarUsuario(token).then((res)=>{
      SetUser(res.data.user)
    })
    
  },[]);

  useEffect(()=>{
    console.log(user?.id)
  },[user])

  return (
    <UserContext.Provider value={{ user, SetUser }}>
      {children}
    </UserContext.Provider>
  );
}
