import AlertContext from './AlertContext'
import {useState} from 'react'

const AlertContextProvider = (props) => {
    const ALERT_TIME = 2000;
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const setAlert = (type, message) => {
        setType(type);
        setMessage(message)

        setTimeout(()=>{
            setType('')
            setMessage('')
        }, ALERT_TIME)
    }
    const value = {
        type:type,
        message:message,
        setAlert:setAlert
    }
        return (
        <AlertContext.Provider value={value}>
            {props.children}
        </AlertContext.Provider>
    );
    
};
export default AlertContextProvider