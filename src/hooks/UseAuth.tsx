import { useSelector } from "react-redux";
import { useAppSelector } from "./useStore";


const UseAuth = () => {
  const {email} = useAppSelector(state => state.user)

  return {
    emailAuth: !!email
  }

}

export default UseAuth