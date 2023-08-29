import React from 'react'
import { motion } from 'framer-motion';
import logo from '../../../Assets/logo.png'
import './UnderMaintenance.css'

const UnderMaintenance = () => {
    return (
        <motion.div 
            className = "underMaintenance"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="element">
                <img src={logo} alt=""/>
                <h3>SITE UNDER MAINTENANCE.</h3>
            </div>
        </motion.div>
    )
}

export default UnderMaintenance