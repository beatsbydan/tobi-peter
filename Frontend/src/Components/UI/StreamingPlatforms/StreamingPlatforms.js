import './StreamingPlatforms.css'
import {BiSolidMusic} from 'react-icons/bi'
import {BiLogoSpotify} from 'react-icons/bi'
import {BiLogoYoutube} from 'react-icons/bi'
import {SiAudiomack} from 'react-icons/si'
import {PiTidalLogoBold} from 'react-icons/pi'
import boomplay from '../../../Assets/boomplay-svgrepo-com.svg'
import {useContext} from 'react'
import Context from '../../User/Context/Context'
import useAlert from '../../../Hooks/useAlert'

const StreamingPlatforms = () => {
    const ctx = useContext(Context)
    const {setAlert} = useAlert()
    const notify = () => {
        if(!ctx.song.streamingLink){
            setAlert('failure', 'Song isn\'t released' )
        }
    }
    return ( 
        <ul className='streamingPlatforms'>
            <a onClick={notify} href={ctx.song.streamingLink?.appleMusic}>
                <li>
                    <BiSolidMusic size={20}/>
                    APPLE MUSIC
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.spotify}>
                <li>
                    <BiLogoSpotify size={20}/>
                    SPOTIFY
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.audiomack}>
                <li>
                    <SiAudiomack size={20}/>
                    AUDIOMACK
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.youtube}>
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.tidal}>
                <li>
                    <PiTidalLogoBold size={20}/>
                    TIDAL
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.boomPlay}>
                <li>
                    <img src={boomplay} alt=''/>
                    BOOMPLAY
                </li>
            </a>
            <a onClick={notify} href={ctx.song.streamingLink?.youtubeMusic}>
                <li>
                    <BiLogoYoutube size={20}/>
                    YOUTUBE MUSIC
                </li>
            </a>
        </ul>
    );
}

export default StreamingPlatforms;