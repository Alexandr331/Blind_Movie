import UseAuth from "@/hooks/UseAuth"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/useStore"
import { signout } from "@/store/UserSlice"

const Header = () => {
  
  const {emailAuth} = UseAuth()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(signout())
      router.push('/')
    }).catch((error) => {
      console.log('some error')    
    });
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          {emailAuth && 
            <button className="logout-btn" onClick={handleLogOut}>
              Log out
            </button>
          }
        </div>
      </div>
    </header>
  )
}

export default Header