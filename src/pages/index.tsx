import { useEffect, useState } from "react";
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { auth } from '../../firebase'
import { signin } from '@/store/UserSlice'
import router from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '@/hooks/useStore'
import Head from 'next/head';
import { NextResponse } from "next/server";



export default function Home() {

  const [className, setClassName] = useState("")
  const [form, setForm] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setClassName("visible")
  }, [])

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
        router.push("/home")
      } else {
        router.push("/")
      }
    });
  }, [dispatch])

  

  return (
    <>
    <Head>
      <title>{!form ? "Sign in" : "Sign up"}</title>
    </Head>
    <div className="inner">
      <div className="form-box">
        <h1 className={`sign__title ${className}`}>Blind movie</h1>
        {error && (
          <div className="error">{error}</div>
        )}
        {!form ? <SignInForm setError={setError} /> : <SignUpForm setError={setError} />}
        <div className="change-form__link">
          {!form ? "Don't have" : "Have"} an account? <span onClick={() => {
            setForm(state => !state) 
            setError("")
            }}>{!form ? "Register" : "Log in"}</span>
        </div>
      </div>
    </div>
    </>
  )
}

