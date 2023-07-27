import {Outlet, Navigate, useLocation} from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth'
import Unauthorized from '../Pages/Unauthorized/Unauthorized'

const ProtectedRoutes = () => {
    const location = useLocation()
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : /*<Navigate to={'/admin/login'} replace state={{from: location}}/>*/ <Unauthorized/>
}

export default ProtectedRoutes