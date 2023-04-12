import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { signin } from '@/store/UserSlice';
import { Input } from '@/components/shared/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useState } from "react";


const SignInForm = ({setError}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userEmail = useAppSelector(state => state.user.email)
  const dispatch = useAppDispatch()

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(signin({
            email: user.email
          }))
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..dsd
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSignIn}>
      <Input label="Email" type="email" inputData={email} setInputData={setEmail}/>
      <Input label="Password" type="password" inputData={password} setInputData={setPassword}/>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default SignInForm