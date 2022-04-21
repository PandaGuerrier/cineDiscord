import useSWR from 'swr'
import styles from './css/GetNew.module.css'
import Link from "next/link";

const fetcher = async (url) => {
    const res = await fetch(url);

    if (res.status !== 200) {
        throw new Error("No !")
    }
    const data = await res.json()

    return data
}


function getDate(timestamp) {
    const date = new Date(timestamp)
    return String(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
  }

export default function NewFilm() {

    const { data } = useSWR(`api/film/get/new/`, fetcher)

    if(!data) return <div>Loading...</div>

        return (
            <div className={styles.Div_Center_films}>
                {data ? 
                <div className={styles.with_div}> <div className={styles.span}><span></span> <p>Nouveaux Films ({data.length})</p></div>    
                <div className={styles.overflow_scroll_div}>    
                    {data.map(item => (
                            <div className={styles.result_recherche_div}>
                            <Link href={"/film/" + item.id} passHref>
                                <a href={"/film/" + item.id} rel="noreferrer" className={styles.link_film}>
                                    <div className={styles.div_film_style_film}>
                                        <img src={item.image} alt="film" />
                                        <div>
                                            <center>
                                                <h1>{item.title}</h1>
                                                <h2>{item.description}</h2>
                                                <h3>{getDate(item.releaseDate)}</h3>
                                                <h4>Acteurs : {item.actors}</h4>
                                            </center>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                </div>: <center><h5>Aucun nouveau film trouvé :(</h5></center>}
            </div>
        )
}