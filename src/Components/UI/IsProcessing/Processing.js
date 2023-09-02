import useIsProcessing from "../../../Hooks/useIsProcessing"
import IsProcessing from './IsProcessing'

const Processing = () => {
    const {isProcessing} = useIsProcessing()
    return <IsProcessing isProcessing={isProcessing}/>
}

export default Processing