import './UpdateSongs.css'
import {GiLoveSong} from 'react-icons/gi'
import {TfiFaceSad} from 'react-icons/tfi'
import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Song from './Song/Song'
import Loading from '../../../../../UI/Loading/Loading'
import {motion} from 'framer-motion'

const UpdateSongs = () => {
    const ctx = useContext(ManageContext)
    return(
        <motion.div 
            className="updateSongs"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <h2>HERE ARE YOUR SONGS <span><GiLoveSong/></span></h2>
            <h4>Click on a song to edit it...</h4>
            <ul className="songsList">
                {   ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/> 
                    : 
                    ctx.allSongs?.length > 0 ? ctx.allSongs.map((song, index)=>{
                        return (
                            <Song
                                id={song._id}
                                key={index}
                                myId={index}
                                title={song.title}
                                releaseDate={song.releaseDate}
                                coverArt={song.coverArt}
                                fetch={()=>ctx.getSong(song._id)}
                                deletePrompt={()=>ctx.deleteSong(song._id)}
                            />
                        )
                    })
                    : <p className="defaultText">No available songs <span><TfiFaceSad size={25}/></span></p>
                }
            </ul>
        </motion.div>
    )
}
export default UpdateSongs