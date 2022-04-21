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
            <div id="container">
                <center>
                    <h1>Connectez vous !</h1>
                </center>
            </div>
        </>)
    }

    if (!data) {
        return (
            <div>
                <Nav />
                <center><h1>Vous n'avez pas accès a cette page !</h1></center>
            </div>
        )
    }

    if (data.role === "Admin") {
        return (<>
                <Nav />
                
                <Link href={"/admin/"} passHref>
                    <div className={style.retour_button}>
                        <div>
                            <span></span>
                            <a href={"/admin"} rel="noreferrer" className={style.text}>retour</a>
                        </div>
                    </div>
                </Link>

                <div className={style.div_flex}>
                    <Link href={"/admin/film/create"} passHref>
                        <div className={style.user}>
                            <a href={"/admin/user"} rel="noreferrer" className={style.text}>Ajouter</a>
                            </div>
                    </Link>
                    
                    <Link href={"/admin/film/delete"} passHref>
                    <div className={style.user}>
                        <a href={"/admin/film"} rel="noreferrer" className={style.text}>Supprimer</a>
                        </div>
                    </Link>

                    <Link href={"/admin/film/modify"} passHref>
                    <div className={style.user}>
                        <a href={"/admin/film"} rel="noreferrer" className={style.text}>Modifier</a>
                        </div>
                    </Link>
                </div>

                    </>
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