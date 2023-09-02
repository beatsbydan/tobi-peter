import './Unauthorized.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../../../Assets/logo.png'

const Unauthorized = () => {
    return(
        <motion.div 
            className = "unauthorized"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="element">
                <img src={logo} alt=""/>
                <h3>YOU'RE NOT LOGGED IN...</h3>
                <p>Click<span> <Link to ={'/admin/login'}>HERE</Link> </span>to login.</p>
            </div>
        </motion.div>
    )
}
export default Unauthorized