import './Auth.css'
import { useContext } from 'react'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Logo from '../../../Assets/logo.png'
import AuthContext from '../Context/AuthContext/AuthContext'
import {Link, Navigate, useLocation} from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const LogIn = () => {
    const ctx = useContext(AuthContext)
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleLogInSubmit()
        .then(res=>{
            if(res){
                setAlert('success', 'Login Successful!')
            }
        })
    }
    return(
        <div className="authCard">
            <Link to={'/admin'}><AiOutlineArrowLeft color='#1D3557' size={45}/></Link>
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
                <div className="formActions">
                    <button type="submit">LOGIN</button>
                </div>
                <p>Don't have an account? Click <span><Link to={'/admin/register'}>HERE</Link> to register.</span></p>
            </form>
        </div>
    )
}
export default LogIn