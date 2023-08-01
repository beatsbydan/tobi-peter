import axios from 'axios'

const ValidateSong = async (entry, token, id) => {
    const createSongApi = 'https://toby-peter-production.up.railway.app/api/song/create'
    const updateSongApi = `https://toby-peter-production.up.railway.app/api/song/update/${id}`
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    
    if(!allowedExtensions.exec(entry.coverArt.name)){
        alert('File type should only be .jpg, .jpeg or .png')
    }
    if(entry.title === ""){
        errors.title = "Title cannot be empty."
    }
    if(entry.releaseDate === ""){
        errors.date = "Date cannot be empty."
    }
    if(!linkRegex.test(entry.streamingLinks.appleMusic)){
        errors.appleMusic="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.spotify)){
        errors.spotify="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.audiomack)){
        errors.audiomack="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.youtube)){
        errors.youtube="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.tidal)){
        errors.tidal="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.boomPlay)){
        errors.boomPlay="Invalid link."
    }
    if(!linkRegex.test(entry.streamingLinks.youtubeMusic)){
        errors.youtubeMusic="Invalid link."
    }
    if(Object.values(entry.streamingLinks).every(link=>{
        return linkRegex.test(link)
    })&& entry.title !== "" && entry.releaseDate !== "" && allowedExtensions.exec(entry.coverArt.name)){
        const formData = new FormData()
        formData.append('image', entry.coverArt)
        const typeData = {
            title:entry.title,
            releaseDate:entry.releaseDate,
            streamingLink : {...entry.streamingLinks},
            image: formData
        }
        if(entry.type === "create"){
            await axios.post(createSongApi, {...typeData}, {
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
        else{
            await axios.put(updateSongApi, {...typeData}, {
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
    }
    return errors;
}
export default ValidateSong;