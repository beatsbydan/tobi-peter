import './Unauthorized.css'
import {MdNoEncryptionGmailerrorred} from 'react-icons/md'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized = () => {
    return(
        <motion.div 
            className = "unauthorized"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="element">
                <MdNoEncryptionGmailerrorred className='caution' size={70} color='#1D3557'/>
                <h1>You're not logged in...</h1>
                <p>Click<span> <Link to ={'/admin/login'}>HERE</Link> </span>to login.</p>
            </div>
        </motion.div>
    )
}
export default Unauthorized