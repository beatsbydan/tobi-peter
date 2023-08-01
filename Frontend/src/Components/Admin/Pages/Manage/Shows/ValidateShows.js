import axios from 'axios'

const ValidateShows = async (entry, token) => {
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const createShowApi = 'https://toby-peter-production.up.railway.app/api/show/create'

    if(entry.title === ""){
        errors.title = "Title cannot be empty."
    }
    if(entry.venue === ""){
        errors.venue = "Venue cannot be empty."
    }
    if(entry.date === ""){
        errors.date = "Date cannot be empty."
    }
    if(!linkRegex.test(entry.ticketLink)){
        errors.ticketLink = "Invalid link."
    }
    if(Object.values(entry).every(value=>{
        return value !== ""
    }) && linkRegex.test(entry.ticketLink)){
        await(axios.post(createShowApi, {...entry}, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }))
        .then(res=>{
            if(res.status === 200){
                errors.none = true
            }
        })
        .catch(err=>{
            console.log(err)  
        })
    }
    return errors;
}
export default ValidateShows;