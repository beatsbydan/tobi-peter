import './StreamingPlatforms.css'
import {BiSolidMusic} from 'react-icons/bi'
import {BiLogoSpotify} from 'react-icons/bi'
import {BiLogoYoutube} from 'react-icons/bi'
import {SiAudiomack} from 'react-icons/si'
import {PiTidalLogoBold} from 'react-icons/pi'
import boomplay from '../../../Assets/boomplay-svgrepo-com.svg'
import useAlert from '../../../Hooks/useAlert'

const StreamingPlatforms = (props) => {
    const {setAlert} = useAlert()
    const notify = () => {
        if(Object.values(props.song.streamingLink).every(link=> link === "")){
            setAlert('failure', 'Song isn\'t released' )
        }
        else{
            return props.song.streamingLink
        }
    }
    return ( 
        <ul className='streamingPlatforms'>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.appleMusic} >
                <li>
                    <BiSolidMusic size={20}/>
                    APPLE MUSIC
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.spotify} >
                <li>
                    <BiLogoSpotify size={20}/>
                    SPOTIFY
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.audiomack} >
                <li>
                    <SiAudiomack size={20}/>
                    AUDIOMACK
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.youtube} >
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.tidal} >
                <li>
                    <PiTidalLogoBold size={20}/>
                    TIDAL
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.boomPlay} >
                <li>
                    <img src={boomplay} alt=''/>
                    BOOMPLAY
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={notify.youtubeMusic} >
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE MUSIC
                </li>
            </a>
        </ul>
    );
}

export default StreamingPlatforms;