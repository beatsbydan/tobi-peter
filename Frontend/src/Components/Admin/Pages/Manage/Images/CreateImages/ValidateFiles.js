import axios from 'axios'

export const ValidateFiles = async (entry, token) =>{
    let errors = {}
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    if(Object.values(entry).every(value => !allowedExtensions.exec(value.name))){
        alert('File type should only be .jpg, .jpeg or .png')
    }
    else{
        const formData = new FormData()
        for(let i = 0; i < entry.length; i++){
            formData.append(`images`, entry[i])
        }        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/upload`, formData, {
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.status === 201){
                errors.none = true
            }
        })
        .catch(err=>{
            console.log(err)
            return
        })
    }
    return errors
}