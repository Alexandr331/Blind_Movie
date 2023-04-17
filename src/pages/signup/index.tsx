import { useEffect, useState } from "react";
import SignUpForm from '@/components/SignUpForm';
import Head from 'next/head';
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
      <title>Sign up</title>
    </Head>
    <div className="inner">
      <div className="form-box">
        <h1 className={`sign__title ${className}`}>Blind movie</h1>
        {error && (
          <div className="error">{error}</div>
        )}
        <SignUpForm setError={setError} />
        <div className="change-form__link">
          Have an account? <Link href="/signin">Log in</Link>
        </div>
      </div>
    </div>
    </>
  )
}

