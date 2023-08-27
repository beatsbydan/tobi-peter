import './Unavailable.css'
import {TbError404} from 'react-icons/tb'
import { motion } from 'framer-motion';

const Unavailable = () => {
    return (
        <motion.div 
            className = "unavailable"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="element">
                <TbError404 className='caution' size={70} color='#1D3557'/>
                <h1>This page is not available...</h1>
            </div>
        </motion.div>
    )
}

export default Unavailable