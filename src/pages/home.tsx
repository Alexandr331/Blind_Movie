import MyHead from '@/components/MyHead'
import UseAuth from '@/hooks/UseAuth'


export default function Main() {

  const { emailAuth } = UseAuth()

  return (
    <>
    <MyHead title="Home"/>
    {emailAuth &&
        <div className="home__inner">
          Home Page
        </div>
    }
    </>
  )
}

