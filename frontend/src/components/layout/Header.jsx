import styles from "../../styles/header.module.css";
import bell from "../../assets/bell.png";
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router"


export default function Header() {
  const [openNoti, setOpenNoti] = useState(false)
  const { notis } = useContext(UserContext)
  let navigate = useNavigate()

  return (
    <>
      <div className={styles.main_search_div}>
        <div className={styles.search_div}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.search_icon}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Buscar..."
          />
        </div>
        <div>
          <div className={styles.notiContainer}>
            <div >
              <button className={styles.notification} onClick={() => openNoti ? setOpenNoti(false) : setOpenNoti(true)}>
                <img src={bell} className={styles.notification_logo} />
              </button>
            </div>
            <div>
              {openNoti && (
                <div className={styles.notiPanel}>

                  {notis.length === 0 && (
                    <p>No hay notificaciones</p>
                  )}
                  {notis.map((n, i) => (
                    <div key={i} className={styles.notiItem} onClick={() => navigate(`details/${n.id}`)}>
                      {n.mensaje}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
