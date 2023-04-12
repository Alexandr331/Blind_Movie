import MyHead from '@/components/MyHead'
import UseAuth from '@/hooks/UseAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import router from 'next/router';
import { signin } from '@/store/UserSlice'


export default function Main() {

  const { emailAuth } = UseAuth()
  const uid = useAppSelector(state => state.user.uid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userid = user.uid;
        const userEmail = user.email;
        dispatch(signin({
          email: userEmail,
          uid: userid
        }))
      } else {
        router.push("/")
      }
    });
  }, [dispatch])

  return (
    <>
    <MyHead title="Home"/>
    {emailAuth &&
        <div className="home__inner">
          Home Page
        </div>
    }
    </>
  )
}

