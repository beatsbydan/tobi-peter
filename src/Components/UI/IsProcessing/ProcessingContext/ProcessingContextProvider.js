import ProcessingContext from './ProcessingContext.js'
import {useState} from 'react'

const ProcessingContextProvider = (props) => {
    const [isProcessing, setIsProcessing] = useState(null)
    const setProcessing = (value) => {
        setIsProcessing(value)
    }
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