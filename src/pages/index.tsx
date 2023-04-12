import MyHead from '@/components/MyHead'
import { useEffect, useState } from "react";
import SignInForm from '@/components/shared/SignInForm';
import SignUpForm from '@/components/shared/SignUpForm';


export default function Home() {

  const [className, setClassName] = useState("")
  const [form, setForm] = useState(false)
  const [error, setError] = useState("")
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //     dispatch(signout())

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleAddData = async () => {
  //   try {
  //     await firestore.collection("data").add({ text: "Hello, Firebase!" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    setClassName("visible")
  }, [])

  return (
    <>
    <MyHead title={!form ? "Sign in" : "Sign up"}/>
    <div className="home__inner">
      <h1 className={`home__title ${className}`}>Blind movie</h1>
      {error && (
        <div>{error}</div>
      )}
      {!form ? <SignInForm setError={setError} /> : <SignUpForm setError={setError} />}
      <div className="change-form__link">
      {!form ? "Don't have" : "Have"} an account? <span onClick={() => {
        setForm(state => !state) 
        setError("")
        }}>{!form ? "Register" : "Log in"}</span>
      </div>
    </div>
    </>
  )
}

