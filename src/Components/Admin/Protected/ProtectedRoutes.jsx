import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth'
import { useEffect } from 'react'

const ProtectedRoutes = () => {
  const { authDetails, setDestinedLocation } = useAuth()
  const location = useLocation()
  useEffect(() => {
    setDestinedLocation(location.pathname)
  }, [location.pathname, setDestinedLocation])

  return authDetails.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  )
}

export default ProtectedRoutes
