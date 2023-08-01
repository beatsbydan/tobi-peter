import axios from 'axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const refreshApi = 'https:/toby-peter-production.up.railway.app/api/admin/refresh'
    const {authDetails, setAccessToken} = useAuth()
    const refresh = async () => {
        const response = await axios.get(refreshApi,{
            withCredentials:true
        })
        setAccessToken(response.data.token)
        return response.data.token
    }
    return refresh
}

export default useRefreshToken