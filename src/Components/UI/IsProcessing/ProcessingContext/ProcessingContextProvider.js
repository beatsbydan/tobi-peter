import ProcessingContext from './ProcessingContext.js'
import {useCallback, useState} from 'react'

const ProcessingContextProvider = (props) => {
    const [isProcessing, setIsProcessing] = useState(null)
    const [isFetching, setIsFetching] = useState(null)
    const setProcessing = useCallback((value) => {
        setIsProcessing(value)
    },[])
    const setFetching = useCallback((value)=>{
      setIsFetching(value)
    },[])
    const value = {
        isFetching: isFetching,
        isProcessing: isProcessing,
        setProcessing: setProcessing,
        setFetching: setFetching
    }
  return (
    <ProcessingContext.Provider value={value}>
        {props.children}
    </ProcessingContext.Provider>
  )
}

export default ProcessingContextProvider