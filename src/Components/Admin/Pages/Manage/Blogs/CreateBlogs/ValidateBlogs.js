import axios from 'axios'

export const ValidateBlogs = async (entry, token, id) => {
    let errors = {}
    
    const api = entry.type === "create" ? `${process.env.REACT_APP_BASE_URL}/blog/create` : `${process.env.REACT_APP_BASE_URL}/blog/update/${id}`

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
        errors.link = "Invalid Link."
    }
    if(Object.values(entry).every(value => value !== "") && linkRegex.exec(entry.link)){
        const data = {
            title: entry.title,
            author: entry.author,
            text: entry.text,
            link: entry.link,
        }
        if(entry.type === 'create'){
            await axios.post(api , {...data}, {
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
                return err
            })
        }
        else{
            await axios.patch(api , {...data}, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
    }   
    return errors
}