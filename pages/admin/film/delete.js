import { useSession, signIn, signOut } from "next-auth/react"
import Nav from '../../../components/Nav'
import style from '../css/admin.module.css';
import useSWR from 'swr'
import Link from "next/dist/client/link";

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
                
                <Link href={"/admin/film"} passHref>
                    <div className={style.retour_button}>
                        <div>
                            <span></span>
                            <a href={"/admin"} rel="noreferrer" className={style.text}>retour</a>
                        </div>
                    </div>
                </Link>

                <div className={style.center_div_film_creator}>
                    <div className={style.width_input}>
                        <h1>Film deletor</h1>

                        <form action="/api/film/delete" method="post" className={style.form}>
                            <div>
                                <label className={style.label_user} htmlFor="id">Id :</label> <br/>
                                <input type="text" className={style.input_search_film} name="id" placeholder="281a3x7p10pb"/>
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="mdp">Mdp: </label> <br/>
                                <input type="password" className={style.input_search_film} name="mdp" placeholder="******"/>
                            </div>
                            <div>
                                <button type="submit" className={style.submit_button_publier}> <a className={style.buttonText}>Publier</a></button>
                            </div>
                            <br/>
                            <br/>
                            <br/>
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