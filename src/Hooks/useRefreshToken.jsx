import useAuth from './useAuth'
import { refreshAccessToken } from '../api/auth'

const useRefreshToken = () => {
  const { setIsLoggedIn, setAccessToken } = useAuth()
  const refresh = async () => {
    try {
      const token = await refreshAccessToken()
      setAccessToken(token)
      setIsLoggedIn(true)
    } catch (err) {
      setIsLoggedIn(false)
      return err
    }
  }
  return refresh
}

export default useRefreshToken
