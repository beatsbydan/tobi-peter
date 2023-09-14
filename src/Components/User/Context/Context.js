import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    pending: {},
    song:[],
    blogs:[],
    bookFields: {},
    bookFieldsErrors: {},
    handleBookFieldsChange: ()=>{},
    handleBookFieldsSubmit: ()=>{},
    getShows: ()=>{},
    getSong: ()=>{},
    getImages:()=>{},
    getBlogs: ()=>{},
    handleChange: ()=>{},
    handleSubmit: ()=>{},
})
export default Context;