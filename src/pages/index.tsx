import MyHead from '@/components/MyHead'
import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signin, signout } from '@/store/UserSlice';
import UseAuth from '@/hooks/UseAuth';
import { Input } from '@/components/shared/Input';



export default function Home() {
  const [email, setEmail] = useState("");
  const [authHandler, setAuthHandler] = useState(null);
  const [password, setPassword] = useState("");
  const { emailAuth } = UseAuth()
  const userStore = useSelector(state => state.user)
  
  const dispatch = useDispatch()

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
    <div>

      {authHandler ? (
        <div>
          <p>Signed in as {userStore.email}</p>
          <button onClick={handleSignOut}>Sign out</button>
          {/* <button onClick={handleAddData}>Add data to Firestore</button> */}
        </div>
      ) : (
        <div>
          <Input label="Email" type="email" inputData={email} setInputData={setEmail}/>
          <Input label="Password" type="password" inputData={password} setInputData={setPassword}/>
          <button onClick={handleSignIn}>Sign in</button>
        </div>
      )}

    </div>
    </>
  )
}

