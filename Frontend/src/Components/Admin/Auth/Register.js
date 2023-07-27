import './Auth.css'
import { useContext } from 'react'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Logo from '../../../Assets/logo.png'
import AuthContext from '../Context/AuthContext/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const Register = () => {
    const ctx = useContext(AuthContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleRegisterSubmit()
        .then(res=>{
            if(res){
                setAlert('success', 'Registration Successful!')
                setTimeout(()=>{
                    navigate('/admin/login')
                },2000)
            }
        })
    }
    return ( 
        <div className="authCard">
            <Link to={'/admin'}><AiOutlineArrowLeft color='#1D3557' size={45}/></Link>
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
        </div>
    );
}
export default Register;