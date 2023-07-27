import axios from 'axios'
const ValidateUpdateLinks = async (entry) => {
    const token = ''
    const musicApi = 'https://toby-peter-production.up.railway.app/api/song/create'
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

    if(!linkRegex.test(entry.links.appleMusic)){
        errors.appleMusic="Invalid link."
    }
    if(entry.title === ""){
        errors.title = "Title cannot be empty."
    }
    if(entry.date === ""){
        errors.date = "Date cannot be empty."
    }
    if(!linkRegex.test(entry.links.spotify)){
        errors.spotify="Invalid link."
    }
    if(!linkRegex.test(entry.links.audiomack)){
        errors.audiomack="Invalid link."
    }
    if(!linkRegex.test(entry.links.youtube)){
        errors.youtube="Invalid link."
    }
    if(!linkRegex.test(entry.links.tidal)){
        errors.tidal="Invalid link."
    }
    if(!linkRegex.test(entry.links.boomPlay)){
        errors.boomPlay="Invalid link."
    }
    if(!linkRegex.test(entry.links.youtubeMusic)){
        errors.youtubeMusic="Invalid link."
    }
    if(Object.values(entry.links).every(link=>{
        return linkRegex.test(link)
    })&& entry.title !== "" && entry.date !== ""){
        await axios.post(musicApi, {...entry}, {
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
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
export default ValidateUpdateLinks;