const ValidateWhatsNew = (entry) => {
    let error = "";
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(entry === ""){
        error = 'Email cannot be empty'
    }
    if(!emailRegex.test(entry)){
        error = 'Enter a valid Email'
    }
    if(entry !== "" && emailRegex.test(entry)){
        error = ""
    }
    return error;
}
export default ValidateWhatsNew;