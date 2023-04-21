import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Input } from '@/components/shared/Input';
import { useState, useEffect } from "react";
import { auth } from '../../firebase';
import router from 'next/router';
import Image from 'next/image';
import images from '../assets/index'

const lenRegexPass ="^(?=.{5,})"
const lowerRegexPass ="^(?=.*[a-z])"
const numRegexPass ="^(?=.*[0-9])"

const SignUpForm = ({setError}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validPass, setValidPass] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    if (validPass) {
      if (verifyPassword === password) {
        try {
          setLoading(true)
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          await sendEmailVerification(userCredential.user)
          setLoading(false)
          router.push("/signin")
          } catch (error) {
            setError(error)  
          }
      }
      else {
        setError("Passwords does not matched")
      }
    }
    else {
      setError("Password does not match requirements")
    }
  };

  useEffect(() => {
    if(password.match(lenRegexPass) && password.match(lowerRegexPass) && password.match(numRegexPass)) {
      setValidPass(true)
    }
    else {
      setValidPass(false)
    }
  }, [password])

  return (
    <>
      {loading ? (<div>Loading...</div>) : (
      <form autoComplete="off" className="user-form" onSubmit={(e) => handleSignUp(e)}>
        <Input label="Email" id="email" type="email" inputData={email} setInputData={setEmail}/>
        <Input label="Password" id="password" type="password" inputData={password} setInputData={setPassword} />
        <ul className="validation-box">
          <li>Five characters or longer {password.match(lenRegexPass) ? <Image width={22} src={images.valid} alt='valid' id='valid'/> : <Image width={22} src={images.notValid} alt='not-valid' id='not-valid' />} </li>
          <li>At least one lowercase character {password.match(lowerRegexPass) ? <Image width={22} src={images.valid} alt='valid' id='valid'/> : <Image width={22} src={images.notValid} alt='not-valid' id='not-valid' />} </li>
          <li>At least one numeric character {password.match(numRegexPass) ? <Image width={22} src={images.valid} alt='valid' id='valid'/> : <Image width={22} src={images.notValid} alt='not-valid' id='not-valid' />} </li>
        </ul>
        <Input label="Verify password" id="verify-password" type="password" inputData={verifyPassword} setInputData={setVerifyPassword}/>
        <button className="form-btn" type="submit">Sign Up</button>
      </form>
      )}
    </>
  )
}

export default SignUpForm