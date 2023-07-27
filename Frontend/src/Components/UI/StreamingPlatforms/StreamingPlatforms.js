import './StreamingPlatforms.css'
import {BiSolidMusic} from 'react-icons/bi'
import {BiLogoSpotify} from 'react-icons/bi'
import {BiLogoYoutube} from 'react-icons/bi'
import {SiAudiomack} from 'react-icons/si'
import {PiTidalLogoBold} from 'react-icons/pi'
import boomplay from '../../../Assets/boomplay-svgrepo-com.svg'
// import {useContext} from 'react'
// import Context from '../../../Context/Context'

const StreamingPlatforms = () => {
    // const ctx = useContext(Context)
    return ( 
        <ul className='streamingPlatforms'>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <BiSolidMusic size={20}/>
                    APPLE MUSIC
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <BiLogoSpotify size={20}/>
                    SPOTIFY
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <SiAudiomack size={20}/>
                    AUDIOMACK
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <PiTidalLogoBold size={20}/>
                    TIDAL
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <img src={boomplay} alt=''/>
                    BOOMPLAY
                </li>
            </a>
            <a href={/*ctx.links.streamingLink.*/""}>
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE MUSIC
                </li>
            </a>
        </ul>
    );
}

export default StreamingPlatforms;