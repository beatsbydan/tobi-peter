import './Auth.css'
import { useContext } from 'react'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Logo from '../../../Assets/logo.png'
import AuthContext from '../Context/AuthContext/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { motion } from 'framer-motion';

const Register = () => {
    const ctx = useContext(AuthContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleRegisterSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Registration Successful!')
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
                <h2>REGISTER</h2>
            </div>
            <form action="" className='auth' onSubmit={handleSubmit}>
                <InputComponent
                    label={"Email"}
                    error={ctx.authErrors.regErrors.email}
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={ctx.authDetails.regEmail}
                    onChange={ctx.handleRegisterEmailChange}
                />
                <InputComponent
                    label={"Password"}
                    error={ctx.authErrors.regErrors.password}
                    type={"password"}
                    placeholder={"Enter your password"}
                    value={ctx.authDetails.regPassword}
                    onChange={ctx.handleRegisterPasswordChange}
                />
                <div className="formActions">
                    <button type="submit">REGISTER</button>
                </div>
                <p>Already have an account? Click <span><Link to={'/admin/login'}>HERE</Link> to login.</span></p>
            </form>
        </motion.div>
    );
}
export default Register;