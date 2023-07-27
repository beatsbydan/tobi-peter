import AuthContext from './AuthContext'
import {useReducer} from 'react'
import ValidateAuth from '../../Auth/ValidateAuth'
import useAlert from '../../../../Hooks/useAlert'

const AuthContextProvider = (props) => {
    const {setAlert} = useAlert()
    const initialAuthDetails = {
        regEmail:'',
        logInEmail:'',
        regPassword:'',
        logInPassword:'',
        isLoggedIn:false,
        accessToken: ''
    }
    const initialAuthErrors = {
        regErrors: {},
        logInErrors: {},
    }
    const authReducer = (state,action) => {
        if(action.type === "CHANGE_LOGIN_EMAIL"){
            const newLogInEmail = action.value
            return{
                regEmail:state.regEmail,
                logInEmail:newLogInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword,  
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken 
            }
        }
        if(action.type === "CHANGE_LOGIN_PASSWORD"){
            const newLogInPassword = action.value
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:newLogInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken   
            }
        }
        if(action.type === "CHANGE_REG_EMAIL"){
            const newRegEmail = action.value
            return{
                regEmail:newRegEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword,
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken    
            }
        }
        if(action.type === "CHANGE_REG_PASSWORD"){
            const newRegPassword = action.value
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:newRegPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken   
            }
        }
        if(action.type === "SET_ACCESS_TOKEN"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:action.value
            }
        }
        if(action.type === "SET_LOGGED_IN"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:action.value,
                accessToken:state.accessToken
            }
        }
        if(action.type === "CLEAR"){
            return{
                regEmail:'',
                logInEmail:'',
                regPassword:'',
                logInPassword:'', 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken
            }
        }
    }
    const authErrorsReducer = (state,action) => {
        if(action.type === "SET_LOGIN_ERRORS"){
            return{
                regErrors: state.regErrors,
                logInErrors: action.value
            }
        }
        if(action.type === "SET_REG_ERRORS"){
            return{
                regErrors: action.value,
                logInErrors: state.logInErrors
            }
        }
    }
    const [authErrors, dispatchAuthErrors] = useReducer(authErrorsReducer, initialAuthErrors)
    const [authDetails, dispatchAuthDetails] = useReducer(authReducer, initialAuthDetails)
    const handleLogInEmailChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_LOGIN_EMAIL', value: e.target.value})
    }
    const handleLogInPasswordChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_LOGIN_PASSWORD', value: e.target.value})
    }
    const handleRegisterEmailChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_REG_EMAIL', value: e.target.value})
    }
    const handleRegisterPasswordChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_REG_PASSWORD', value: e.target.value})
    }
    const handleLogInSubmit = async () => {
        let success = false;
        const logInData = {
            email: authDetails.logInEmail,
            password: authDetails.logInPassword,
            type: 'loginAuth'
        }
        ValidateAuth(logInData)
        .then(res=>{
            dispatchAuthErrors({type:"SET_LOGIN_ERRORS", value:res.errors})
            if(res.errors.none){
                success = true
                dispatchAuthDetails({type: "CLEAR"})
                setAccessToken(res.parameters.accessToken)
                setIsLoggedIn(true)
            }
            else{
                setAlert('failure', 'Login Unsuccessful!')
                success = false
            }
        })
        return success
    }
    const handleRegisterSubmit = async () => {
        let success = false
        const regData = {
            email: authDetails.regEmail,
            password: authDetails.regPassword,
            type: 'regAuth'
        }
        ValidateAuth(regData)
        .then(res=>{
            dispatchAuthErrors({type:"SET_REG_ERRORS", value:res.errors})
            if(res.errors.none){
                success = true
                dispatchAuthDetails({type: "CLEAR"})
            }
            else{
                setAlert('failure', 'Registration Unsuccessful!')
                success = false
            }
        })
        return success
    }
    const setAccessToken = (token) => {
        dispatchAuthDetails({type:'SET_ACCESS_TOKEN', value: token})
    }
    const setIsLoggedIn = (value) => {
        dispatchAuthDetails({type:'SET_LOGGED_IN', value: value})
    }
    const value ={
        authDetails: authDetails,
        authErrors: authErrors,
        setAccessToken: setAccessToken,
        setIsLoggedIn: setIsLoggedIn,
        handleLogInEmailChange: handleLogInEmailChange,
        handleLogInPasswordChange: handleLogInPasswordChange,
        handleLogInSubmit: handleLogInSubmit,
        handleRegisterEmailChange: handleRegisterEmailChange,
        handleRegisterPasswordChange: handleRegisterPasswordChange,
        handleRegisterSubmit:handleRegisterSubmit
    }
    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;