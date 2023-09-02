import React from 'react'
import {useContext} from 'react'
import InputComponent from '../../UI/InputComponent/InputComponent'
import AuthContext from '../Context/AuthContext/AuthContext'
import {useNavigate} from 'react-router-dom'
import Logo from '../../../Assets/logo.png'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import useAlert from '../../../Hooks/useAlert'
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const ctx = useContext(AuthContext)
    const{setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleResetEmailSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Email Sent!')
                setTimeout(()=>{
                    navigate('/admin/login')
                },1500)
            }
        })
    }
    return (
        <motion.div 
            className="authCard"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <div className="top">
                <img src={Logo} alt=''/>
                <h2>RESET</h2>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <InputComponent
                    label={"Email"}
                    error={ctx.authErrors.resetErrors.resetEmail}
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={ctx.authDetails.resetEmail}
                    onChange={ctx.handleResetEmailChange}
                />
                <div className="formActions">
                    <button type="submit">RESET</button>
                </div>
            </form>
            <div className='noteBlock'>
                <h2>ALERT:</h2>
                <p>If successful, check your email for a password which would give you temporary access to your account after which you'd be able to reset your password in your profile.</p>
            </div>
        </motion.div>
    )
}

export default ForgotPassword