import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signin } from '@/store/UserSlice';
import { Input } from '@/components/shared/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useState } from "react";
import { auth } from '../../../firebase';
import router from 'next/router';


const SignInForm = ({setError}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userEmail = useAppSelector(state => state.user.email)
  const dispatch = useAppDispatch()

  const handleSignIn = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(!loading)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(signin({
            email: user.email
          }))
          setLoading(!loading)
          router.push('/home')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="user-form"  onSubmit={(e) => handleSignIn(e)}>
      <Input label="Email" id="email" type="email" inputData={email} setInputData={setEmail}/>
      <Input label="Password" id="password" type="password" inputData={password} setInputData={setPassword} />
      <button className="form-btn" type="submit">Sign in</button>
    </form>
  )
}

export default SignInForm