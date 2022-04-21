import { useSession, signIn, signOut } from "next-auth/react"
import styles from './css/Nav.module.css'

export default function Log() {
  const {data: session} = useSession() 
  if(!session) {
  return(
    <button className={styles.login} onClick={() => signIn()}><a className={styles.text}>Login</a></button>
  )
  } else {
    return(
    <button className={styles.login} onClick={() => signOut()}><a className={styles.text}>Logout</a></button>
  )
  }
}