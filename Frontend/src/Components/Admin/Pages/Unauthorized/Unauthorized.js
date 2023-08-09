import './Unauthorized.css'
import {MdNoEncryptionGmailerrorred} from 'react-icons/md'
import { Link } from 'react-router-dom';
import useAlert from '../../../../Hooks/useAlert'
import useAuth from '../../../../Hooks/useAuth'
import { useEffect } from 'react';

const Unauthorized = () => {
    const {authDetails} = useAuth()
    const {setAlert} = useAlert()
    useEffect(()=>{
        authDetails.isLoggedIn && setAlert('failure', 'Unauthorized!')
    },[])
    return(
        <div className = "unauthorized">
            <div className="element">
                <MdNoEncryptionGmailerrorred className='caution' size={70} color='#1D3557'/>
                <h1>You're not logged in...</h1>
                <p>Click<span> <Link to ={'/admin/login'}>HERE</Link> </span>to login.</p>
            </div>
        </div>
    )
}
export default Unauthorized