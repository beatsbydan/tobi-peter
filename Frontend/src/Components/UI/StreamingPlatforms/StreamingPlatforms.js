import './StreamingPlatforms.css'
import {BiSolidMusic} from 'react-icons/bi'
import {BiLogoSpotify} from 'react-icons/bi'
import {BiLogoYoutube} from 'react-icons/bi'
import {SiAudiomack} from 'react-icons/si'
import {PiTidalLogoBold} from 'react-icons/pi'
import boomplay from '../../../Assets/boomplay-svgrepo-com.svg'

const StreamingPlatforms = () => {
    return ( 
        <ul className='streamingPlatforms'>
            <a href="https://www.">
                <li>
                    <BiSolidMusic size={20}/>
                    APPLE MUSIC
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <BiLogoSpotify size={20}/>
                    SPOTIFY
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <SiAudiomack size={20}/>
                    AUDIOMACK
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <PiTidalLogoBold size={20}/>
                    TIDAL
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <img src={boomplay} alt=''/>
                    BOOMPLAY
                </li>
            </a>
            <a href="https://www.">
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE MUSIC
                </li>
            </a>
        </ul>
    );
}

export default StreamingPlatforms;