import UseAuth from '@/hooks/UseAuth'
import { useEffect, useState } from 'react'
import Head from 'next/head'

interface Message {
  senderID: string | null
  message: string
}

export default function Main() {
  const { emailAuth } = UseAuth()
  const [currentChat, setCurrentChat] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")


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
                <div style={{ backgroundColor: el.senderID === 'me' ? 'black' : 'gray' }} className="ai__response" key={index}>
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

