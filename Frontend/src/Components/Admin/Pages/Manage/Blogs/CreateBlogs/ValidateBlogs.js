import axios from 'axios'

export const ValidateBlogs = async (entry, token) => {
    let errors = {}
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    if(entry.title === ""){
        errors.title = "Title cannot be empty."
    }
    if(entry.author === ""){
        errors.author = "Author cannot be empty."
    }
    if(entry.text === ""){
        errors.text = "Text cannot be empty."
    }
    if(!linkRegex.exec(entry.link)){
        errors.link = "Link cannot be empty."
    }
    if(Object.values(entry).every(value => value !== "") && linkRegex.exec(entry.link)){
        await axios.post('https://toby-peter-production.up.railway.app/api/blog/create ', {...entry}, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.status === 201){
                errors.none = true
            }
        })
        .catch(err=>{
            console.log(err)
            return err
        })
    }
    return errors
}