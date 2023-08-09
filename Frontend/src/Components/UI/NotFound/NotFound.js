import './NotFound.css'
import { useLocation, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import {BiError} from 'react-icons/bi'
import useAuth from '../../../Hooks/useAuth';
import { motion } from 'framer-motion';

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
                <BiError className='caution' size={100} color='#1D3557'/>
                <h1>The page you're looking for does not exist...</h1>
            </div>
        </motion.section>
    );
}

export default NotFound;