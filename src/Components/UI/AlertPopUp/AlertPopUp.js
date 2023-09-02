import useAlert from "../../../Hooks/useAlert";
import Alert from './Alert/Alert'

const AlertPopUp = () => {
    const { type, message } = useAlert();
    if (type !== ""){
        return <Alert type={type} message={message}/>
    }
}
export default AlertPopUp