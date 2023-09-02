import './Alert.css'
import {BsCheck2Circle} from 'react-icons/bs'
import {BiError} from 'react-icons/bi'
const Alert = (props) => {
    return ( 
        <div className={props.type === 'success' ? "alert success": "alert failure"}>
            <p>{props.message}</p>
            {props.type === 'success' ?<BsCheck2Circle color='white' size={30}/>:<BiError color='white' size={30}/>}
        </div>
    );
}

export default Alert;