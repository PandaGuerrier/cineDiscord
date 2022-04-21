import { useSession, signIn, signOut } from "next-auth/react"
import Nav from '../../../components/Nav'
import style from '../css/admin.module.css';
import useSWR from 'swr'
import Link from "next/link";

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
  
    if (res.status !== 200) {
      throw new Error("Unknow channel discord id!")
    }
    return data
  }

export default function Component() {
    const { data: session } = useSession()

    const { data, error } = useSWR(
        () => `/api/member/${session.user.email}`,
        fetcher
      )

    if (!session) {
        return (<>
            <Nav />
            <br />
            <br />
            <br />
            <div id="container">
                <center>
                    <h1>Connectez vous !</h1>
                </center>
            </div>
        </>)
    }

    if(!data) {
        return (
            <div>
                <Nav />
                <center><h1>Vous n'avez pas accès a cette page !</h1></center>
            </div>
        )
    }

    if (data.role === "Admin") {
        return (
            <div>
                <Nav />
                
                <Link href={"/admin"} passHref>
                    <div className={style.retour_button}>
                        <div>
                            <span></span>
                            <a href={"/admin"} rel="noreferrer" className={style.text}>retour</a>
                        </div>
                    </div>
                </Link>
                <div className={style.center_div}>
                    <div className={style.padding_div_user}>
                        <h1>User creator</h1>
                        <form action="/api/member" method="post" className={style.form}>
                            <div>
                                <label className={style.text_user} htmlFor="name">Pseudo :</label> <br/>
                                <input type="text" className={style.input_search_user} name="name" placeholder="Pseudo"/>
                            </div>
                            <div>
                                <label className={style.text_user} htmlFor="mail">E-mail&nbsp;:</label> <br/>
                                <input type="email" className={style.input_search_user} name="mail" placeholder="Email" />
                            </div>
                            <div>
                                <label className={style.text_user} htmlFor="role">Role&nbsp;:</label> <br/>
                                <input type="text" className={style.input_search_user} name="role" placeholder="Role" />
                            </div>
                            <div>
                                <label className={style.text_user} htmlFor="mdp">Mdp&nbsp;:</label> <br/>
                                <input type="password" className={style.input_search_user} name="mdp" placeholder="Mot de passe" />
                            </div>
                            <div>
                                <button type="submit" className={style.submit_button}> <a>Envoyer</a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Nav />
                <center><h1>Vous n'avez pas accès a cette page !</h1></center>
            </div>
        )
    }
}