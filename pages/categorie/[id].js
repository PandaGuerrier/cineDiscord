import { useRouter } from 'next/router'
import useSWR from 'swr'
import style from './css/film.module.css'
import Nav from '../../components/Nav'
import { useSession } from "next-auth/react"

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error("Unknow channel discord id!")
  }
  return data
}

function getDate(timestamp) {
  const date = new Date(timestamp)
  return String(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
}

export default function Transcript() {
  const { query } = useRouter()

  const { data: session } = useSession()

  const { data, error } = useSWR(
    () => query.id && `/api/film/${query.id}`,
    fetcher
  )

  if (!session) return (
    <div>
      <h1>Connectez vous !</h1>
    </div>
  )

  else {

    if (!data) return <div><Nav /><center><h1>Film Inconnu :/</h1></center></div>

    return (
      <body>
        <Nav />
        <div className={style.div}>
          <div>
            <div className={style.cote_div_align}>
              <div>
                <img src={data.image} alt="film" />
              </div>
              <div className={style.info_film}>
                <div>
                  <h1>{data.title}</h1>
                  <h2><span>Description :</span> <br/>{data.description}</h2>
                  <h3>Sortie le {getDate(data.releaseDate)}</h3>
                  <h3>Acteurs : {data.actors}</h3>
                  <h3>Genre : {data.type.map(e => { return e }).join(', ')}</h3>
                </div>
              </div>
            </div>
            <iframe className={style.film} SRC={`https://uqload.com/embed-${query.id}.html`} FRAMEBORDER='0' MARGINWIDTH='0' MARGINHEIGHT='0' SCROLLING="NO" WIDTH='100% ' HEIGHT='360' allowfullscreen='true'></iframe>
          </div>
        </div>
      </body>
    )
  }
}