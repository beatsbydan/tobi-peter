import axios from 'axios'
import useAuth from './useAuth'
import {useDispatch} from 'react-redux'
import { setAuthAccessToken } from '../Store/StateSlices/AdminSlices/AuthSlice'

const useRefreshToken = () => {
    const refreshApi = `${process.env.REACT_APP_BASE_URL}/admin/refresh`
    const {setIsLoggedIn, setAccessToken} = useAuth()
    const dispatch = useDispatch()
    const refresh = async () => {
        await axios.get(refreshApi,{
            withCredentials:true
        })
        .then(response=>{
            setAccessToken(response.data.token)
            dispatch(setAuthAccessToken(response.data.token))
            setIsLoggedIn(true)
        })
        .catch(err=>{
            setIsLoggedIn(false)
            return err
        })
    }
    return refresh
}

export default useRefreshToken