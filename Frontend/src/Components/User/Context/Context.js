import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    details:{},
    song:[],
    handleChange: ()=>{},
    handleUpcomingMoreType: ()=>{},
    handlePastMoreType: ()=>{},
    handleUpcomingLessType: ()=>{},
    handlePastLessType: ()=>{},
    handleSubmit: ()=>{}
})
export default Context;