import { NavLink, Link } from 'react-router-dom';
import logo from '../../../Assets/logo.png'
import React from 'react'
import {useState} from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import {VscChromeClose} from 'react-icons/vsc'
import {FaUserTie} from 'react-icons/fa'
import './AdminNavbar.css'
const AdminNavbar = () => {
    const activeClass = 'currPage'
    const defaultClass = ''
    const [isOpen, setIsOpen] = useState(false)
    const handleNav = () =>{
        setIsOpen(!isOpen)
    }
    const closeNav = () => {
        setIsOpen(false)
    }
    const isLoggedIn = true
    return ( 
        <React.Fragment>
            {isLoggedIn && <div className='navbar'>
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
                        <Link className='logout' onClick={closeNav} to = {'/admin/login'}>LOGOUT</Link>
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/admin/profile'}>
                            <li><FaUserTie size={27}/></li>
                        </NavLink>
                    </ul>
                    {isOpen ? <VscChromeClose size={30} onClick={handleNav} color='#FFFBF4' className='close'/> : <RxHamburgerMenu onClick={handleNav} size={30} className='hamburger'/>}
                </nav>
            </div>}
        </React.Fragment>
    );
}
export default AdminNavbar;