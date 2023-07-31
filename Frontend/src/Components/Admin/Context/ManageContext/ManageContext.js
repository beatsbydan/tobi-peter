import React from 'react'
const ManageContext = React.createContext({
    pending: false,
    allSongs: [],
    createData: {},
    updateData: {},
    createDataErrors: {},
    updateDataErrors: {},
    handleCreateDataChange: ()=>{},
    handleUpdateDataChange: ()=>{},
    handleCreateFileChange: ()=>{},
    handleUpdateFileChange: ()=>{},
    handleCreateSubmit: ()=>{},
    handleUpdateSubmit: ()=>{}  
})
export default ManageContext