import { signInWithEmailAndPassword } from 'firebase/auth';
import { Input } from '@/components/shared/Input';
import { useState } from "react";
import { auth } from '../../firebase';
import router from 'next/router';


const SignInForm = ({setError}: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(!loading)
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push('/chat')
          setLoading(!loading)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode)          
        });
    } catch (error) {
      console.log(error);
    }    
  };

  return (
    <form autoComplete="off" className="user-form"  onSubmit={(e) => handleSignIn(e)}>
      <Input label="Email" id="email" type="email" inputData={email} setInputData={setEmail}/>
      <Input label="Password" id="password" type="password" inputData={password} setInputData={setPassword} />
      <button className="form-btn" type="submit">Sign in</button>
    </form>
  )
}

export default SignInForm