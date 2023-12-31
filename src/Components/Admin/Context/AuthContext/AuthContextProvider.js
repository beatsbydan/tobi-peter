import AuthContext from './AuthContext'
import {useCallback, useReducer} from 'react'
import ValidateAuth from '../../Auth/ValidateAuth'
import useAlert from '../../../../Hooks/useAlert'
import axios from 'axios'
import useIsProcessing from '../../../../Hooks/useIsProcessing'
import { useDispatch } from 'react-redux'
import { setAuthAccessToken } from '../../../../Store/StateSlices/AdminSlices/AuthSlice'

const AuthContextProvider = (props) => {
    const {setAlert} = useAlert()
    const {setProcessing} = useIsProcessing()
    const dispatch = useDispatch()

    // AUTH DETAILS

    const initialAuthDetails = {
        regEmail:'',
        logInEmail:'',
        regPassword:'',
        logInPassword:'',
        resetEmail: '',
        newPassword: '',
        confirmPassword: '',
        isLoggedIn:false,
        accessToken: '',
        destinedLocation: ''
    }
    const initialAuthErrors = {
        regErrors: {},
        logInErrors: {},
        resetErrors: {},
        changeErrors: {}
    }
    const authReducer = (state,action) => {
        if(action.type === "CHANGE_LOGIN_EMAIL"){
            return{
                regEmail:state.regEmail,
                logInEmail:action.value,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword,  
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword 
            }
        }
        if(action.type === "CHANGE_LOGIN_PASSWORD"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:action.value, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword   
            }
        }
        if(action.type === "CHANGE_REG_EMAIL"){
            return{
                regEmail:action.value,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword,
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword  
            }
        }
        if(action.type === "CHANGE_REG_PASSWORD"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:action.value,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "SET_ACCESS_TOKEN"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:action.value,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "SET_LOGGED_IN"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:action.value,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "CLEAR"){
            return{
                regEmail:'',
                logInEmail:'',
                regPassword:'',
                logInPassword:'', 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation:state.destinedLocation,
                resetEmail:'',
                newPassword:'',
                confirmPassword: ''
            }
        }
        if(action.type === "SET_DESTINED_LOCATION"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation: action.value,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "SET_RESET_EMAIL"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation: state.destinedLocation,
                resetEmail:action.value,
                newPassword:state.newPassword,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "SET_NEW_PASSWORD"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation: state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:action.value,
                confirmPassword: state.confirmPassword
            }
        }
        if(action.type === "SET_CONFIRM_PASSWORD"){
            return{
                regEmail:state.regEmail,
                logInEmail:state.logInEmail,
                regPassword:state.regPassword,
                logInPassword:state.logInPassword, 
                isLoggedIn:state.isLoggedIn,
                accessToken:state.accessToken,
                destinedLocation: state.destinedLocation,
                resetEmail:state.resetEmail,
                newPassword:state.newPassword,
                confirmPassword: action.value
            }
        }
    }
    const [authDetails, dispatchAuthDetails] = useReducer(authReducer, initialAuthDetails)
    
    // AUTH ERRORS

    const authErrorsReducer = (state,action) => {
        if(action.type === "SET_LOGIN_ERRORS"){
            return{
                regErrors: state.regErrors,
                logInErrors: action.value,
                resetErrors: state.resetErrors,
                changeErrors: state.changeErrors
            }
        }
        if(action.type === "SET_REG_ERRORS"){
            return{
                regErrors: action.value,
                logInErrors: state.logInErrors,
                resetErrors: state.resetErrors,
                changeErrors: state.changeErrors
            }
        }
        if(action.type === "SET_RESET_ERRORS"){
            return{
                regErrors: action.value,
                logInErrors: state.logInErrors,
                resetErrors: action.value,
                changeErrors: state.changeErrors
            }
        }
        if(action.type === "SET_CHANGE_ERRORS"){
            return{
                regErrors: action.value,
                logInErrors: state.logInErrors,
                resetErrors: state.resetErrors,
                changeErrors: action.value
            }
        }
    }
    const [authErrors, dispatchAuthErrors] = useReducer(authErrorsReducer, initialAuthErrors)
    
    // LOGIN

    const handleLogInEmailChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_LOGIN_EMAIL', value: e.target.value})
    }
    const handleLogInPasswordChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_LOGIN_PASSWORD', value: e.target.value})
    }
    const handleLogInSubmit = async () => {
        setProcessing(true)
        let success = {};
        const logInData = {
            email: authDetails.logInEmail,
            password: authDetails.logInPassword,
            type: 'loginAuth'
        }
        await ValidateAuth(logInData)
        .then(res=>{
            dispatchAuthErrors({type:"SET_LOGIN_ERRORS", value:res.errors})
            if(res.errors.none){
                success.yes = true
                dispatchAuthDetails({type: "CLEAR"})
                setIsLoggedIn(true)
                setProcessing(false)
                setAccessToken(res.parameters.accessToken)
                dispatch(setAuthAccessToken(res.parameters.accessToken))
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Login Unsuccessful!')
            }
        })
        return success;
    }

    // REGISTER
    
    const handleRegisterEmailChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_REG_EMAIL', value: e.target.value})
    }
    const handleRegisterPasswordChange = (e) => {
        dispatchAuthDetails({type: 'CHANGE_REG_PASSWORD', value: e.target.value})
    }
    const handleRegisterSubmit = async () => {
        setProcessing(true)
        let success = {}
        const resetData = {
            email: authDetails.regEmail,
            password: authDetails.regPassword,
            type: 'regAuth'
        }
        await ValidateAuth(resetData)
        .then(res=>{
            dispatchAuthErrors({type:"SET_REG_ERRORS", value:res.errors})
            if(res.errors.none){
                success.yes = true
                setProcessing(false)
                dispatchAuthDetails({type: "CLEAR"})
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Registration Unsuccessful!')
                success.yes = false
            }
        })
        return success
    }

    // RESET
    
    const handleResetEmailChange = (e) => {
        dispatchAuthDetails({type: 'SET_RESET_EMAIL', value: e.target.value})
    }
    const handleResetEmailSubmit = async () => {
        setProcessing(true)
        let success = {}
        const regData = {
            email: authDetails.resetEmail,
            type: 'resetAuth'
        }
        await ValidateAuth(regData)
        .then(res=>{
            dispatchAuthErrors({type:"SET_RESET_ERRORS", value:res.errors})
            if(res.errors.none){
                success.yes = true
                setProcessing(false)
                dispatchAuthDetails({type: "CLEAR"})
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Reset Unsuccessful!')
                success.yes = false
            }
        })
        return success
    }
    
    // CHANGE PASSWORD
    
    const handleNewPasswordChange = (e) => {
        dispatchAuthDetails({type: 'SET_NEW_PASSWORD', value: e.target.value})
    }
    const handleConfirmPasswordChange = (e) => {
        dispatchAuthDetails({type: 'SET_CONFIRM_PASSWORD', value: e.target.value})
    }
    const handleChangePasswordSubmit = async () => {
        setProcessing(true)
        let success = {}
        const changeData = {
            newPassword: authDetails.newPassword,
            confirmPassword: authDetails.confirmPassword,
            type: 'changeAuth'
        }
        await ValidateAuth(changeData, authDetails.accessToken)
        .then(res=>{
            dispatchAuthErrors({type:"SET_CHANGE_ERRORS", value:res.errors})
            if(res.errors.none){
                setProcessing(false)
                success.yes = true
                dispatchAuthDetails({type: "CLEAR"})
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Change Unsuccessful!')
                success.yes = false
            }
        })
        return success
    }

    // POST-LOGIN

    const setAccessToken = (token) => {
        dispatchAuthDetails({type:'SET_ACCESS_TOKEN', value: token})
    }
    const setIsLoggedIn = (value) => {
        dispatchAuthDetails({type:'SET_LOGGED_IN', value: value})
    }
    const setDestinedLocation = useCallback((location) => {
        dispatchAuthDetails({type:"SET_DESTINED_LOCATION", value: location})
    },[])

    // LOGOUT

    const logOut = async () => {
        setProcessing(true)
        let success = {}
        const logOutApi = `${process.env.REACT_APP_BASE_URL}/admin/logout`
        await axios.get(logOutApi,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:true
        })
        .then(res=>{
            if(res.status === 204){
                success.yes = true
                setIsLoggedIn(false)
                setProcessing(false)
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            success.yes = false
            setAlert('failure', 'Something went wrong!')
            return err
        })
        return success
    }

    // CONTEXT VALUES

    const value ={
        authDetails: authDetails,
        authErrors: authErrors,
        logOut:logOut,
        setDestinedLocation: setDestinedLocation,
        setAccessToken: setAccessToken,
        setIsLoggedIn: setIsLoggedIn,
        handleConfirmPasswordChange:handleConfirmPasswordChange,
        handleNewPasswordChange:handleNewPasswordChange,
        handleResetEmailChange:handleResetEmailChange,
        handleLogInEmailChange: handleLogInEmailChange,
        handleLogInPasswordChange: handleLogInPasswordChange,
        handleLogInSubmit: handleLogInSubmit,
        handleRegisterEmailChange: handleRegisterEmailChange,
        handleRegisterPasswordChange: handleRegisterPasswordChange,
        handleRegisterSubmit:handleRegisterSubmit,
        handleResetEmailSubmit:handleResetEmailSubmit,
        handleChangePasswordSubmit:handleChangePasswordSubmit
    }
    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;