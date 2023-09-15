import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    pending: {},
    song:[],
    blogs:[],
    bookFieldsRegular: {},
    bookFieldsSpecifics: {},
    bookFieldsErrors: {},
    handleBookFieldsChange: ()=>{},
    handleBookFieldsSubmit: ()=>{},
    getShows: ()=>{},
    getSong: ()=>{},
    getImages:()=>{},
    getBlogs: ()=>{},
    setShowType: ()=>{},
    setShowGuests: ()=>{},
    setShowDescription: ()=>{},
    handleChange: ()=>{},
    handleSubmit: ()=>{},
})
export default Context;