const ValidateWhatsNew = (entry) => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!emailRegex.test(entry)){
        errors.email = 'Enter a valid Email'
    }
    else{
        errors.none = true
    }
    return errors;
}
export default ValidateWhatsNew;