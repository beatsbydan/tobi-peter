import {Outlet, useLocation} from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth'
import Unauthorized from '../Pages/Unauthorized/Unauthorized'
import {useEffect} from 'react'

const ProtectedRoutes = () => {
    const {authDetails, setDestinedLocation} = useAuth()
    const location = useLocation()
    useEffect(()=>{
        setDestinedLocation(location.pathname)
    },[location])
    
    return authDetails.isLoggedIn ? <Outlet/> : <Unauthorized/>
}

export default ProtectedRoutes