import React from 'react'
const ManageContext = React.createContext({
    links: {},
    title: '',
    date: '',
    file:'',
    dataErrors:{},
    handleFileChange: ()=>{},
    handleProjectChange: ()=>{},
    handleLinksChange: ()=>{},
    handleSubmit: ()=>{},
    handleFileSubmit: ()=>{}
})
export default ManageContext