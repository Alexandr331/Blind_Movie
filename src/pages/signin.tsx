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
import Link from "next/link";



export default function Home() {

  const [className, setClassName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    setClassName("visible")
  }, [])

  return (
    <>
    <Head>
      <title>Sign in</title>
    </Head>
    <div className="inner">
      <div className="form-box">
        <h1 className={`sign__title ${className}`}>Blind movie</h1>
        {error && (
          <div className="error">{error}</div>
        )}
        <SignInForm setError={setError}/>
        <div className="change-form__link">
          Don&apos;t have an account? <Link href="/signup">Register</Link>
        </div>
      </div>
    </div>
    </>
  )
}

