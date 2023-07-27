import React from "react";

const ShowsContext = React.createContext({
    createData: {},
    createErrors: {},
    details:{},
    shows:{},
    deleteShow:()=>{},
    completeShow:()=>{},
    handleUpcomingMoreType:()=>{},
    handlePastMoreType:()=>{},
    handleUpcomingLessType:()=>{},
    handlePastLessType:()=>{},
    handleChange:()=>{},
    handleCreateSubmit:()=>{}
})
export default ShowsContext