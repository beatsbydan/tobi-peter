const ValidateWhatsNew = (entry) => {
    let error = true;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(entry === ""){
        alert('EMAIL CANNOT BE EMPTY!')
        return
    }
    if(!emailRegex.test(entry)){
        alert('ENTER A VALID EMAIL')
        return
    }
    if(entry !== "" && emailRegex.test(entry)){
        error = false
    }
    return error;
}
export default ValidateWhatsNew;