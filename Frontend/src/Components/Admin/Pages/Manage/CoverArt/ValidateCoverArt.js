import axios from 'axios'

const ValidateCoverArt = async (entry) => {
    const coverArtApi = ''
    const token = ''
    let errors = {}
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    if(!allowedExtensions.exec(entry)){
        alert('File type should only be .jpg, .jpeg or .png')
        errors.file = "Invalid file type"
    }
    else{
        const file = {
            file:entry
        }
        await axios.post(coverArtApi, {...file},{
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>{
            console.log(res)
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
export default ValidateCoverArt;