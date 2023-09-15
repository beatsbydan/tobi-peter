import axios from 'axios'

const ValidateBooks = async (entry) => {
  let errors = {}
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const mailApi = `${process.env.REACT_APP_BASE_URL}/admin/contact`

  if(entry.name === ""){
    errors.name = "Name cannot be empty."
  }
  if(entry.eventName === ""){
    errors.eventName = "Event's name cannot be empty."
  }
  if(!emailRegex.test(entry.email)){
    errors.email = "Enter a valid email."
  }
  if(entry.companyName === ""){
    errors.companyName = "Company's name cannot be empty."
  }
  if(entry.date === ""){
    errors.date = "Date cannot be empty."
  }
  if(entry.location === ""){
    errors.location = "Location cannot be empty."
  }
  if(entry.type === ""){
    errors.type = "Type cannot be empty ."
  }
  if(entry.description === ""){
    errors.description = "Description cannot be empty."
  }
  if(entry.expectedGuests === ""){
    errors.guests = "Guests cannot be empty."
  }
  if(Object.values(entry).every(value=> value !== "") && emailRegex.test(entry.email)){
    await axios.post(mailApi,{...entry}, {
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      errors.none = false
      console.log(err)
    })

  }
  return errors
}

export default ValidateBooks