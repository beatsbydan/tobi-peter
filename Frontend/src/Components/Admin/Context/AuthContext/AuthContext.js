import React from 'react'
const AuthContext = React.createContext({
    authDetails: {},
    authErrors: {},
    setAccessToken:()=>{},
    setIsLoggedIn:()=>{},
    handleLogInEmailChange:()=>{},
    handleLogInPasswordChange:()=>{},
    handleRegisterEmailChange:()=>{},
    handleRegisterPasswordChange:()=>{},
    handleLogInSubmit:()=>{},
    handleRegisterSubmit:()=>{},
})
export default AuthContext