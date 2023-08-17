import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../../Assets/logo.png'
import React from 'react'
import {useState, useContext} from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import {VscChromeClose} from 'react-icons/vsc'
import useAuth from '../../../Hooks/useAuth'
import useAlert from '../../../Hooks/useAlert'
import AuthContext from '../Context/AuthContext/AuthContext';
import './AdminNavbar.css'

const AdminNavbar = () => {
    const activeClass = 'currPage'
    const defaultClass = ''
    const [isOpen, setIsOpen] = useState(false)
    const {authDetails, setIsLoggedIn} = useAuth()
    const {setAlert} = useAlert()
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()
    const handleNav = () =>{
        setIsOpen(!isOpen)
    }
    const closeNav = () => {
        setIsOpen(false)
    }
    const logOut = () => {
        closeNav()
        ctx.logOut()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Logout Successful!')
                setTimeout(()=>{
                    navigate('/admin/login')
                },3000)
                setIsLoggedIn(false)
            }
        })
    }
    return ( 
        <React.Fragment>
            {authDetails.isLoggedIn && <div className='navbar'>
                <nav>
                    <NavLink to={'/admin/home'}>
                        <img className='logo' src={logo} alt=''/>
                    </NavLink>
                    <ul className={isOpen ? 'responsiveNav myNav' : 'myNav'} >
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/admin/home'}>
                            <li>HOME</li>
                        </NavLink>
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/admin/manage'}>
                            <li>MANAGE</li>
                        </NavLink>
                        <Link className='logout' onClick={logOut}>LOGOUT</Link>
                    </ul>
                    {isOpen ? <VscChromeClose size={30} onClick={handleNav} color='#FFFBF4' className='close'/> : <RxHamburgerMenu onClick={handleNav} size={30} className='hamburger'/>}
                </nav>
            </div>}
        </React.Fragment>
    );
}
export default AdminNavbar;