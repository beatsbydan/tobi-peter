import React from 'react'

const ProcessingContext = React.createContext({
    isProcessing: false,
    setProcessing: ()=>{}
});

export default ProcessingContext