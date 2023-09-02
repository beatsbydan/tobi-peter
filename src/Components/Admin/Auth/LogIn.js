import './Auth.css'
import { useContext } from 'react'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Logo from '../../../Assets/logo.png'
import AuthContext from '../Context/AuthContext/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { motion } from 'framer-motion';

const LogIn = () => {
    const ctx = useContext(AuthContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleLogInSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Login Successful!')
                ctx.setIsLoggedIn(true)
                navigate(ctx.authDetails.destinedLocation === "" ? '/admin/home' : ctx.authDetails.destinedLocation, {state:{from: ctx.authDetails.destinedLocation}, replace:true})
            }
        })
    }
    return(
        <motion.div 
            className="authCard"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <div className="top">
                <img src={Logo} alt=''/>
                <h2>LOGIN</h2>
            </div>
            <form action="" className='auth' onSubmit={handleSubmit}>
                <InputComponent
                    label={"Email"}
                    error={ctx.authErrors.logInErrors.email}
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={ctx.authDetails.logInEmail}
                    onChange={ctx.handleLogInEmailChange}
                />
                <InputComponent
                    label={"Password"}
                    error={ctx.authErrors.logInErrors.password}
                    type={"password"}
                    placeholder={"Enter your password"}
                    value={ctx.authDetails.logInPassword}
                    onChange={ctx.handleLogInPasswordChange}
                />
                <Link className='forgotText' to={'/admin/reset'}>Forgot Password?</Link>
                <div className="formActions">
                    <button type="submit">LOGIN</button>
                </div>
                <p>Don't have an account? Click <span><Link to={'/admin/register'}>HERE</Link> to register.</span></p>
            </form>
        </motion.div>
    )
}
export default LogIn