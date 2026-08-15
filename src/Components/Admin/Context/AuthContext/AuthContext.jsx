import React from 'react'
const AuthContext = React.createContext({
  authDetails: {},
  setAccessToken: () => {},
  setIsLoggedIn: () => {},
  setDestinedLocation: () => {},
})
export default AuthContext
