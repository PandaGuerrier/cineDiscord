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

    if (!data) {
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
                        <h1>Film creator</h1>

                        <form action="/api/film" method="post" className={style.form}>
                            <div>
                                <label className={style.label_user} htmlFor="id">Id :</label> <br />
                                <input type="text" className={style.input_search_film} name="id" placeholder="281a3x7p10pb" required='true' />
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="title">Titre: </label> <br />
                                <input type="text" className={style.input_search_film} name="title" placeholder="Titre du film (ex: Harry Potter 1)" required='true' />
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="description">Description: </label> <br />
                                <textarea type="text" className={style.input_search_film} id={style.textarea} name="description" placeholder="Descritpion du film" required='true' />
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="releaseDate">Date de sortie: </label> <br />
                                <input type="date" className={style.input_search_film} name="releaseDate" required='true' />
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="image">Image :</label> <br />
                                <input type="text" className={style.input_search_film} name="image" placeholder="https://lien_de_l'image.com" required='true' />
                            </div>
                            <div>
                                <label>Type: </label>
                                <ul name="test">
                                    <li><input type="checkbox" name="horreur" value="horreur" /> Horreur</li>
                                    <li><input type="checkbox" name="sf" value="sf"/> SF</li>
                                    <li><input type="checkbox" name="comedie" value="comedie"/> Comédie</li>
                                    <li><input type="checkbox" name="drame" value="drame"/> Drame</li>
                                    <li><input type="checkbox" name="action" value="action"/> Action</li>
                                    <li><input type="checkbox" name="fantastique" value="fantastique"/> Fantastique</li>
                                </ul>
                            </div>
                            <div>
                                Type:
                                <label className={style.label_user} htmlFor="actors">Acteurs : </label> <br />
                                <input type="text" className={style.input_search_film} name="actors" placeholder="Tom holland, Mapoto40, Panda_Guerrier, ..." required='true' />
                            </div>
                            <div>
                                <label className={style.label_user} htmlFor="mdp">Mdp: </label> <br />
                                <input type="password" className={style.input_search_film} name="mdp" placeholder="******" required='true' />
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