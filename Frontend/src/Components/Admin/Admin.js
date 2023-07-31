import './Admin.css'
import {Link} from 'react-router-dom'
import Logo from '../../Assets/logo.png'
const Admin = () => {
    return ( 
        <div className="admin">
            <img src={Logo} alt=''/>
            <h1>HI TOBI PETER</h1>
            <p>This is your Administrator Profile.</p>
            <p>Quickly create your account or Log back in if you have.</p>
            <div className='myActions'>
                <Link to={'/admin/register'}>REGISTER</Link>
                <Link to={'/admin/login'}>LOGIN</Link>
            </div>
            <p>Click <span><Link to={'/'}>HERE</Link></span> to go to tobipeter.com.</p>
        </div>
    );
}
export default Admin;