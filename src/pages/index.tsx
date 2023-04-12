import MyHead from '@/components/MyHead'
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { signin, signout } from '@/store/UserSlice';
import { Input } from '@/components/shared/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';


export default function Home() {
  const [email, setEmail] = useState("");
  const [authHandler, setAuthHandler] = useState<String | null>(null)
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
          setAuthHandler(user.email)
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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(signout())
      setAuthHandler(null)
    } catch (error) {
      console.error(error);
    }
  };

  // const handleAddData = async () => {
  //   try {
  //     await firestore.collection("data").add({ text: "Hello, Firebase!" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
    <MyHead title="My title"/>
    <div className="home__inner">

      {authHandler ? (
        <div >
          <p>Signed in as {userEmail}</p>
          <button onClick={handleSignOut}>Sign out</button>
          {/* <button onClick={handleAddData}>Add data to Firestore</button> */}
        </div>
      ) : (
        <form className="user-form" onSubmit={handleSignIn}>
          <Input label="Email" type="email" inputData={email} setInputData={setEmail}/>
          <Input label="Password" type="password" inputData={password} setInputData={setPassword}/>
          <button type="submit">Sign in</button>
        </form>
      )}

    </div>
    </>
  )
}

