import './NotFound.css'
import { useLocation, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import useAuth from '../../../Hooks/useAuth';
import { motion } from 'framer-motion';
import logo from '../../../Assets/logo.png'

const NotFound = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {authDetails} = useAuth()
    useEffect(()=>{
        if(location.pathname.includes('/admin')){
            if(authDetails.isLoggedIn){
                setTimeout(()=>{
                    navigate('/admin/home')
                },3500)
            }
            else{
                setTimeout(()=>{
                    navigate('/admin')
                },3500)
            }
        }
        else{
            setTimeout(()=>{
                navigate('/')
            },3500)
        }
    },[authDetails.isLoggedIn,location.pathname,navigate])
    return ( 
        <motion.section 
            className="notFound"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="element">
                <img src={logo} alt=""/>
                <p>THE PAGE YOU'RE LOOKING FOR DOES NOT EXIST...</p>
            </div>
        </motion.section>
    );
}

export default NotFound;