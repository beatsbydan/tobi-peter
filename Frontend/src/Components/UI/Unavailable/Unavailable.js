import './Unavailable.css'
import {TbError404} from 'react-icons/tb'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';

const Unavailable = () => {
    return (
        <motion.div 
            className = "unavailable"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}
        >
            <div className="element">
                <TbError404 className='caution' size={70} color='#1D3557'/>
                <h1>This page is not available...</h1>
                <p>Click<span> <Link to ={'/'}>HERE</Link> </span>to go to tobipeter.com.</p>
            </div>
        </motion.div>
    )
}

export default Unavailable