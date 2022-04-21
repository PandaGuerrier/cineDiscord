import Link from "next/link";
import styles from './css/Nav.module.css'
import LogButton from './Login'
import Search from './Search'

export default function Nav() {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.flex}>
              <Link href={"/"} passHref>
                <a href={"/"} className={styles.here} rel="noreferrer">Accueil</a>
              </Link>

              <Link href={"/films"} passHref>
                <a href={"/"} rel="noreferrer">Films</a>
              </Link>

              <Link href={"/"} passHref>
                <a href={"/"} rel="noreferrer">Discord</a>
              </Link>
        </div>
        <LogButton />
      </div>
  <Search/>
</>
  )
}