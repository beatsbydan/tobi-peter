import React from "react";

const ShowsContext = React.createContext({
    createData: {},
    createErrors: {},
    shows:{},
    pending:{},
    chartData: [],
    yearsData: [],
    currYear:0,
    getShows: ()=>{},
    filterChartData:()=>{},
    deleteShow:()=>{},
    completeShow:()=>{},
    handleChange:()=>{},
    handleCreateSubmit:()=>{}
})
export default ShowsContext