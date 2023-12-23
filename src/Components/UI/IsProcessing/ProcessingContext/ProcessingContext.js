import React from 'react'

const ProcessingContext = React.createContext({
    isFetching: false,
    isProcessing: false,
    setProcessing: ()=>{},
    setFetching: ()=>{}
});

export default ProcessingContext