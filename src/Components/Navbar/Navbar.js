import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    return ( 
        <div className="navbar">
            <nav>
                <ul>
                    <div className="left">
                        <Link to={'/'}>
                            <li>WHAT'S NEW</li>
                        </Link>
                    </div>
                    <div className="right">
                        <Link to={'/music'}>
                            <li>MUSIC</li>
                        </Link>
                        <Link to={'/shows'}>
                            <li>SHOWS</li>
                        </Link>
                        <Link to={'/animation'}>
                            <li>ANIMATION</li>
                        </Link>
                        <Link to={'/partner'}>
                            <li>PARTNER</li>
                        </Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
}
export default Navbar;