import {useContext} from 'react'
import './WhatsNew.css'
import Socials from '../../../UI/Socials/Socials';
import Loading from '../../../UI/Loading/Loading';
import Context from '../../Context/Context'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import { motion } from 'framer-motion';
import {TfiFaceSad} from 'react-icons/tfi'

const WhatsNew = () => {
    const ctx = useContext(Context)
    return ( 
        <motion.div 
            className="whatsNew"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}
        >
            {   
                ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/> 
                : 
                !ctx.song.coverArt ? <p className="defaultText">No song available <span><TfiFaceSad size={25}/></span></p> 
                :
                <img className='comingSoon' src={ctx.song?.coverArt} alt="" />
            }
            <div className="streamingPlatformsBlock">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                {ctx.song && <StreamingPlatforms
                    song={ctx.song}
                />}
            </div>
            <div className="vip">
                <p>DON’T BE A DED GUY, JOIN THE VIP LIST</p>
                <form action="" onSubmit={ctx.handleSubmit}>
                    <div className="formElement">
                        <small>{ctx.error.email}</small>
                        <input className={ctx.error.email ?'errorField': ''} type="text" placeholder='Email address' value={ctx.email} onChange={ctx.handleChange} />
                    </div>
                    <button type='submit'>JOIN</button>
                </form>
            </div>
            <div className="socialsBlock">
                <Socials/>
            </div>
        </motion.div>
    );
}
export default WhatsNew;