import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { signin } from '@/store/UserSlice';
import { Input } from '@/components/shared/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useState } from "react";
import { auth } from '../../firebase';
import { redirect } from 'next/dist/server/api-utils';
import router from 'next/router';


const SignUpForm = ({setError, setForm}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userEmail = useAppSelector(state => state.user.email)
  const dispatch = useAppDispatch()

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    
    if (verifyPassword === password && password.length !== 0) {
      try {
        setLoading(true)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user)
        setLoading(false)
        setForm(false)
        } catch (error) {
          setError(error)  
        }
    }
    else {
      setError("Passwords is not matched")
    }
  };

  return (
    <>
      {loading ? (<div>Loading...</div>) : (
      <form className="user-form" onSubmit={(e) => handleSignUp(e)}>
        <Input label="Email" id="email" type="email" inputData={email} setInputData={setEmail}/>
        <Input label="Password" id="password" type="password" inputData={password} setInputData={setPassword} />
        <Input label="Verify password" id="verify-password" type="password" inputData={verifyPassword} setInputData={setVerifyPassword}/>
        <button className="form-btn" type="submit">Sign Up</button>
      </form>
      )}
    </>
  )
}

export default SignUpForm