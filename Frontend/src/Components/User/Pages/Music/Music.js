import Socials from '../../../UI/Socials/Socials';
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import './Music.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { motion } from 'framer-motion';
const Music = () => {
    return ( 
        <motion.div 
            className="music"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}
        >
            <div className="bioTop">
                <h3>BIO</h3>
                <Socials/>
            </div>
            <div className="bio">
                <p>Was gonna write this in third person but I changed my mind.</p>
                <p>I’m an independent music producer and DJ based in Lagos, Nigeria. </p>
                <p>My major genres are EDM, Afrobeat, Amapiano, Pop, Dance and House music.</p>
                <p>You might recognize me from Instagram as the guy that makes remixes in a blue agbada and the overhyped reactions.</p>
            </div>
            <div className="streamingPlatformsBlock">
                <p>Check out my music on any of these streaming platforms: </p>
                <StreamingPlatforms/>
            </div>
            <div className="stats">
                <div>
                    <p><span>380k+</span>STREAMS ACROSS ALL PLATFORMS</p>
                </div>
                <div>
                    <p><span>4.4M+</span>VIEWS ON TIKTOK</p>
                </div>
                <div>
                    <p><span>4.3k+</span>MONTHLY LISTENERS</p>
                </div>
            </div>
            <div className="statsExtras">
                <div>
                    <h5>DJs CHECK THIS OUT!</h5>
                    <p>Would you like to have some songs from me to spin during your sets?</p>
                    <p>Make a request below!</p>
                    <a target='_blank' rel="noreferrer" href='https://www.'>
                        MAKE REQUEST 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a>
                </div>
                <div>
                    <h5>ESSENTIALS PLAYLIST</h5>
                    <p>Check out an ESSENTIALS PLAYLIST curated by me.</p>
                    <a target='_blank' rel="noreferrer" href='https://www.'>
                        APPLE MUSIC
                        <BiRightArrowAlt size={15} className='arrow'/>
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://www.'>
                        SPOTIFY
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a>
                </div>
            </div>
            <div className="press">
                <h4>PRESS</h4>
                <div className="pressSection">
                    <div>
                        <section className="head">
                            <h4>TOBI PETER DROPS NEW SINGLE</h4>
                            <h5>BOUNCE NETWORK</h5>
                        </section>
                        <p>The fast rising DJ, Tobi Peter, releases viral TikTok sound titled “1 2 Shake Shake”.
                        The song was a viral sound on TikTok with over 700,00 views and about...</p>
                        <a target='_blank' rel="noreferrer" href="https://www.">READ FULL ARTICLE</a>
                    </div>
                    <div>
                        <section className="head">
                            <h4>TOBI PETER DROPS NEW SINGLE</h4>
                            <h5>BOUNCE NETWORK</h5>
                        </section>
                        <p>The fast rising DJ, Tobi Peter, releases viral TikTok sound titled “1 2 Shake Shake”.
                        The song was a viral sound on TikTok with over 700,00 views and about...</p>
                        <a target='_blank' rel="noreferrer" href="https://www.">READ FULL ARTICLE</a>
                    </div>
                    <div>
                        <section className="head">
                            <h4>TOBI PETER DROPS NEW SINGLE</h4>
                            <h5>BOUNCE NETWORK</h5>
                        </section>
                        <p>The fast rising DJ, Tobi Peter, releases viral TikTok sound titled “1 2 Shake Shake”.
                        The song was a viral sound on TikTok with over 700,00 views and about...</p>
                        <a target='_blank' rel="noreferrer" href="https://www.">READ FULL ARTICLE</a>
                    </div>
                </div>
            </div>
        </motion.div>

    );
}
export default Music ;