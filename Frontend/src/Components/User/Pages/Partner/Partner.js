import './Partner.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { motion } from 'framer-motion';

const Partner = () => {
    return ( 
        <motion.div 
            className="partner"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}
        >
            <h2>PARTNERSHIPS</h2>
            <div className='partnerBlock'>
                <p>There are upcoming projects in which you can become a partner with Tobi Peter.</p>
                <div className='partners'>
                    <div>
                        <h5>UPCOMING PROJECT (EP)</h5>
                        <p>You can choose to contribute/partner
                        with Tobi Peter in the release of his
                        upcoming amapiano EP.
                        Contributions made with be used
                        mainly for marketing.</p>
                        <a target='_blank' rel="noreferrer" href='https://www.'>
                            PARTNER
                            <BiRightArrowAlt/>
                        </a>
                    </div>
                    <div>
                        <h5>HMO SECOND EDITION</h5>
                        <p>You can choose to contribute/partner
                        with Tobi Peter in the production of
                        his house music event, HMO.</p>
                        <a target='_blank' rel="noreferrer" href='https://www.'>
                            PARTNER
                            <BiRightArrowAlt/>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
export default Partner;