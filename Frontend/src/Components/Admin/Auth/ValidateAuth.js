import axios from 'axios'

const ValidateAuth = async (entry) => {

    const regApi = 'https://toby-peter-production.up.railway.app/api/admin/register'
    const logInApi = 'https://toby-peter-production.up.railway.app/api/admin/login'
    const api = entry.type === 'loginAuth' ? logInApi : regApi
    const data = {
        email:entry.email,
        password:entry.password
    }
    let result = {
        errors: {},
        parameters: {}
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!emailRegex.test(entry.email)){
        result.errors.email = "Enter a valid email."
    }
    if(entry.password === "" || entry.password.length < 8){
        result.errors.password = "Must be at least 8 characters."
    }
    if(emailRegex.test(entry.email) && entry.password.length > 8 ){
        await axios.post(api, {...data},{
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            console.log(res)
            if(res.data.status.toLowerCase() === 'success'){
                result.errors.none = true
                if(entry.type === "loginAuth"){
                    result.parameters.accessToken = res.data.accessToken
                }
            }
        })
        .catch(err=>{
            console.log(err)
            // if(error.response.status ===){}
            // if(error.response.status ===){}
        })
    }
    return result;
}
export default ValidateAuth;