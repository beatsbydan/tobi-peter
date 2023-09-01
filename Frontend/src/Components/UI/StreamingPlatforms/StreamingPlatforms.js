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
    const links = props.song?.streamingLink

    const notify = (e) => {
        if(links[e.target.id] === ""){
            setAlert('failure', 'Link unavailable')
        }
        if(Object.values(props.song.streamingLink).every(link => link === "") && !props.isEmpty){
            setAlert('failure', 'Song isn\'t released' )
        }
        if(props.isEmpty){
            setAlert('failure', 'No Song available' )
        }
    }
    return ( 
        <ul className='streamingPlatforms'>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.appleMusic !== "" ? links?.appleMusic : undefined} >
                <li id="appleMusic">
                    <BiSolidMusic size={20}/>
                    APPLE MUSIC
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.spotify !== "" ? links?.spotify : undefined } >
                <li id="spotify">
                    <BiLogoSpotify size={20}/>
                    SPOTIFY
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.audiomack !== "" ? links?.audiomack : undefined} >
                <li id="audiomack">
                    <SiAudiomack size={20}/>
                    AUDIOMACK
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.youtube !== "" ? links?.youtube : undefined} >
                <li id="youtube">
                    <BiLogoYoutube size={20}/>
                    YOUTUBE
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.tidal !== "" ? links?.tidal : undefined} >
                <li id="tidal">
                    <PiTidalLogoBold size={20}/>
                    TIDAL
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.boomPlay !== "" ? links?.boomPlay : undefined} >
                <li id="boomPlay">
                    <img src={boomplay} alt=''/>
                    BOOMPLAY
                </li>
            </a>
            <a rel="noreferrer" target="_blank" onClick={notify} href={links?.youtubeMusic !== "" ? links?.youtubeMusic : undefined} >
                <li id="youtubeMusic">
                    <BiLogoYoutube size={20}/>
                    YOUTUBE MUSIC
                </li>
            </a>
        </ul>
    );
}

export default StreamingPlatforms;