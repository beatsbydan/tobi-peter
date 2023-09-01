import axios from 'axios'

const ValidateSong = async (entry, token, id) => {
    const createSongApi = `${process.env.REACT_APP_BASE_URL}/song/create`
    const createCoverApi = `${process.env.REACT_APP_BASE_URL}/song/upload-cover`
    const updateSongApi = `${process.env.REACT_APP_BASE_URL}/song/update/${id}`
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

    if(entry.title === ""){
        errors.title = "Title cannot be empty."
    }
    if(entry.releaseDate === ""){
        errors.date = "Date cannot be empty."
    }
    const links = Object.values(entry.streamingLinks)
    const keys = Object.keys(entry.streamingLinks)
    for( let i = 0; i < links.length; i ++){
        if(links[i] !== "" && !linkRegex.test(links[i])){
            errors[keys[i]] = 'Invalid Link'
        }
    }
    const filteredLinks = links.filter(link => link !== "")

    if(entry.type === "create"){
        if(!allowedExtensions.exec(entry.coverArt.name)){
            alert('File type should only be .jpg, .jpeg or .png')
        }
        if(entry.title !== "" && entry.releaseDate !== "" && allowedExtensions.exec(entry.coverArt.name)){
            if(
                Object.values(entry.streamingLinks).every(link => link === "")
                || filteredLinks.every(link => linkRegex.test(link))
            )
            {
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
                            return err
                        })
                    }
                })
                .catch(err=>{
                    return err
                })
            }
        }
    }
    else{
        if(entry.title !== "" && entry.releaseDate !== ""){
            if(
                Object.values(entry.streamingLinks).every(link => link === undefined)
                || filteredLinks.every(link => linkRegex.test(link))
            )
            {
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
                    if(res.data.status.toLowerCase() === 'success'){
                        errors.none = true
                    }
                })
                .catch(err=>{
                    return err
                })
            }
        }
    }
    return errors;
}
export default ValidateSong;