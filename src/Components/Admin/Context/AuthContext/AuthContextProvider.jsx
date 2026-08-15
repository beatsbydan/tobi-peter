import AuthContext from './AuthContext'
import { useCallback, useMemo, useReducer } from 'react'
import { setAccessToken as setApiAccessToken } from '../../../../api/client'

// Only the state that's genuinely cross-cutting (needed outside any single form) lives here now —
// isLoggedIn/accessToken/destinedLocation, read by ProtectedRoutes/PersistLogin/AdminNavbar.
// Login/Register/ForgotPassword/change-password form state + submission now live directly in
// their own page components via react-hook-form, calling the mutation hooks in
// src/queries/useAuthMutations.js — see CLAUDE.md's "Admin forms" section.
const initialAuthDetails = {
  isLoggedIn: false,
  accessToken: '',
  destinedLocation: '',
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.value }
    case 'SET_LOGGED_IN':
      return { ...state, isLoggedIn: action.value }
    case 'SET_DESTINED_LOCATION':
      return { ...state, destinedLocation: action.value }
    default:
      return state
  }
}

const AuthContextProvider = (props) => {
  const [authDetails, dispatchAuthDetails] = useReducer(authReducer, initialAuthDetails)

  const setAccessToken = useCallback((token) => {
    setApiAccessToken(token)
    dispatchAuthDetails({ type: 'SET_ACCESS_TOKEN', value: token })
  }, [])
  const setIsLoggedIn = useCallback((value) => {
    dispatchAuthDetails({ type: 'SET_LOGGED_IN', value })
  }, [])
  const setDestinedLocation = useCallback((location) => {
    dispatchAuthDetails({ type: 'SET_DESTINED_LOCATION', value: location })
  }, [])

  const value = useMemo(
    () => ({ authDetails, setDestinedLocation, setAccessToken, setIsLoggedIn }),
    [authDetails, setDestinedLocation, setAccessToken, setIsLoggedIn],
  )
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
export default AuthContextProvider
