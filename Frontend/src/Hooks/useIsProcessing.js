import {useContext} from 'react'
import ProcessingContext from '../Components/UI/IsProcessing/ProcessingContext/ProcessingContext'

const useIsProcessing = () => useContext(ProcessingContext)

export default useIsProcessing;