import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    pending: {},
    song:[],
    getShows: ()=>{},
    getSong: ()=>{},
    handleChange: ()=>{},
    handleSubmit: ()=>{}
})
export default Context;