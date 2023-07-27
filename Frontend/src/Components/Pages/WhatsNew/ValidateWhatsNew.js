import axios from 'axios'

const ValidateWhatsNew = async (entry) => {
    const api = "https://toby-peter-production.up.railway.app/api/subscribe/create"
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!emailRegex.test(entry)){
        errors.email = 'Enter a valid Email'
    }
    else{
        const email = {
            email: entry
        }
        await axios.post(api, {...email},{
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            if(res.status === 200){
                errors.none = true
            }
        })
        .catch(err=>{
            console.log(err.response)
            if(err.response.data.status === "fail"){
                errors.email = 'You are subscribed'
            }
        })
    }
    return errors;
}
export default ValidateWhatsNew;