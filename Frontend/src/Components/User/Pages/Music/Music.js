import Socials from '../../../UI/Socials/Socials';
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import './Music.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { motion } from 'framer-motion';
import Blogs from './Blogs/Blogs';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import {Link} from 'react-router-dom'

const Music = () => {
    const song = {
        streamingLink: {
            appleMusic: 'https://music.apple.com/ng/artist/tobi-peter/1459306113',
            spotify: 'https://open.spotify.com/artist/6akFVTtPvrAsoyLSv8U6nw',
            audiomack: 'https://audiomack.com/tobi-peter',
            youtube: 'https://youtube.com/channel/UCO4KidrAHVyduGJUiOkGJNw',
            tidal: 'https://tidal.com/browse/artist/15111616',
            boomPlay: 'https://music.youtube.com/channel/UCO4KidrAHVyduGJUiOkGJNw',
            youtubeMusic: 'https://music.youtube.com/channel/UCO4KidrAHVyduGJUiOkGJNw'
        }
    }
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
            <ImageCarousel/>
            <div className="streamingPlatformsBlock">
                <p>Check out my music on any of these streaming platforms: </p>
                {song && <StreamingPlatforms
                    song={song}
                />}
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
                    {/* <a target='_blank' rel="noreferrer" href='https://www.'>
                        MAKE REQUEST 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a> */}
                    <Link to={'/unavailable'}>
                        MAKE REQUEST 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </Link>
                </div>
                <div>
                    <h5>ESSENTIALS PLAYLIST</h5>
                    <p>Check out an ESSENTIALS PLAYLIST curated by me.</p>
                    {/* <a target='_blank' rel="noreferrer" href='https://www.'>
                        APPLE MUSIC
                        <BiRightArrowAlt size={15} className='arrow'/>
                    </a> */}
                    <Link to={'/unavailable'}>
                        APPLE MUSIC 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </Link>
                    {/* <a target='_blank' rel="noreferrer" href='https://www.'>
                        SPOTIFY
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a> */}
                    <Link to={'/unavailable'}>
                        SPOTIFY 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </Link>
                </div>
            </div>
            <div className="press">
                <h4>PRESS</h4>
                <Blogs/>
            </div>
        </motion.div>

    );
}
export default Music ;