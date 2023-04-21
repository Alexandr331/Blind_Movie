import UseAuth from "@/hooks/UseAuth"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { signout } from "@/store/UserSlice"
import Link from "next/link"

const Header = () => {

  const { email } = useAppSelector(state => state.user)
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
        
          <div className="header__inner">
            <Link href="/">
              <h2 className="title">BLIND MOVIE</h2>  
            </Link>    
            <nav className="nav">
              <ul className="nav__list">
                <li className="list-item">
                  <Link href="/chat">Chat</Link>    
                </li>
                <li className="list-item">
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </nav>
            {emailAuth 
            ? <>
                <span id="user-email">{email}</span>
                <button className="logout-btn" onClick={handleLogOut}>
                  Log out
                </button>
              </>
            :
              <div className="logs__box">
                <Link href="/signin">
                  Sign in
                </Link>
                <Link href="/signup">
                  Sign up
                </Link>
              </div>
            }
          </div>
      </div>
    </header>
  )
}

export default Header