import { NavLink } from 'react-router-dom';
import logo from '../../Assets/logo.png'
import {useState} from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import {VscChromeClose} from 'react-icons/vsc'
import './Navbar.css'
const Navbar = () => {
    const activeClass = 'currPage'
    const defaultClass = ''
    const [isOpen, setIsOpen] = useState(false)
    const handleNav = () =>{
        setIsOpen(!isOpen)
    }
    const closeNav = () => {
        setIsOpen(false)
    }
    return ( 
        <div className="navbar">
            <nav>
                <NavLink to={'/'}>
                    <img className='logo' src={logo} alt=''/>
                </NavLink>
                <ul className={isOpen ? 'responsiveNav' : ''} >
                    <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/'}>
                        <li>WHAT'S NEW</li>
                    </NavLink>
                    <div className="right">
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/music'}>
                            <li>MUSIC</li>
                        </NavLink>
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/shows'}>
                            <li>SHOWS</li>
                        </NavLink>
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/animation'}>
                            <li>ANIMATION</li>
                        </NavLink>
                        <NavLink onClick={closeNav} className={({isActive})=>(isActive ? activeClass: defaultClass)} to={'/partner'}>
                            <li>PARTNER</li>
                        </NavLink>
                    </div>
                </ul>
                {isOpen ? <VscChromeClose size={30} onClick={handleNav} color='#FFFBF4' className='close'/> : <RxHamburgerMenu onClick={handleNav} size={30} className='hamburger'/>}
            </nav>
        </div>
    );
}
export default Navbar;