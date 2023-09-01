import axios from 'axios'

const ValidateShows = async (entry, token, id) => {
    let errors = {}
    
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const api = entry.type === "create" ? `${process.env.REACT_APP_BASE_URL}/show/create` : `${process.env.REACT_APP_BASE_URL}/show/update/${id}`
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
        const data = {
            title: entry.title,
            venue: entry.venue,
            date: entry.date,
            ticketLink: entry.ticketLink,
        }
        if(entry.type === "create"){
            await(axios.post(api, {...data}, {
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
                return err  
            })
        }
        else{
            await(axios.patch(api, {...entry}, {
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
                return err  
            })
        }
    }

    return errors;
}

export default ValidateShows;