import React from 'react'
const Context = React.createContext({
    email: '',
    error: '',
    details:{},
    links:[],
    handleChange: ()=>{},
    handleUpcomingMoreType: ()=>{},
    handlePastMoreType: ()=>{},
    handleUpcomingLessType: ()=>{},
    handlePastLessType: ()=>{},
    handleSubmit: ()=>{}
})
export default Context;