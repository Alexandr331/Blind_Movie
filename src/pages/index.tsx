import UseAuth from '@/hooks/UseAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import router from 'next/router';
import { signin } from '@/store/UserSlice'
import Head from 'next/head'
import { Configuration, OpenAIApi } from "openai";
import { AnyPtrRecord } from 'dns'
import { Input } from '@/components/shared/Input'

export default function Main() {
  const { emailAuth } = UseAuth()
  const [textAI, setTextAI] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userid = user.uid;
        const userEmail = user.email;
        dispatch(signin({
          email: userEmail,
          uid: userid
        }))
      }
      else {
        router.push("/signin")
      }
    });
  }, [dispatch])

  const handleOpenAI = async (e: any) => {
    e.preventDefault()
    
    const body = JSON.stringify(inputValue)
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
    }
    
    const res = await fetch("/api/ai", options)
    const data = await res.json()
    setTextAI([...textAI, data.data])
    setInputValue("")
    console.log(textAI)
  }

  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    {emailAuth &&
      <div className="inner">
        Home Page

        <div id="ai">
          <div id="ai__response-box">
            {textAI.map((el, index) => {
              return (
                <div className="ai__response" key={index}>{el}</div>
              )
            })}
          </div>
        </div>

        <form onSubmit={(e) => handleOpenAI(e)}>
          <input id="ai_request" name="ai_request" type="text" value={inputValue} onChange={(e) => {
            setInputValue(e.target.value)
            }}/>
          <button type="submit">Open AI</button>
        </form>
      </div>
    }
    </>
  )
}

