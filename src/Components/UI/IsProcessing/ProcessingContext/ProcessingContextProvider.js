import ProcessingContext from './ProcessingContext.js'
import {useCallback, useState} from 'react'

const ProcessingContextProvider = (props) => {
    const [isProcessing, setIsProcessing] = useState(null)
    const [isFetching, setIsFetching] = useState(null)
    const setProcessing = useCallback((value) => {
        setIsProcessing(value)
    },[])
    const value = {
        isProcessing: isProcessing,
        setProcessing: setProcessing
    }
  return (
    <ProcessingContext.Provider value={value}>
        {props.children}
    </ProcessingContext.Provider>
  )
}

export default ProcessingContextProvider