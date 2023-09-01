import React from "react";

const ShowsContext = React.createContext({
    createData: {},
    updateData: {},
    createErrors: {},
    updateErrors: {},
    shows:{},
    show:{},
    pending:{},
    chartData: [],
    yearsData: [],
    currYear:0,
    getShow: ()=>{},
    getShows: ()=>{},
    filterChartData:()=>{},
    deleteShow:()=>{},
    completeShow:()=>{},
    handleCreateChange:()=>{},
    handleUpdateChange:()=>{},
    handleCreateSubmit:()=>{},
    handleUpdateSubmit:()=>{},
    animateShows: ()=>{}
})
export default ShowsContext