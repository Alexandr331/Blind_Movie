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

interface Message {
  senderID: string | null
  message: string
}

export default function Main() {
  const { emailAuth } = UseAuth()
  const [currentChat, setCurrentChat] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useAppDispatch()
  const {email} = useAppSelector(state => state.user)

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
    setMessage(data.data)
  }

  useEffect(() => {
    if( message ) {
      setCurrentChat(prevChat => [...prevChat, 
          {
            senderID: 'me', 
            message: inputValue
          },
          {
            senderID: 'ai', 
            message: message
          }
        ]
      )
      console.log(currentChat)
      setInputValue("")
    }
  }, [message])

  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    {emailAuth &&
      <div className="inner">
        <div className="ai">
          <div className="ai__response-box">
            {currentChat.map((el, index) => {
              return (
                <div style={{ backgroundColor: el.senderID === 'user' ? 'black' : 'gray' }} className="ai__response" key={index}>
                  <p>{el.message}</p>
                  <p style={{ textAlign: 'right', fontSize: 12}}>{el.senderID}</p>
                </div>
              )
            })}
          </div>
        </div>

        <form onSubmit={(e) => handleOpenAI(e)}>
          <input className="ai__input" id="ai_request" name="ai_request" type="text" value={inputValue} onChange={(e) => {
            setInputValue(e.target.value)
            }}/>
          <button className="ai__btn" type="submit">AI</button>
        </form>
      </div>
    }
    </>
  )
}

