import React from 'react'
const AuthContext = React.createContext({
    authDetails: {},
    authErrors: {},
    logOut:()=>{},
    setAccessToken:()=>{},
    setIsLoggedIn:()=>{},
    handleLogInEmailChange:()=>{},
    handleLogInPasswordChange:()=>{},
    handleNewPasswordChange:()=>{},
    handleConfirmPasswordChange:()=>{},
    handleResetEmailChange:()=>{},
    handleRegisterEmailChange:()=>{},
    handleRegisterPasswordChange:()=>{},
    handleLogInSubmit:()=>{},
    handleRegisterSubmit:()=>{},
    handleResetEmailSubmit:()=>{},
    handleChangePasswordSubmit:()=>{},
})
export default AuthContext