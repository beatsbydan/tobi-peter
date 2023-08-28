import './Unavailable.css'
import { motion } from 'framer-motion';
import logo from '../../../Assets/logo.png'
import {useNavigate} from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const Unavailable = () => {
    const navigate = useNavigate()
    return (
        <motion.div 
            className = "unavailable"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <div className="element">
                <img src={logo} alt=""/>
                <p>THIS PAGE IS UNAVAILABLE...</p>
            </div>
        </motion.div>
    )
}

export default Unavailable