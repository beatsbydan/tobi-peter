import './Animation.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'

const Animation = () => {
    return ( 
        <motion.div 
            className="animation"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}    
        >
            <div className="bioBlock">
                <h3>BIO</h3>
                <p>Yeah I make animations as well.</p>
                <p>Check out some of my previous projects/client work.</p>
                <div className="portfolioBlock">
                    <div>
                        <h5>VIEW PORTFOLIO</h5>
                        {/* <a target='_blank' rel="noreferrer" href='https://www.'>
                            BEHANCE
                            <BiRightArrowAlt/>
                        </a> */}
                        <Link to={'/unavailable'}>
                            BEHANCE 
                            <BiRightArrowAlt className='arrow' size={15}/>
                        </Link>
                    </div>
                    <div>
                        <h5>ANIMATION</h5>
                        {/* <a target='_blank' rel="noreferrer" href='https://www.'>
                            MAKE REQUEST
                            <BiRightArrowAlt/>
                        </a> */}
                        <Link to={'/unavailable'}>
                            MAKE REQUEST 
                            <BiRightArrowAlt className='arrow' size={15}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="clients">
                <h3>CLIENTS</h3>
                <div className="individuals">
                    <p>INDIVIDUALS</p>
                    <ul className="clientsList">
                        <li><p>LADY DONLI</p></li>
                        <li><p>DAVIDO</p></li>
                        <li><p>DARKOVIBES</p></li>
                        <li><p>BEGHO</p></li>
                        <li><p>SHALOM DUBAS</p></li>
                        <li><p>JAMIE BLACK</p></li>
                        <li><p>ENZO PESO</p></li>
                        <li><p>NESSA</p></li>
                        <li><p>TOYIN ORES</p></li>
                    </ul>
                </div>
                <div className="organizations">
                    <p>ORGANIZATIONS</p>
                    <ul className="clientsList">
                        <li><p>MONEY AFRICA</p></li>
                        <li><p>ROOST FOUNDATION</p></li>
                        <li><p>TRYBE ONE</p></li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

export default Animation;