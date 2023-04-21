import Head from "next/head"
import { Roboto } from 'next/font/google'
import Header from "@/components/Header"
import { useEffect } from "react";
import { signin } from "@/store/UserSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import router from 'next/router';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

type layout ={ 
  children: JSX.Element
}
const inter = Roboto({ weight: "400", subsets: ["latin"] })

const Layout = ({children}: layout) => {

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
      }
      else {
        router.push("/signin")
      }
    });
  }, [dispatch])

  return (
    <div className={inter.className}>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <Header />
        <main >
          <div className="container">
            {children}
          </div>
        </main>
        <video className="video-bg" muted autoPlay loop playsInline>
          <source src="/assets/video-bg.mp4" />
        </video>
      </div>
    </div>
  )

}

export default Layout