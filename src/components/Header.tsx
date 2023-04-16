import UseAuth from "@/hooks/UseAuth"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/useStore"
import { signout } from "@/store/UserSlice"
import Link from "next/link"

const Header = () => {
  
  const {emailAuth} = UseAuth()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(signout())
      router.push('/signin')
    }).catch((error) => {
      console.log('some error')    
    });
  }

  return (
    <header className="header">
      <div className="container">
        {emailAuth && 
          <div className="header__inner">
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
            <button className="logout-btn" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        }
      </div>
    </header>
  )
}

export default Header