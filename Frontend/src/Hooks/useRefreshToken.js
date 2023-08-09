import axios from 'axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const refreshApi = 'https:/toby-peter-production.up.railway.app/api/admin/refresh'
    const {setIsLoggedIn, setAccessToken} = useAuth()
    const refresh = async () => {
        await axios.get(refreshApi,{
            withCredentials:true
        })
        .then(response=>{
            setAccessToken(response.data.token)
            setIsLoggedIn(true)
        })
        .catch(err=>{
            setIsLoggedIn(false)
            return
        })
    }
    return refresh
}

export default useRefreshToken