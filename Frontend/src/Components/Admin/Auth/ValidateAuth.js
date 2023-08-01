import axios from 'axios'

const ValidateAuth = async (entry, token) => {
    const regApi = 'https://toby-peter-production.up.railway.app/api/admin/register'
    const logInApi = 'https://toby-peter-production.up.railway.app/api/admin/login'
    const resetApi = 'https://toby-peter-production.up.railway.app/api/admin/forgot-pass'
    const changeApi = 'https://toby-peter-production.up.railway.app/api/admin/change-pass'
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let result = {
        errors: {},
        parameters: {}
    }

    if(entry.type === "regAuth"){
        if(!emailRegex.test(entry.email)){
            result.errors.email = "Enter a valid email."
        }
        if(entry.password.length < 8){
            result.errors.password = "Must be at least 8 characters."
        }
        if(emailRegex.test(entry.email) && entry.password.length > 8 ){
            const data = {
                email:entry.email,
                password:entry.password
            }
            await axios.post(regApi, {...data},{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(res=>{
                if(res.data.status.toLowerCase() === 'success'){
                    result.errors.none = true
                }
            })
            .catch(err=>{
                return
            })
        }
    }
    if(entry.type === "loginAuth"){
        if(!emailRegex.test(entry.email)){
            result.errors.email = "Enter a valid email."
        }
        if(entry.password.length < 8){
            result.errors.password = "Must be at least 8 characters."
        }
        if(emailRegex.test(entry.email) && entry.password.length > 8 ){
            const data = {
                email:entry.email,
                password:entry.password
            }
            await axios.post(logInApi, {...data},{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
            .then(res=>{
                if(res.data.status.toLowerCase() === 'success'){
                    result.errors.none = true
                    result.parameters.accessToken = res.data.token
                }
            })
            .catch(err=>{
                if(err.response.status === 401){
                    result.errors.email = 'Invalid Credentials'
                    result.errors.password = 'Invalid Credentials'
                }
            })
        }
    }
    if(entry.type === "resetAuth"){
        if(!emailRegex.test(entry.email)){
            result.errors.resetEmail = "Enter a valid email."
        }
        else{
            const data = {
                email:entry.email,
            }
            await axios.post(resetApi, {...data},{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(res=>{
                if(res.data.status.toLowerCase() === 'success'){
                    result.errors.none = true
                }
            })
            .catch(err=>{
                if(err.response.status === 404){
                    result.errors.resetEmail = "Not Tobi Peter."
                }
                return
            })
        }
    }
    if(entry.type === "changeAuth"){
        if(entry.newPassword.length < 8){
            result.errors.newPassword = "Must be at least 8 characters."
        }
        if(entry.confirmPassword.length < 8){
            result.errors.confirmPassword = "Must be at least 8 characters."
        }
        if((entry.newPassword !== "" && entry.confirmPassword !== "") && (entry.newPassword !== entry.confirmPassword)){
            result.errors.confirmPassword = "Passwords do not match."
            result.errors.newPassword = "Passwords do not match."
        }
        if((entry.newPassword.length > 8 && entry.confirmPassword.length > 8)&&(entry.newPassword === entry.confirmPassword) ){
            const data = {
                password:entry.confirmPassword
            }
            await axios.put(changeApi, {...data},{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(res=>{
                if(res.data.status.toLowerCase() === 'success'){
                    result.errors.none = true
                }
            })
            .catch(err=>{
                return
            })
        }
    }
    
    return result;
}
export default ValidateAuth;