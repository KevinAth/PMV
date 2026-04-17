import styles from "../../styles/common/paginador.module.css";

export default function Paginacion({ page, next, previous, max_page, searchParams }) {

  const buildUrl = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    return `/panel_inicio/inventario?${params.toString()}`;
  };

  let contenido = null;

  if (max_page > 3 && page >= 3 && page < max_page - 2) {
    contenido = (
      <>
        <nav className={styles.nav_pagin}>
          <ul className={styles.ul}>
            <li>
              <a href={buildUrl(page - 1)}>{"< Anterior"}</a>
            </li>
            <li className={styles.li}>
              <a className={styles.link} href={buildUrl(1)}>1</a>
            </li>
            <li>...</li>
            <li className={styles.li}>
              <a className={styles.link} href={buildUrl(page - 1)}>{page - 1}</a>
            </li>
            <li className={styles.li}>
              <a className={styles.active} href={buildUrl(page)}>{page}</a>
            </li>
            <li className={styles.li}>
              <a className={styles.link} href={buildUrl(page + 1)}>{page + 1}</a>
            </li>
            <li>...</li>
            <li className={styles.li}>
              <a className={styles.link} href={buildUrl(max_page)}>{max_page}</a>
            </li>
            <li>
              <a href={buildUrl(page + 1)}>{"Siguiente >"}</a>
            </li>
          </ul>
        </nav>
      </>
    );
  } else if (page == 1 || page == 2 || page == 3) {
    contenido = (
      <>
        <nav className={styles.nav_pagin}>
          <ul className={styles.ul}>
            {page != 1 &&
              <li>
                <a href={buildUrl(page - 1)}>{"< Anterior"}</a>
              </li>
            }
            <li className={styles.li}>
              <a className={page == 1 ? styles.active : styles.link} href={buildUrl(1)}>1</a>
            </li>
            {max_page >= 2 &&
              <li className={styles.li}>
                <a className={page == 2 ? styles.active : styles.link} href={buildUrl(2)}>2</a>
              </li>
            }
            {max_page >= 3 &&
              <li className={styles.li}>
                <a className={page == 3 ? styles.active : styles.link} href={buildUrl(3)}>3</a>
              </li>
            }
            {max_page >= 4 && <>
              <li>...</li>
              <li className={styles.li}>
                <a className={page == max_page ? styles.active : styles.link} href={buildUrl(max_page)}>{max_page}</a>
              </li>
            </>
            }
            {page != max_page &&
              <li>
                <a href={buildUrl(page + 1)}>{"Siguiente >"}</a>
              </li>
            }
          </ul>
        </nav>
      </>
    );
  } else if (page >= (max_page - 2)) {
    contenido = (
      <>
        <nav className={styles.nav_pagin}>
          <ul className={styles.ul}>
            <li>
              <a href={buildUrl(page - 1)}>{"<"}</a>
            </li>
            <li className={styles.li}>
              <a className={page == 1 ? styles.active : styles.link} href={buildUrl(1)}>1</a>
            </li>
            <li>...</li>
            {page >= max_page - 2 &&
              <li className={styles.li}>
                <a className={page == max_page - 3 ? styles.active : styles.link} href={buildUrl(max_page - 3)}>
                  {max_page - 3}
                </a>
              </li>
            }
            <li className={styles.li}>
              <a className={page == max_page - 2 ? styles.active : styles.link} href={buildUrl(max_page - 2)}>
                {max_page - 2}
              </a>
            </li>
            <li className={styles.li}>
              <a className={page == max_page - 1 ? styles.active : styles.link} href={buildUrl(max_page - 1)}>
                {max_page - 1}
              </a>
            </li>
            <li className={styles.li}>
              <a className={page == max_page ? styles.active : styles.link} href={buildUrl(max_page)}>
                {max_page}
              </a>
            </li>
            {page != max_page &&
              <li>
                <a href={buildUrl(page + 1)}>{">"}</a>
              </li>
            }
          </ul>
        </nav>
      </>
    );
  }

  return contenido;
}