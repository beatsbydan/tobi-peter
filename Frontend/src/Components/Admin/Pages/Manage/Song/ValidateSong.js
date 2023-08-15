import axios from 'axios'

const ValidateSong = async (entry, token, id) => {
    const createSongApi = 'https://toby-peter-production.up.railway.app/api/song/create'
    const createCoverApi = 'https://toby-peter-production.up.railway.app/api/song/upload-cover'
    const updateSongApi = `https://toby-peter-production.up.railway.app/api/song/update/${id}`
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    if(entry.type === "create"){
        if(!allowedExtensions.exec(entry.coverArt.name)){
            alert('File type should only be .jpg, .jpeg or .png')
        }
        if(entry.title === ""){
            errors.title = "Title cannot be empty."
        }
        if(entry.releaseDate === ""){
            errors.date = "Date cannot be empty."
        }
        if(Object.values(entry.streamingLinks).some(link => link !== "")){
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
        }
        if(entry.title !== "" && entry.releaseDate !== "" && allowedExtensions.exec(entry.coverArt.name)){
            if(Object.values(entry.streamingLinks).every(link => link === "")){
                const formData = new FormData()
                formData.append('image', entry.coverArt)
                
                await axios.post(createCoverApi, formData,{
                    headers:{
                        "Content-Type":"multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(async res=>{
                    console.log(res)
                    if(res.status === 200){
                        const typeData = {
                            title:entry.title,
                            releaseDate:entry.releaseDate,
                            streamingLink : {...entry.streamingLinks},
                            url: res.data.url
                        }
                        await axios.post(createSongApi, {...typeData}, {
                            headers:{
                                "Content-Type":"application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(res=>{
                            console.log(res)
                            if(res.status === 200){
                                errors.none = true
                            }
                        })
                        .catch(err=>{
                            return
                        })
                    }
                })
                .catch(err=>{
                    return
                })
            }
            if(Object.values(entry.streamingLinks).every(link => link !== "") && Object.values(entry.streamingLinks).every(link => linkRegex.test(link))){
                const formData = new FormData()
                formData.append('image', entry.coverArt)
                
                await axios.post(createCoverApi, formData,{
                    headers:{
                        "Content-Type":"multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(async res=>{
                    if(res.status === 200){
                        const typeData = {
                            title:entry.title,
                            releaseDate:entry.releaseDate,
                            streamingLink : {...entry.streamingLinks},
                            url: res.data.url
                        }
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
                            return
                        })
                    }
                })
                .catch(err=>{
                    return
                })
            }
        }
    }
    else{
        if(entry.title === ""){
            errors.title = "Title cannot be empty."
        }
        if(entry.releaseDate === ""){
            errors.date = "Date cannot be empty."
        }
        if(entry.title !== "" && entry.releaseDate !== ""){
            if(Object.values(entry.streamingLinks).every(link => link === undefined)){
                const typeData = {
                    title:entry.title,
                    releaseDate:entry.releaseDate,
                    streamingLink : {...entry.streamingLinks},
                }
                await axios.put(updateSongApi, {...typeData}, {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.status.toLowerCase() === 'success'){
                        errors.none = true
                    }
                })
                .catch(err=>{
                    return
                })
            }
            if(Object.values(entry.streamingLinks).every(link => link !== undefined) && Object.values(entry.streamingLinks).every(link => linkRegex.test(link))){
                const typeData = {
                    title:entry.title,
                    releaseDate:entry.releaseDate,
                    streamingLink : {...entry.streamingLinks},
                }
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
                    return
                })
            }
        }
    }
    return errors;
}
export default ValidateSong;