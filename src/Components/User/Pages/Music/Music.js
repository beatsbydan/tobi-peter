import Socials from '../../../UI/Socials/Socials';
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import './Music.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { motion } from 'framer-motion';
import Blogs from './Blogs/Blogs';
import ImageCarousel from './ImageCarousel/ImageCarousel';

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
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="bioTop">
                <h3>BIO</h3>
                <Socials/>
            </div>
            <div className="bio">
                <p>
                    Tobi Peter is a songwriter, DJ, music producer & animator. The Lagos based producer takes musical inspiration from <span>Thomas Wesley</span> (also known as <span>Diplo</span>).
                    Much like <span>Diplo</span>, Tobi Peter makes music across a wide range of genres. In recent times, he has established himself as a producer to be reckoned with as long as EDM, house or amapiano in Nigeria is concerned.
                </p>
                <p>
                    While DJing, Tobi Peter can be seen wearing his signature blue agbada which serves as an appeal to the eyes while he serenades the audience with his unique set.
                </p>
                <p>
                    He has received praise and commendation for his artistic display both as an animator and a producer from <span>Diplo, Walshy Fire, Major Lazer, Major League Djz, Don Jazzy, Dr Sid, M.I., Falz the Bahd Guy</span> amongst others.
                </p>
                <p>Tobi has put out 6 EPs in his career as a producer/DJ with his latest release cementing his status as an elite amapiano producer.</p>
            </div>
            <div className="imageCarouselBlock">
                <ImageCarousel/>
            </div>
            <div className="streamingPlatformsBlock">
                <p>Check out my music on any of these streaming platforms: </p>
                <StreamingPlatforms song={song} isEmpty={false}/>
            </div>
            <div className="statsExtras">
                <div>
                    <h5>DJs CHECK THIS OUT!</h5>
                    <p>Would you like to have some songs from me to spin during your sets?</p>
                    <p>Make a request below!</p>
                    <a target='_blank' rel="noreferrer" href='https://docs.google.com/forms/d/e/1FAIpQLSeCLsPi2jX7p9Nut5EVnCdMmsTsMPS9Iww-nHn6gvoWLfFw-g/viewform?usp=sf_link'>
                        MAKE REQUEST 
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a>
                </div>
                <div>
                    <h5>ESSENTIALS PLAYLIST</h5>
                    <p>Check out an ESSENTIALS PLAYLIST curated by me.</p>
                    <a target='_blank' rel="noreferrer" href='https://music.apple.com/ng/playlist/tobi-peter-essentials/pl.33827f1b0b494d7d953f49fe2488622c'>
                        APPLE MUSIC
                        <BiRightArrowAlt size={15} className='arrow'/>
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://open.spotify.com/playlist/7v1D1eCj6GOq1pFWXa7U2w?si=97cdbca3b1404e2a'>
                        SPOTIFY
                        <BiRightArrowAlt className='arrow' size={15}/>
                    </a>
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