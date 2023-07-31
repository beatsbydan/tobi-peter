import axios from 'axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const refreshApi = 'https:/toby-peter-production.up.railway.app/api/admin/refresh'
    const {setAccessToken} = useAuth()
    const refresh = async () => {
        const response = await axios.get(refreshApi,{
            withCredentials:true
        })
        console.log(response.data.accessToken)
        setAccessToken(response.data.accessToken)
        
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken