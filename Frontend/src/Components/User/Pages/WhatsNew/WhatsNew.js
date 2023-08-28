import {useContext} from 'react'
import './WhatsNew.css'
import Socials from '../../../UI/Socials/Socials';
import Loading from '../../../UI/Loading/Loading';
import Context from '../../Context/Context'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import { motion } from 'framer-motion';
import logo from '../../../../Assets/logo.png'

const WhatsNew = () => {
    const ctx = useContext(Context)
    const defaultSong = {
        streamingLink: {
            appleMusic: '',
            spotify: '',
            audiomack: '',
            youtube: '',
            tidal: '',
            boomPlay: '',
            youtubeMusic: ''
        }
    }

    return ( 
        <motion.div 
            className="whatsNew"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="coverArtSection">
            {   
                ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/> 
                : 
                !ctx.song?.coverArt ? <p className="defaultText"><span><img src={logo} alt=""/></span>SONG UNAVAILABLE.</p> 
                :
                <img className='comingSoon' src={ctx.song?.coverArt} alt="" />
            }
            </div>
            <div className="streamingPlatformsBlock">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                {
                    ctx.song ? <StreamingPlatforms song={ctx.song} isEmpty={false}/>
                    :
                    <StreamingPlatforms song={defaultSong} isEmpty={true}/>
                }
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