import './Admin.css'
import {Link} from 'react-router-dom'
import Logo from '../../Assets/logo.png'
import { motion } from 'framer-motion';

const Admin = () => {
    return ( 
        <motion.div 
            className="admin"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <img src={Logo} alt=''/>
            <h1>HI TOBI PETER</h1>
            <p>This is your Administrator Profile.</p>
            <p>Quickly create your account or Log back in if you have.</p>
            <div className='myActions'>
                <Link to={'/admin/register'}>REGISTER</Link>
                <Link to={'/admin/login'}>LOGIN</Link>
            </div>
        </motion.div>
    );
}
export default Admin;