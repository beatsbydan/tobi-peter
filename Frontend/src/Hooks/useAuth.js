import AuthContext from '../Components/Admin/Context/AuthContext/AuthContext'
import { useContext } from 'react'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth