import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    handleChange: ()=>{},
    handleSubmit: ()=>{}
})
export default Context;