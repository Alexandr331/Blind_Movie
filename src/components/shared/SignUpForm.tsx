import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { signin } from '@/store/UserSlice';
import { Input } from '@/components/shared/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useState } from "react";


const SignUpForm = ({setError}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const userEmail = useAppSelector(state => state.user.email)
  const dispatch = useAppDispatch()

  const handleSignIn = async () => {
    if (verifyPassword === password) {
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
          });
      } catch (error) {
        console.error(error);
      }
    }
    else {
      setError("Passwrds doesn&apos;t match")
    }
  };

  return (
    <form className="user-form" onSubmit={handleSignIn}>
      <Input label="Email" type="email" inputData={email} setInputData={setEmail}/>
      <Input label="Password" type="password" inputData={password} setInputData={setPassword}/>
      <Input label="Password" type="password" inputData={verifyPassword} setInputData={setVerifyPassword}/>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default SignUpForm