import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../../../Hooks/useRefreshToken'
import useAuth from '../../../Hooks/useAuth'
import Loading from '../../../Components/UI/Loading/Loading'

const PersistLogIn = () => {
  const { authDetails } = useAuth()
  // `hasChecked` tracks only whether the refresh attempt has finished — it does NOT itself gate
  // the Loading/Outlet switch. `isPending` below is derived as `!isLoggedIn && !hasChecked` so it
  // clears in the exact same render as `authDetails.isLoggedIn` flipping true, since both read
  // off the one AuthContext update. Storing "are we still loading" as its own local state
  // (flipped separately, one render later, from inside this effect) let AdminShell's sidebar
  // layout — keyed off `isLoggedIn` — pop in a render before this component's Loading→Outlet
  // switch could catch up, a visible jump on the very first admin page load.
  // Lazy-initialized from the in-memory access token (not a bare `false`): AnimatedRoutes keys
  // <Routes> by location.pathname for page-transition animations, which remounts this layout
  // route on every admin navigation, not just the first page load — without this, an already-
  // authenticated user would see the loading spinner flash on every nav click.
  const [hasChecked, setHasChecked] = useState(() => authDetails.accessToken !== '')
  const refresh = useRefreshToken()
  useEffect(() => {
    const validateRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        setHasChecked(true)
      }
    }
    if (authDetails.accessToken === '') {
      validateRefreshToken()
    } else {
      setHasChecked(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const isPending = !authDetails.isLoggedIn && !hasChecked
  return <>{isPending ? <Loading /> : <Outlet />}</>
}

export default PersistLogIn
