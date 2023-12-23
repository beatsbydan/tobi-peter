import './UpdateSongs.css'
import {GiLoveSong} from 'react-icons/gi'
import logo from '../../../../../../Assets/logo.png'
import {useContext, useEffect} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Song from './Song/Song'
import Loading from '../../../../../UI/Loading/Loading'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {IoArrowBackOutline} from 'react-icons/io5'
import {useSelector, useDispatch} from 'react-redux'
import { fetchSongs } from '../../../../../../Store/StateSlices/AdminSlices/ManageSlice'

const UpdateSongs = () => {
    const {deleteSong} = useContext(ManageContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {status, songs} = useSelector(state => state.manage)

    useEffect(()=>{
        if(status.songs === 'idle'){
            dispatch(fetchSongs())
        }
    },[dispatch, status.songs]
    )
    return(
        <motion.div 
            className="updateSongs"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
            <h2>HERE ARE YOUR SONGS <span><GiLoveSong/></span></h2>
            <h4>Click on a song to edit it...</h4>
            <ul className="songsList">
                {   status.songs === 'pending' ? <Loading/> 
                    : 
                    (status.songs === "success" && songs.length > 0) ? songs.map((song, index)=>{
                        return (
                            <Song
                                id={song._id}
                                key={index}
                                myId={index}
                                title={song.title}
                                releaseDate={song.releaseDate}
                                coverArt={song.coverArt}
                                deletePrompt={()=>deleteSong(song._id)}
                            />
                        )
                    })
                    : (status.songs === "success" && songs.length === 0) ?
                    <p className="defaultText"><span><img src={logo} alt=""/></span>NO AVAILABLE SONGS. </p>
                    : 
                    <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG. </p>
                }
            </ul>
        </motion.div>
    )
}
export default UpdateSongs