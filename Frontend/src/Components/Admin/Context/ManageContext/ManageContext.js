import React from 'react'
const ManageContext = React.createContext({
    files: [],
    pending: false,
    allSongs: [],
    blogs:[],
    images:[],
    createData: {},
    updateData: {},
    blogData: {},
    blogErrors: {},
    createDataErrors: {},
    updateDataErrors: {},
    handleCreateDataChange: ()=>{},
    handleUpdateDataChange: ()=>{},
    handleCreateFileChange: ()=>{},
    handleUpdateFileChange: ()=>{},
    handleFilesChange: ()=>{},
    deleteImage: ()=>{},
    deleteBlog: ()=>{},
    deleteSong: ()=>{},
    handleFilesSubmit: ()=>{},
    handleCreateSubmit: ()=>{},
    handleBlogDataChange: ()=>{},
    handleBlogSubmit: ()=>{},
    handleUpdateSubmit: ()=>{}  
})
export default ManageContext