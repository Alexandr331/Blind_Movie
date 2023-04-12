import {store} from "@/store/store"
import { Provider } from "react-redux"

type store = {
  children: JSX.Element
}

const UserStore = ({ children }: store) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )

}

export default UserStore