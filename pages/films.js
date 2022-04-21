import Nav from '../components/Nav'
import { useSession } from "next-auth/react"
import LogButton from '../components/Login'
import NewFilm from '../components/film/New'
import AllFilm from '../components/film/All'

export default function Component() {

  const {data: session} = useSession() 
  if(!session) {
  return(
    <div>
      <Nav />
      <center><h1>Connectez vous !</h1>
      ㅤㅤ<LogButton /></center>
    </div>
    )    
  } else {
    return(
      <div>
        <Nav />
        <center><h1>Salut {session.user.name} !</h1></center>
        <AllFilm />
      </div>
        )
  }
}