import { useSelector } from "react-redux";


const UseAuth = () => {
  const {email} = useSelector(state => state.user)

  return {
    emailAuth: !!email
  }

}

export default UseAuth