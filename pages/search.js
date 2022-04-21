import Nav from '../components/Nav'
import Search from '../components/Search'
import { useSession } from "next-auth/react"
import LogButton from '../components/Login'

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
        <Search />
      </div>
        )
  }
}